import { NextResponse } from "next/server";
import { generateQuizDraft } from "@/lib/ai-generator";
import { Quiz } from "@/lib/quizzes";

type GenerateRequest = {
  sourceText?: string;
  count?: number;
  difficulty?: string;
  language?: string;
};

type GeminiGenerateResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

const quizSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Short quiz title in the requested language."
    },
    topic: {
      type: "string",
      description: "Main lesson topic."
    },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Clear multiple-choice question."
          },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
            description: "Exactly four answer options."
          },
          correctIndex: {
            type: "integer",
            minimum: 0,
            maximum: 3,
            description: "Index of the correct option from 0 to 3."
          },
          timeLimit: {
            type: "integer",
            minimum: 10,
            maximum: 60,
            description: "Recommended time limit in seconds."
          },
          explanation: {
            type: "string",
            description: "Short explanation for the correct answer."
          }
        },
        required: ["text", "options", "correctIndex", "timeLimit", "explanation"]
      }
    }
  },
  required: ["title", "topic", "questions"]
};

export async function POST(request: Request) {
  const input = (await request.json()) as GenerateRequest;
  const sourceText = input.sourceText?.trim() ?? "";
  const count = Math.min(Math.max(Number(input.count) || 5, 1), 20);
  const difficulty = input.difficulty || "O'rta";
  const language = input.language || "O'zbek lotin";

  if (!sourceText) {
    return NextResponse.json({ error: "Mavzu yoki dars matni kerak." }, { status: 400 });
  }

  if (!process.env.GEMINI_API_KEY) {
    const fallback = generateQuizDraft({ sourceText, count, difficulty, language });
    return NextResponse.json({ quiz: fallback, provider: "demo" });
  }

  const prompt = [
    "You are Aqlly, an assistant for teachers in Uzbekistan.",
    "Generate a classroom-ready multiple-choice quiz from the provided lesson text.",
    "Use the requested language and keep questions age-appropriate.",
    "Avoid trick questions. Each question must have exactly 4 options and one correct answer.",
    "Return only the JSON object that matches the schema.",
    "",
    `Language: ${language}`,
    `Difficulty: ${difficulty}`,
    `Question count: ${count}`,
    "",
    "Lesson text:",
    sourceText
  ].join("\n");

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: difficulty === "Qiyin" ? 0.55 : 0.35,
        responseMimeType: "application/json",
        responseJsonSchema: quizSchema
      }
    })
  });

  const data = (await response.json()) as GeminiGenerateResponse;

  if (!response.ok) {
    return NextResponse.json(
      { error: data.error?.message || "Gemini API javob bermadi." },
      { status: response.status }
    );
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return NextResponse.json({ error: "Gemini bo'sh javob qaytardi." }, { status: 502 });
  }

  const parsed = JSON.parse(text) as Pick<Quiz, "title" | "topic" | "questions">;
  const quiz: Quiz = {
    id: `quiz-${Date.now()}`,
    title: parsed.title || "AI quiz",
    topic: parsed.topic || "AI generatsiya",
    status: "Tayyor",
    createdAt: new Date().toISOString(),
    questions: parsed.questions.slice(0, count).map((question, index) => ({
      id: `ai-question-${Date.now()}-${index}`,
      text: question.text,
      options: question.options.slice(0, 4),
      correctIndex: Math.min(Math.max(question.correctIndex, 0), 3),
      timeLimit: question.timeLimit || (difficulty === "Qiyin" ? 30 : difficulty === "Oson" ? 10 : 20),
      explanation: question.explanation
    }))
  };

  return NextResponse.json({ quiz, provider: "gemini" });
}
