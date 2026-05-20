import { getStoredSessions, LiveSession } from "@/lib/live-sessions";
import { getStoredQuiz, Quiz } from "@/lib/quizzes";

export type PlayerResult = {
  playerId: string;
  name: string;
  correct: number;
  answered: number;
  total: number;
  percent: number;
};

export type QuestionResult = {
  questionId: string;
  text: string;
  correct: number;
  answered: number;
  totalPlayers: number;
  percent: number;
};

export type SessionResult = {
  session: LiveSession;
  quiz: Quiz | null;
  totalQuestions: number;
  playerResults: PlayerResult[];
  questionResults: QuestionResult[];
  averagePercent: number;
  topScore: number;
};

export function calculateSessionResult(session: LiveSession): SessionResult {
  const quiz = getStoredQuiz(session.quizId);
  const totalQuestions = quiz?.questions.length ?? 0;

  const playerResults = session.players.map((player) => {
    const answers = session.answers.filter((answer) => answer.playerId === player.id);
    const correct = answers.filter((answer) => answer.isCorrect).length;
    const percent = totalQuestions ? Math.round((correct / totalQuestions) * 100) : 0;
    return {
      playerId: player.id,
      name: player.name,
      correct,
      answered: answers.length,
      total: totalQuestions,
      percent
    };
  });

  const questionResults =
    quiz?.questions.map((question) => {
      const answers = session.answers.filter((answer) => answer.questionId === question.id);
      const correct = answers.filter((answer) => answer.isCorrect).length;
      const percent = session.players.length ? Math.round((correct / session.players.length) * 100) : 0;
      return {
        questionId: question.id,
        text: question.text,
        correct,
        answered: answers.length,
        totalPlayers: session.players.length,
        percent
      };
    }) ?? [];

  const averagePercent = playerResults.length
    ? Math.round(playerResults.reduce((sum, item) => sum + item.percent, 0) / playerResults.length)
    : 0;
  const topScore = playerResults.length ? Math.max(...playerResults.map((item) => item.percent)) : 0;

  return {
    session,
    quiz,
    totalQuestions,
    playerResults: playerResults.sort((a, b) => b.percent - a.percent),
    questionResults,
    averagePercent,
    topScore
  };
}

export function getStoredSessionResults() {
  return getStoredSessions().map(calculateSessionResult);
}

export function getStoredSessionResult(code: string) {
  const session = getStoredSessions().find((item) => item.code === code);
  return session ? calculateSessionResult(session) : null;
}
