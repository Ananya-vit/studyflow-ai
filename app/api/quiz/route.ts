import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(request: Request) {
try {
const { text } = await request.json();


if (!text) {
  return NextResponse.json({
    quiz: [],
  });
}

const cleanContext = String(text)
  .replace(/[\/\\]/g, "")
  .substring(0, 2500);

const completion =
  await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `


You are a JSON API.

Return ONLY valid JSON.

Never explain.
Never summarize.
Never repeat the source text.
Never use markdown.

Output format:

{
"quiz": [
{
"question": "Question",
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
`,
          },
          {
            role: "user",
            content: `
Generate exactly 10 multiple choice questions.

Requirements:

* 4 options each
* 1 correct answer
* Questions must be based on the provided text
* Return JSON only

Study Material:

${cleanContext}
`,
},
],
});


let output =
  completion.choices[0]?.message?.content || "";

console.log("RAW QUIZ OUTPUT:");
console.log(output);

output = output
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();

const jsonMatch =
  output.match(/\{[\s\S]*\}/);

if (!jsonMatch) {
  return NextResponse.json({
    quiz: [],
    error: "No JSON found in model response",
    raw: output,
  });
}

try {
  const parsed = JSON.parse(jsonMatch[0]);

  return NextResponse.json(parsed);
} catch (err) {
  console.error("JSON PARSE ERROR:", err);

  return NextResponse.json({
    quiz: [],
    error: "JSON parse failed",
    raw: output,
  });
}


} catch (error: any) {
console.error(
"CRITICAL BACKEND QUIZ ERROR:"
);
console.error(error);


return NextResponse.json({
  quiz: [],
  error:
    error?.message ||
    "Unknown server error",
});


}
}
