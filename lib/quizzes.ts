import { quizzes as mockQuizzes } from "@/lib/mock-data";

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  timeLimit: number;
  explanation?: string;
};

export type Quiz = {
  id: string;
  title: string;
  topic: string;
  status: "Draft" | "Tayyor";
  questions: QuizQuestion[];
  createdAt?: string;
  updatedAt?: string;
};

const STORAGE_KEY = "aqlly.dev.quizzes";

function mockAsQuizzes(): Quiz[] {
  return mockQuizzes.map((item) => ({
    id: item.id,
    title: item.title,
    topic: item.topic,
    status: item.status as Quiz["status"],
    questions: Array.from({ length: item.questions }).map((_, index) => ({
      id: `${item.id}-${index}`,
      text: `${index + 1}-savol namunasi`,
      options: ["A javob", "B javob", "C javob", "D javob"],
      correctIndex: 0,
      timeLimit: 20
    }))
  }));
}

function readStoredQuizzes() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Quiz[]) : [];
  } catch {
    return [];
  }
}

function writeStoredQuizzes(items: Quiz[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getStoredQuizzes() {
  return [...readStoredQuizzes(), ...mockAsQuizzes()];
}

export function getStoredQuiz(id: string) {
  return getStoredQuizzes().find((item) => item.id === id) ?? null;
}

export function createEmptyQuestion(): QuizQuestion {
  return {
    id: `question-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    timeLimit: 20,
    explanation: ""
  };
}

export function createDraftQuiz(): Quiz {
  return {
    id: `quiz-${Date.now()}`,
    title: "",
    topic: "",
    status: "Draft",
    questions: [createEmptyQuestion()],
    createdAt: new Date().toISOString()
  };
}

export function saveStoredQuiz(input: Quiz) {
  const current = readStoredQuizzes();
  const item: Quiz = {
    ...input,
    updatedAt: new Date().toISOString()
  };
  const exists = current.some((quiz) => quiz.id === item.id);
  writeStoredQuizzes(exists ? current.map((quiz) => (quiz.id === item.id ? item : quiz)) : [item, ...current]);
  return item;
}
