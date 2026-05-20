import { TeacherClass } from "@/lib/classes";
import { Quiz } from "@/lib/quizzes";

export type LivePlayer = {
  id: string;
  name: string;
  joinedAt: string;
};

export type LiveAnswer = {
  id: string;
  playerId: string;
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  answeredAt: string;
};

export type LiveSession = {
  id: string;
  code: string;
  quizId: string;
  quizTitle: string;
  classId?: string;
  className?: string;
  status: "lobby" | "running" | "finished";
  currentQuestionIndex: number;
  players: LivePlayer[];
  answers: LiveAnswer[];
  createdAt: string;
};

const STORAGE_KEY = "aqlly.dev.liveSessions";

function readSessions(): LiveSession[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LiveSession[]) : [];
  } catch {
    return [];
  }
}

function writeSessions(items: LiveSession[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function createPin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function createStoredSession(quiz: Quiz, classItem?: TeacherClass) {
  const existing = readSessions();
  let code = createPin();
  while (existing.some((item) => item.code === code)) code = createPin();

  const session: LiveSession = {
    id: `session-${Date.now()}`,
    code,
    quizId: quiz.id,
    quizTitle: quiz.title || "Nomsiz quiz",
    classId: classItem?.id,
    className: classItem?.name,
    status: "lobby",
    currentQuestionIndex: 0,
    players: [],
    answers: [],
    createdAt: new Date().toISOString()
  };

  writeSessions([session, ...existing]);
  return session;
}

export function getStoredSession(code: string) {
  return readSessions().find((item) => item.code === code) ?? null;
}

export function updateStoredSession(code: string, updater: (session: LiveSession) => LiveSession) {
  const sessions = readSessions();
  const next = sessions.map((session) => (session.code === code ? updater(session) : session));
  writeSessions(next);
  return next.find((session) => session.code === code) ?? null;
}

export function addStoredPlayer(code: string, name: string) {
  const player: LivePlayer = {
    id: `player-${Date.now()}`,
    name,
    joinedAt: new Date().toISOString()
  };
  const session = updateStoredSession(code, (current) => ({
    ...current,
    players: [...current.players, player]
  }));
  return { session, player };
}

export function submitStoredAnswer(input: {
  code: string;
  playerId: string;
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}) {
  return updateStoredSession(input.code, (session) => {
    const existing = session.answers.filter(
      (answer) => !(answer.playerId === input.playerId && answer.questionId === input.questionId)
    );
    return {
      ...session,
      answers: [
        ...existing,
        {
          id: `answer-${Date.now()}`,
          playerId: input.playerId,
          questionId: input.questionId,
          selectedIndex: input.selectedIndex,
          isCorrect: input.isCorrect,
          answeredAt: new Date().toISOString()
        }
      ]
    };
  });
}

export function startStoredSession(code: string) {
  return updateStoredSession(code, (session) => ({
    ...session,
    status: "running",
    currentQuestionIndex: 0
  }));
}

export function advanceStoredQuestion(code: string, totalQuestions: number) {
  return updateStoredSession(code, (session) => {
    const nextIndex = session.currentQuestionIndex + 1;
    if (nextIndex >= totalQuestions) {
      return { ...session, status: "finished" };
    }
    return { ...session, currentQuestionIndex: nextIndex };
  });
}

export function finishStoredSession(code: string) {
  return updateStoredSession(code, (session) => ({ ...session, status: "finished" }));
}

export function getStoredSessions() {
  return readSessions();
}
