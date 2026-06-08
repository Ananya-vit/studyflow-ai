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
    quiz: [],
  });
}

const cleanContext = String(incomingText)
  .substring(0, 4000)
  .replace(/[\/\\]/g, "");

const chatCompletion =
  await groq.chat.completions.create({
    model: "llama3-8b-8192",
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content: `


Return ONLY valid JSON.

Format:

{
"quiz": [
{
"question": "Question text",
"options": [
"Option A",
"Option B",
"Option C",
"Option D"
],
"correctAnswer": "Option A"
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
"Generate quiz questions from this text:\n\n" +
cleanContext,
},
],
});


let outputText =
  chatCompletion.choices[0]?.message?.content ||
  "{}";

console.log(
  "========== RAW QUIZ RESPONSE =========="
);
console.log(outputText);
console.log(
  "======================================="
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
    "QUIZ JSON PARSE FAILED"
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
      quiz: [],
      error:
        "Invalid JSON returned by model",
      raw: outputText,
    },
    { status: 200 }
  );
}


} catch (error: any) {
console.error(
"CRITICAL BACKEND QUIZ ERROR:"
);
console.error(error);

return NextResponse.json(
  {
    quiz: [],
    error:
      error?.message ||
      "Unknown server error",
  },
  { status: 200 }
);


}
}
