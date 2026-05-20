"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Flag, SkipForward, Timer, Trophy, UsersRound, XCircle } from "lucide-react";
import { advanceCloudQuestion, finishCloudSession, getCloudSession } from "@/lib/cloud-live-sessions";
import { advanceStoredQuestion, finishStoredSession, getStoredSession, LiveSession } from "@/lib/live-sessions";
import { getStoredQuiz, Quiz } from "@/lib/quizzes";

const answerStyles = [
  "bg-quiz-red border-red-300 text-white",
  "bg-quiz-blue border-blue-300 text-white",
  "bg-quiz-green border-green-300 text-white",
  "bg-quiz-purple border-purple-300 text-white"
];

const answerMarks = ["A", "B", "C", "D"];

export function HostView({ code }: { code: string }) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const load = async () => {
      const cloudState = await getCloudSession(code);
      if (cloudState) {
        setSession(cloudState.session);
        setQuiz(cloudState.quiz);
        return;
      }
      const localState = getStoredSession(code);
      setSession(localState);
      setQuiz(localState ? getStoredQuiz(localState.quizId) : null);
    };
    load();
    const timer = window.setInterval(load, 1200);
    return () => window.clearInterval(timer);
  }, [code]);

  const question = quiz?.questions[session?.currentQuestionIndex ?? 0];
  const answersForQuestion = useMemo(() => {
    if (!session || !question) return [];
    return session.answers.filter((answer) => answer.questionId === question.id);
  }, [question, session]);

  const leaderboard = useMemo(() => {
    if (!session) return [];
    return session.players
      .map((player) => ({
        ...player,
        correct: session.answers.filter((answer) => answer.playerId === player.id && answer.isCorrect).length
      }))
      .sort((a, b) => b.correct - a.correct || a.joinedAt.localeCompare(b.joinedAt));
  }, [session]);

  if (!session || !quiz || !question) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-white">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/10 p-6 text-center shadow-xl shadow-black/20">
          <h1 className="text-2xl font-black">Host panel topilmadi</h1>
          <Link
            href="/u/mashqlar"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-black text-ink"
          >
            <ArrowLeft size={17} /> Mashqlarga qaytish
          </Link>
        </div>
      </main>
    );
  }

  async function nextQuestion() {
    if (!quiz) return;
    const cloudState = await advanceCloudQuestion(code, quiz.questions.length);
    const next = cloudState?.session ?? advanceStoredQuestion(code, quiz.questions.length);
    setSession(next ?? null);
  }

  async function finish() {
    const cloudState = await finishCloudSession(code);
    const next = cloudState?.session ?? finishStoredSession(code);
    setSession(next ?? null);
  }

  const correctCount = answersForQuestion.filter((answer) => answer.isCorrect).length;
  const progress = Math.round((answersForQuestion.length / Math.max(session.players.length, 1)) * 100);
  const isFinished = session.status === "finished";

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(145deg,#111827_0%,#0f172a_58%,#111827_100%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/u/jonli/${code}/lobby`}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 text-sm font-black text-white backdrop-blur"
          >
            <ArrowLeft size={17} /> Lobby
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-white/70">
              {session.currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
            <span className="rounded-md bg-brand px-3 py-2 text-sm font-black text-ink">
              PIN {session.code}
            </span>
          </div>
        </header>

        <section className="grid flex-1 gap-6 py-6 xl:grid-cols-[1fr_360px]">
          <div className="flex min-h-0 flex-col">
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-soft">{quiz.title}</p>
                  <h1 className="mt-3 max-w-5xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
                    {isFinished ? "Quiz yakunlandi" : question.text}
                  </h1>
                </div>
                <div className="grid h-24 w-24 place-items-center rounded-full border-8 border-brand bg-white text-center text-ink shadow-xl shadow-brand/20">
                  <Timer size={22} className="mx-auto" />
                  <span className="block text-xl font-black">{question.timeLimit}</span>
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-3 text-sm font-black text-white/55">
                <span>{answersForQuestion.length} javob</span>
                <span>{correctCount} to'g'ri</span>
              </div>
            </div>

            {!isFinished && (
              <div className="mt-5 grid flex-1 gap-4 md:grid-cols-2">
                {question.options.map((option, index) => {
                  const answers = answersForQuestion.filter((answer) => answer.selectedIndex === index).length;
                  const isCorrect = question.correctIndex === index;
                  return (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-lg border p-5 shadow-xl shadow-black/10 ${answerStyles[index] ?? answerStyles[0]}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-4">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-white/20 text-xl font-black">
                            {answerMarks[index]}
                          </span>
                          <p className="text-2xl font-black leading-snug">{option}</p>
                        </div>
                        {isCorrect && <CheckCircle2 className="shrink-0" size={28} />}
                      </div>
                      <div className="mt-6 flex items-center justify-between text-sm font-black text-white/75">
                        <span>{answers} tanladi</span>
                        <span>{isCorrect ? "To'g'ri javob" : "Variant"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={nextQuestion}
                className="inline-flex h-12 items-center gap-2 rounded-md bg-brand px-5 text-sm font-black text-ink shadow-lg shadow-brand/20"
              >
                <SkipForward size={18} /> Keyingi savol
              </button>
              <button
                onClick={finish}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-5 text-sm font-black text-white"
              >
                <Flag size={18} /> Tugatish
              </button>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white p-5 text-ink shadow-2xl shadow-black/25">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Trophy className="text-brand-dark" size={22} />
                <h2 className="text-xl font-black">Natijalar</h2>
              </div>
              <span className="rounded bg-bg px-2 py-1 text-xs font-black text-muted">{session.status}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-bg p-4">
                <p className="text-xs font-black uppercase text-muted">O'yinchi</p>
                <p className="mt-2 text-3xl font-black">{session.players.length}</p>
              </div>
              <div className="rounded-md bg-bg p-4">
                <p className="text-xs font-black uppercase text-muted">Javob</p>
                <p className="mt-2 text-3xl font-black">{answersForQuestion.length}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {leaderboard.length === 0 ? (
                <div className="rounded-md border border-dashed border-line p-4 text-sm font-bold text-muted">
                  O'quvchilar lobbydan qo'shiladi.
                </div>
              ) : (
                leaderboard.map((player, index) => {
                  const answer = answersForQuestion.find((item) => item.playerId === player.id);
                  return (
                    <div key={player.id} className="flex items-center justify-between rounded-md bg-bg px-3 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-white text-sm font-black text-muted">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-black">{player.name}</p>
                          <p className="text-xs font-bold text-muted">{player.correct} to'g'ri</p>
                        </div>
                      </div>
                      {answer ? (
                        answer.isCorrect ? (
                          <CheckCircle2 className="text-ok" size={19} />
                        ) : (
                          <XCircle className="text-bad" size={19} />
                        )
                      ) : (
                        <span className="text-xs font-black text-muted">kutmoqda</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-5 rounded-md bg-brand-soft p-4">
              <div className="flex items-center gap-2 text-sm font-black text-brand-dark">
                <UsersRound size={18} /> Sinf ritmi
              </div>
              <p className="mt-2 text-sm font-bold text-muted">
                Keyingi savolga o'tishdan oldin javoblar sonini tekshiring.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
