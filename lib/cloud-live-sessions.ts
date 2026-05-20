import { TeacherClass } from "@/lib/classes";
import { LiveAnswer, LivePlayer, LiveSession, createPin } from "@/lib/live-sessions";
import { Quiz } from "@/lib/quizzes";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type CloudLiveSessionRow = {
  code: string;
  quiz_id: string;
  quiz_title: string;
  class_name: string | null;
  status: LiveSession["status"];
  current_question_index: number;
  quiz_json: Quiz;
  players: LivePlayer[] | null;
  answers: LiveAnswer[] | null;
  created_at: string;
};

export type CloudLiveState = {
  session: LiveSession;
  quiz: Quiz;
};

function canUseCloud() {
  return Boolean(isSupabaseConfigured && supabase);
}

function rowToState(row: CloudLiveSessionRow): CloudLiveState {
  return {
    quiz: row.quiz_json,
    session: {
      id: row.code,
      code: row.code,
      quizId: row.quiz_id,
      quizTitle: row.quiz_title,
      className: row.class_name ?? undefined,
      status: row.status,
      currentQuestionIndex: row.current_question_index,
      players: row.players ?? [],
      answers: row.answers ?? [],
      createdAt: row.created_at
    }
  };
}

export async function getCloudSession(code: string): Promise<CloudLiveState | null> {
  if (!canUseCloud()) return null;

  const { data, error } = await supabase!
    .from("live_sessions")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error || !data) return null;
  return rowToState(data as CloudLiveSessionRow);
}

export async function createCloudSession(quiz: Quiz, classItem?: TeacherClass): Promise<CloudLiveState | null> {
  if (!canUseCloud()) return null;

  for (let index = 0; index < 3; index += 1) {
    const code = createPin();
    const { data, error } = await supabase!
      .from("live_sessions")
      .insert({
        code,
        quiz_id: quiz.id,
        quiz_title: quiz.title || "Nomsiz quiz",
        class_name: classItem?.name ?? null,
        status: "lobby",
        current_question_index: 0,
        quiz_json: quiz,
        players: [],
        answers: []
      })
      .select("*")
      .single();

    if (!error && data) return rowToState(data as CloudLiveSessionRow);
  }

  return null;
}

async function updateCloudSession(
  code: string,
  updater: (state: CloudLiveState) => Partial<CloudLiveSessionRow>
): Promise<CloudLiveState | null> {
  const state = await getCloudSession(code);
  if (!state) return null;

  const { data, error } = await supabase!
    .from("live_sessions")
    .update(updater(state))
    .eq("code", code)
    .select("*")
    .single();

  if (error || !data) return null;
  return rowToState(data as CloudLiveSessionRow);
}

export async function startCloudSession(code: string) {
  return updateCloudSession(code, () => ({
    status: "running",
    current_question_index: 0
  }));
}

export async function advanceCloudQuestion(code: string, totalQuestions: number) {
  return updateCloudSession(code, ({ session }) => {
    const nextIndex = session.currentQuestionIndex + 1;
    if (nextIndex >= totalQuestions) {
      return { status: "finished" };
    }
    return { current_question_index: nextIndex };
  });
}

export async function finishCloudSession(code: string) {
  return updateCloudSession(code, () => ({ status: "finished" }));
}

export async function addCloudPlayer(code: string, name: string) {
  return updateCloudSession(code, ({ session }) => {
    const player: LivePlayer = {
      id: `player-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      joinedAt: new Date().toISOString()
    };
    return { players: [...session.players, player] };
  });
}

export async function submitCloudAnswer(input: {
  code: string;
  playerId: string;
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}) {
  return updateCloudSession(input.code, ({ session }) => {
    const existing = session.answers.filter(
      (answer) => !(answer.playerId === input.playerId && answer.questionId === input.questionId)
    );
    const answer: LiveAnswer = {
      id: `answer-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      playerId: input.playerId,
      questionId: input.questionId,
      selectedIndex: input.selectedIndex,
      isCorrect: input.isCorrect,
      answeredAt: new Date().toISOString()
    };
    return { answers: [...existing, answer] };
  });
}
