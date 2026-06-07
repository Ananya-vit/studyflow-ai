import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse-new";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await pdf(buffer);

    return NextResponse.json({
      success: true,
      text: data.text,
    });
  } catch (error: any) {
    console.error("PDF ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}