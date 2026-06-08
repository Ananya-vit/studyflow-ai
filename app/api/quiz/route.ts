import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Generate 10 multiple-choice questions from these notes.

Format:

Q1. Question

A)
B)
C)
D)

Answer:

Notes:
${text}
`,
          },
        ],
      });

    return NextResponse.json({
      quiz: completion.choices[0].message.content,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}