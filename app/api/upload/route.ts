import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Forcer Node.js (interdit Edge)
export const config = {
  runtime: "nodejs",
};

// Config Cloudinary depuis tes variables .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUrl, {
      folder: "lustra-products",
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Erreur Cloudinary :", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
