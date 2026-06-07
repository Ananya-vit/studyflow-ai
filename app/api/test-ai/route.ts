import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content:
              "Explain binary search in one sentence.",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      result:
        completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}