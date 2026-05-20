"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Trophy, XCircle } from "lucide-react";
import { getCloudSession, submitCloudAnswer } from "@/lib/cloud-live-sessions";
import { getStoredSession, LiveSession, submitStoredAnswer } from "@/lib/live-sessions";
import { getStoredQuiz, Quiz } from "@/lib/quizzes";
import { Logo } from "@/components/logo";

const answerStyles = [
  "bg-quiz-red",
  "bg-quiz-green",
  "bg-quiz-blue",
  "bg-quiz-purple"
];

const answerShapes = ["▲", "◆", "●", "■"];

export function PlayerView({ code, playerId }: { code: string; playerId?: string }) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

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
    const timer = window.setInterval(load, 1000);
    return () => window.clearInterval(timer);
  }, [code]);

  const player = useMemo(() => session?.players.find((item) => item.id === playerId), [playerId, session]);
  const question = quiz?.questions[session?.currentQuestionIndex ?? 0];
  const existingAnswer = useMemo(() => {
    if (!session || !question || !playerId) return null;
    return session.answers.find((answer) => answer.playerId === playerId && answer.questionId === question.id) ?? null;
  }, [playerId, question, session]);
  const score = useMemo(() => {
    if (!session || !playerId) return 0;
    return session.answers.filter((answer) => answer.playerId === playerId && answer.isCorrect).length;
  }, [playerId, session]);
  const rank = useMemo(() => {
    if (!session || !playerId) return 1;
    const ranked = session.players
      .map((item) => ({
        id: item.id,
        score: session.answers.filter((answer) => answer.playerId === item.id && answer.isCorrect).length
      }))
      .sort((a, b) => b.score - a.score);
    return Math.max(1, ranked.findIndex((item) => item.id === playerId) + 1);
  }, [playerId, session]);

  useEffect(() => {
    setSelected(null);
  }, [question?.id]);

  async function answer(index: number) {
    if (!question || !playerId || existingAnswer) return;
    setSelected(index);
    const cloudState = await submitCloudAnswer({
      code,
      playerId,
      questionId: question.id,
      selectedIndex: index,
      isCorrect: index === question.correctIndex
    });
    if (cloudState) {
      setSession(cloudState.session);
      return;
    }
    submitStoredAnswer({
      code,
      playerId,
      questionId: question.id,
      selectedIndex: index,
      isCorrect: index === question.correctIndex
    });
  }

  if (!session || !quiz) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg px-5">
        <div className="rounded-lg border border-line bg-white p-6 text-center shadow-lift">
          <h1 className="text-2xl font-black">Quiz topilmadi</h1>
          <Link href="/q" className="mt-4 inline-flex font-black text-brand-dark">PIN sahifasiga qaytish</Link>
        </div>
      </main>
    );
  }

  if (!player) {
    return (
      <main className="grid min-h-screen place-items-center bg-bg px-5">
        <div className="rounded-lg border border-line bg-white p-6 text-center shadow-lift">
          <h1 className="text-2xl font-black">Avval lobbyga qo'shiling</h1>
          <Link href={`/q?code=${code}`} className="mt-4 inline-flex font-black text-brand-dark">Qo'shilish</Link>
        </div>
      </main>
    );
  }

  if (session.status === "lobby") {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#FFFBEB_0%,#ffffff_54%)] px-5 py-8">
        <div className="mx-auto max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <section className="mt-10 rounded-lg border border-line bg-white p-6 text-center shadow-lift">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-brand-tint text-brand-dark">
              <Clock3 size={28} />
            </div>
            <h1 className="mt-5 text-3xl font-black">Kutish xonasi</h1>
            <p className="mt-2 text-sm font-bold text-muted">Ustoz quizni boshlashini kuting, {player.name}.</p>
            <div className="mt-5 rounded-md bg-bg p-4 text-left">
              <p className="text-xs font-black uppercase tracking-wide text-muted">Quiz</p>
              <p className="mt-1 font-black">{quiz.title}</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (session.status === "finished" || !question) {
    const percent = Math.round((score / Math.max(quiz.questions.length, 1)) * 100);
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,#F59E0B_0%,#FB923C_100%)] px-5 py-8 text-white">
        <div className="mx-auto max-w-md">
          <section className="rounded-lg border border-white/25 bg-white/15 p-6 text-center shadow-xl shadow-brand-dark/20 backdrop-blur">
            <Trophy className="mx-auto" size={46} />
            <h1 className="mt-5 text-3xl font-black">Quiz tugadi</h1>
            <p className="mt-2 text-sm font-bold text-white/80">{player.name}</p>
            <div className="mt-6 text-7xl font-black leading-none">
              {percent}<span className="text-3xl">%</span>
            </div>
            <p className="mt-3 text-lg font-black">{score} / {quiz.questions.length} to'g'ri</p>
            <Link href="/q" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-white font-black text-brand-dark">
              Yangi PIN kiritish
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const lockedAnswer = existingAnswer?.selectedIndex ?? selected;

  return (
    <main className="min-h-screen bg-ink px-5 py-5 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-md flex-col">
        <header className="flex items-center justify-between gap-3">
          <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide">
            Savol <span className="text-brand">{session.currentQuestionIndex + 1}</span> / {quiz.questions.length}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-black text-white">
              {player.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
            </span>
            <span className="text-sm font-black">{score}</span>
          </div>
        </header>

        <section className="mt-5 flex items-center gap-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[6px] border-white/15 bg-white/5">
            <div className="absolute inset-[-6px] rounded-full border-[6px] border-brand border-r-transparent border-t-transparent" />
            <div className="text-center">
              <p className="text-3xl font-black leading-none">{question.timeLimit}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/55">sek</p>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/55">Sizning o'rningiz</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-5xl font-black leading-none text-brand">{rank}</span>
              <span className="text-sm font-bold text-white/70">/ {session.players.length}</span>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-lg border border-white/10 bg-white/5 p-5">
          <h1 className="text-xl font-black leading-snug">{question.text}</h1>
        </section>

        <section className="mt-4 grid flex-1 grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            const isSelected = lockedAnswer === index;
            const isCorrect = question.correctIndex === index;
            const isMuted = Boolean(existingAnswer) && !isSelected && !isCorrect;
            return (
              <button
                key={index}
                type="button"
                onClick={() => answer(index)}
                disabled={Boolean(existingAnswer)}
                className={`flex min-h-36 flex-col justify-between rounded-lg p-4 text-left text-white transition ${
                  answerStyles[index] ?? answerStyles[0]
                } ${isSelected ? "ring-4 ring-white" : ""} ${isMuted ? "opacity-45" : "opacity-100"}`}
              >
                <span className="text-3xl font-black leading-none">{answerShapes[index]}</span>
                <span className="text-xl font-black leading-tight">{option}</span>
              </button>
            );
          })}
        </section>

        {existingAnswer ? (
          <section
            className={`mt-4 flex items-start gap-3 rounded-lg border p-4 text-sm font-bold ${
              existingAnswer.isCorrect
                ? "border-ok/30 bg-ok/15 text-emerald-100"
                : "border-bad/30 bg-bad/15 text-red-100"
            }`}
          >
            {existingAnswer.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <div>
              <p className="font-black">{existingAnswer.isCorrect ? "Javobingiz qabul qilindi" : "Javob qabul qilindi"}</p>
              {question.explanation ? <p className="mt-1 text-white/65">{question.explanation}</p> : null}
              <p className="mt-1 text-white/65">Keyingi savolni kuting.</p>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
