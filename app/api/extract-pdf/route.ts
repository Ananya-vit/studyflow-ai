import { NextRequest, NextResponse } from "next/server";
const pdf = require("pdf-parse-fork");

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await pdf(buffer);

    return NextResponse.json({
      success: true,
      text: result.text,
      pages: result.numpages,
    });
  } catch (error: any) {
    console.error("PDF Extraction Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}