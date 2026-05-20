import { Quiz, QuizQuestion } from "@/lib/quizzes";

type GenerateQuizInput = {
  sourceText: string;
  count: number;
  difficulty: string;
  language: string;
};

const fallbackTopics = [
  "asosiy tushuncha",
  "muhim qoida",
  "amaliy misol",
  "taqqoslash",
  "xulosa"
];

export function generateQuizDraft(input: GenerateQuizInput): Quiz {
  const sentences = input.sourceText
    .split(/[.!?\n]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 12);

  const topic = sentences[0]?.slice(0, 64) || "AI generatsiya";
  const questions: QuizQuestion[] = Array.from({ length: input.count }).map((_, index) => {
    const source = sentences[index % Math.max(sentences.length, 1)] || fallbackTopics[index % fallbackTopics.length];
    const keyword = pickKeyword(source) || fallbackTopics[index % fallbackTopics.length];
    const correct = source.length > 90 ? `${source.slice(0, 87)}...` : source;

    return {
      id: `ai-question-${Date.now()}-${index}`,
      text: `${keyword} bo'yicha to'g'ri fikrni tanlang.`,
      options: [
        correct,
        `${keyword} bu mavzuga aloqador emas.`,
        `${keyword} faqat nazariy tushuncha, amalda ishlatilmaydi.`,
        `${keyword} har doim bir xil natija beradi.`
      ],
      correctIndex: 0,
      timeLimit: input.difficulty === "Qiyin" ? 30 : input.difficulty === "Oson" ? 10 : 20,
      explanation: `Manba matnda "${keyword}" shu mazmunda berilgan.`
    };
  });

  return {
    id: `quiz-${Date.now()}`,
    title: `${topic} - AI quiz`,
    topic,
    status: "Tayyor",
    questions,
    createdAt: new Date().toISOString()
  };
}

function pickKeyword(text: string) {
  return text
    .replace(/[^\w\s'-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 4)
    .sort((a, b) => b.length - a.length)[0];
}
