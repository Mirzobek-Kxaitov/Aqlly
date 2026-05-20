"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Download, Send, Trophy, UsersRound } from "lucide-react";
import { getStoredSessionResult, SessionResult } from "@/lib/results";

export function ResultDetail({ code }: { code: string }) {
  const [result, setResult] = useState<SessionResult | null>(null);

  useEffect(() => {
    setResult(getStoredSessionResult(code));
  }, [code]);

  if (!result) {
    return (
      <div className="rounded-xl border border-line bg-white p-6">
        <h1 className="text-2xl font-black">Hisobot topilmadi</h1>
        <Link href="/u/natijalar" className="mt-4 inline-flex items-center gap-2 font-black text-brand-dark">
          <ArrowLeft size={18} /> Natijalarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link href="/u/natijalar" className="inline-flex items-center gap-2 text-sm font-black text-brand-dark">
        <ArrowLeft size={17} /> Natijalar
      </Link>

      <section className="mt-5 overflow-hidden rounded-[14px] bg-gradient-to-br from-brand to-orange-400 p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-white/90">PIN {result.session.code}</p>
            <h1 className="mt-2 text-3xl font-black tracking-normal">{result.session.quizTitle}</h1>
            <p className="mt-2 text-sm font-semibold text-white/90">{result.session.className || "Sinf tanlanmagan"} · {result.session.status}</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-black text-brand-dark">
              <Download size={16} /> Eksport
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-sm font-black text-white ring-1 ring-white/30">
              <Send size={16} /> Yuborish
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <HeroMetric label="Qatnashdi" value={String(result.session.players.length)} />
          <HeroMetric label="O'rtacha ball" value={`${result.averagePercent}%`} />
          <HeroMetric label="Eng yuqori ball" value={`${result.topScore}%`} />
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryCard icon={<UsersRound size={20} />} label="O'quvchilar" value={String(result.session.players.length)} sub={`${result.playerResults.length} ta natija`} />
        <SummaryCard icon={<BarChart3 size={20} />} label="Savollar" value={String(result.totalQuestions)} sub={`${result.session.answers.length} ta javob`} />
        <SummaryCard icon={<Trophy size={20} />} label="Top ball" value={`${result.topScore}%`} sub={result.playerResults[0]?.name || "Hali yo'q"} />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="text-[17px] font-black">O'quvchi natijalari</h2>
          <div className="mt-4 space-y-2">
            {result.playerResults.map((player, index) => (
              <div key={player.playerId} className="grid gap-3 rounded-lg border border-line-soft px-4 py-3 md:grid-cols-[34px_40px_1fr_120px_70px] md:items-center">
                <span className={`text-center text-sm font-black ${index < 3 ? "text-brand-dark" : "text-muted"}`}>{index + 1}</span>
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white ${avatarColors[index % avatarColors.length]}`}>
                  {initials(player.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-black">{player.name}</p>
                  <p className="mt-0.5 text-sm font-semibold text-muted">
                    {player.correct} to'g'ri · {player.answered}/{player.total} javob
                  </p>
                </div>
                <Progress value={player.percent} />
                <span className={`font-black ${scoreColor(player.percent)}`}>{player.percent}%</span>
              </div>
            ))}
            {!result.playerResults.length ? <p className="rounded-lg border border-dashed border-line p-8 text-center font-bold text-muted">O'quvchilar yo'q.</p> : null}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="text-[17px] font-black">Savol bo'yicha</h2>
          <div className="mt-4 space-y-3">
            {result.questionResults.map((question, index) => (
              <div key={question.questionId} className="rounded-lg border border-line p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase text-muted">{index + 1}-savol</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-black ${question.percent >= 80 ? "bg-ok-soft text-emerald-700" : question.percent >= 60 ? "bg-brand-soft text-brand-dark" : "bg-bad-soft text-red-700"}`}>
                    {question.percent}%
                  </span>
                </div>
                <p className="font-black leading-6">{question.text}</p>
                <div className="mt-3 flex items-center justify-between text-sm font-bold text-muted">
                  <span>{question.correct}/{question.totalPlayers} to'g'ri</span>
                  <span>{question.answered} javob</span>
                </div>
                <div className="mt-2">
                  <Progress value={question.percent} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/15 p-4 ring-1 ring-white/20">
      <p className="text-xs font-black uppercase tracking-[0.08em] text-white/80">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function SummaryCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand-dark">{icon}</div>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.06em] text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm font-semibold text-muted">{sub}</p>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  const color = value >= 80 ? "bg-ok" : value >= 60 ? "bg-brand" : "bg-bad";
  return (
    <div className="h-2 overflow-hidden rounded-full bg-line-soft">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function scoreColor(value: number) {
  if (value >= 80) return "text-ok";
  if (value >= 60) return "text-brand-dark";
  return "text-bad";
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = ["bg-quiz-blue", "bg-brand", "bg-quiz-purple", "bg-pink-500", "bg-ok", "bg-cyan-500"];
