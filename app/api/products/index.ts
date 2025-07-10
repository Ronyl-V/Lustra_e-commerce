import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
