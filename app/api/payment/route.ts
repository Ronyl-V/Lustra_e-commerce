import { NextResponse } from "next/server";
import axios from "axios";
import { randomUUID } from "crypto";

const MOMO_BASE_URL = process.env.MOMO_BASE_URL!;
const MOMO_SUBSCRIPTION_KEY = process.env.MOMO_SUBSCRIPTION_KEY!;
const MOMO_API_USER = process.env.MOMO_API_USER!;
const MOMO_API_KEY = process.env.MOMO_API_KEY!;
const TARGET_ENV = process.env.MOMO_TARGET_ENV!;

// Fonction de conversion XAF -> EUR (taux fixe)
function convertXafToEur(xaf: number): string {
  const EUR_RATE = 655.957; // taux fixe BCE
  return (xaf / EUR_RATE).toFixed(2); // retourne string avec 2 décimales
}

// Générer un token d’accès dynamique
async function getMomoAccessToken() {
  const res = await axios.post(
    `${MOMO_BASE_URL}/collection/token/`,
    {},
    {
      headers: {
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
        Authorization: `Basic ${Buffer.from(`${MOMO_API_USER}:${MOMO_API_KEY}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.access_token;
}

// Formater numéro avec indicatif '237'
function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/[\s+]/g, "");
  if (cleaned.startsWith("237")) return cleaned;
  return "237" + cleaned;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Variables inutilisées commentées pour éviter l'erreur no-unused-vars
    // const { name, email, phone, paymentMethod, cartItems, totalAmount } = body;
    const { phone, paymentMethod, totalAmount } = body;

    if (!phone || !totalAmount || paymentMethod !== "momo") {
      return NextResponse.json({ message: "Paramètres invalides" }, { status: 400 });
    }

    const referenceId = randomUUID();

    const accessToken = await getMomoAccessToken();

    const momoHeaders = {
      "X-Reference-Id": referenceId,
      "X-Target-Environment": TARGET_ENV,
      "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    // Conversion en EUR avant d’envoyer à MoMo
    const eurAmount = convertXafToEur(Number(totalAmount));

    await axios.post(
      `${MOMO_BASE_URL}/collection/v1_0/requesttopay`,
      {
        amount: eurAmount,
        currency: "EUR",
        externalId: referenceId,
        payer: {
          partyIdType: "MSISDN",
          partyId: formatPhoneNumber(phone),
        },
        payerMessage: "Paiement LUSTRA",
        payeeNote: "Achat panier",
      },
      { headers: momoHeaders }
    );

    return NextResponse.json({
      message: `Une demande de paiement a été envoyée à ${phone}.`,
      referenceId,
    });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur MoMo response data:", error.response?.data);
      console.error("Erreur MoMo status:", error.response?.status);
    } else {
      console.error("Erreur MoMo:", error);
    }
    return NextResponse.json(
      { message: "Erreur lors du paiement Mobile Money" },
      { status: 500 }
    );
  }
}
