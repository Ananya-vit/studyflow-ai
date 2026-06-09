import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(request: Request) {
try {
const body = await request.json();
const incomingText = body.text || "";


if (!incomingText) {
  return NextResponse.json({
    flashcards: [],
  });
}

const cleanContext = String(incomingText)
  .substring(0, 4000)
  .replace(/[\/\\]/g, "");

const chatCompletion =
  await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `

Return ONLY valid JSON.

Format:

{
"flashcards": [
{
"front": "Question",
"back": "Answer"
}
]
}

Do not include markdown.
Do not include explanations.
Do not include any text outside JSON.
`,
},
{
role: "user",
content:
"Generate flashcards from this text:\n\n" +
cleanContext,
},
],
});


let outputText =
  chatCompletion.choices[0]?.message?.content ||
  "{}";

console.log(
  "======= RAW FLASHCARD RESPONSE ======="
);
console.log(outputText);
console.log(
  "======================================"
);

outputText = outputText
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();

try {
  const parsedData = JSON.parse(outputText);

  return NextResponse.json(parsedData);
} catch (parseError) {
  console.error(
    "FLASHCARD JSON PARSE FAILED"
  );
  console.error(outputText);

  const jsonMatch =
    outputText.match(
      /\{[\s\S]*\}/
    );

  if (jsonMatch) {
    try {
      const recovered =
        JSON.parse(jsonMatch[0]);

      return NextResponse.json(
        recovered
      );
    } catch {}
  }

  return NextResponse.json(
    {
      flashcards: [],
      error:
        "Invalid JSON returned by model",
      raw: outputText,
    },
    { status: 200 }
  );
}


} catch (error: any) {
console.error(
"CRITICAL BACKEND FLASHCARD ERROR:"
);
console.error(error);


return NextResponse.json(
  {
    flashcards: [],
    error:
      error?.message ||
      "Unknown server error",
  },
  { status: 200 }
);


}
}
