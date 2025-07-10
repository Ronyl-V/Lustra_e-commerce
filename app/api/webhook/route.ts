import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

const MOMO_BASE_URL = process.env.MOMO_BASE_URL!;
const MOMO_SUBSCRIPTION_KEY = process.env.MOMO_SUBSCRIPTION_KEY!;
const MOMO_API_USER = process.env.MOMO_API_USER!;
const MOMO_API_KEY = process.env.MOMO_API_KEY!;
const MOMO_TARGET_ENV = process.env.MOMO_TARGET_ENV!;

// Même fonction getMomoAccessToken que dans payment
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referenceId, name, email, phone, cartItems, totalAmount } = body;

    if (!referenceId || !name || !email || !phone || !cartItems || !Array.isArray(cartItems) || !totalAmount) {
      return NextResponse.json({ message: "Paramètres manquants ou invalides" }, { status: 400 });
    }

    const accessToken = await getMomoAccessToken();

    // Vérifier le statut du paiement
    const res = await axios.get(
      `${MOMO_BASE_URL}/collection/v1_0/requesttopay/${referenceId}`,
      {
        headers: {
          "X-Target-Environment": MOMO_TARGET_ENV,
          "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const status = res.data.status;

    if (status === "SUCCESSFUL") {
      // Enregistrer la commande dans la base
      const order = await prisma.order.create({
        data: {
          name,
          email,
          phone,
          paymentMethod: "momo",
          total: totalAmount,
          status: "paid",
          transactionId: referenceId,
          items: {
            create: cartItems.map((item: any) => ({
              productId: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.cartQuantity,
            })),
          },
        },
      });

      return NextResponse.json({
        message: "Paiement confirmé et commande enregistrée.",
        orderId: order.id,
      });
    } else if (status === "FAILED") {
      return NextResponse.json({ message: "Paiement échoué." }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Paiement en attente.", status });
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur webhook response data:", error.response?.data);
      console.error("Erreur webhook status:", error.response?.status);
    } else {
      console.error("Erreur webhook:", error);
    }
    return NextResponse.json(
      { message: "Erreur lors de la vérification du paiement." },
      { status: 500 }
    );
  }
}
