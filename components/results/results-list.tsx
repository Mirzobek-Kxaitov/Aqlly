"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, Download, Send, Trophy, UsersRound } from "lucide-react";
import { getStoredSessionResults, SessionResult } from "@/lib/results";

const fallbackBars = [58, 62, 67, 64, 71, 73, 78, 75, 82];

export function ResultsList() {
  const [items, setItems] = useState<SessionResult[]>([]);

  useEffect(() => {
    setItems(getStoredSessionResults());
  }, []);

  const summary = useMemo(() => {
    const latest = items[0];
    const average = items.length ? Math.round(items.reduce((sum, item) => sum + item.averagePercent, 0) / items.length) : 73;
    const players = items.reduce((sum, item) => sum + item.session.players.length, 0) || 28;
    const sessions = items.length || 18;
    return { latest, average, players, sessions };
  }, [items]);

  if (!items.length) {
    return (
      <div className="mt-8 rounded-[14px] border border-dashed border-line bg-white p-8 text-center">
        <BarChart3 className="mx-auto text-faint" size={42} />
        <h2 className="mt-4 text-xl font-black">Hali natija yo'q</h2>
        <p className="mt-2 text-muted">Live quiz tugagandan keyin hisobotlar shu yerda chiqadi.</p>
        <Link href="/u/mashqlar" className="mt-5 inline-flex rounded-[10px] bg-brand px-5 py-3 font-black text-white">
          Quiz boshlash
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-br from-brand to-orange-400 p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-white/90">So'nggi natijalar</p>
          <div className="mt-3 flex items-end gap-4">
            <p className="text-6xl font-black leading-none tracking-normal">{summary.average}%</p>
            <div className="pb-1 text-sm font-bold text-white/90">
              <p>O'rtacha ball</p>
              <p className="mt-1">↑ {Math.max(1, summary.average - 65)}% o'sish</p>
            </div>
          </div>
          <div className="mt-5 flex gap-8 text-sm font-semibold text-white/90">
            <div><b className="block text-2xl font-black text-white">{summary.players}</b>O'quvchi</div>
            <div><b className="block text-2xl font-black text-white">{items.length}</b>Hisobot</div>
            <div><b className="block text-2xl font-black text-white">{summary.sessions}</b>Seans</div>
          </div>
        </div>
        <SummaryCard icon={<Trophy size={18} />} label="Eng yuqori ball" value={`${Math.max(...items.map((item) => item.topScore))}%`} sub="So'nggi seanslar" tone="ok" />
        <SummaryCard icon={<UsersRound size={18} />} label="Qatnashuv" value={String(summary.players)} sub="Jami ishtirok" tone="blue" />
        <SummaryCard icon={<BarChart3 size={18} />} label="Yordam kerak" value={String(items.filter((item) => item.averagePercent < 60).length)} sub="60% dan past seans" tone="warn" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="space-y-5">
          <div className="rounded-xl border border-line bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[15px] font-black">Taraqqiyot grafigi</h2>
              <div className="flex gap-1">
                <button className="rounded bg-brand px-3 py-1 text-xs font-black text-white">Hafta</button>
                <button className="rounded border border-line px-3 py-1 text-xs font-black text-muted">Oy</button>
              </div>
            </div>
            <div className="flex h-60 items-end gap-3">
              {(items.length ? items.slice(0, 9).map((item) => item.averagePercent) : fallbackBars).map((value, index) => (
                <Bar key={index} value={value} label={`${index + 1}-h`} highlight={index >= 7} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[15px] font-black">Oxirgi hisobotlar</h2>
              <Link href="/u/mashqlar" className="text-sm font-black text-brand-dark">Yangi quiz</Link>
            </div>
            <div className="space-y-2">
              {items.map((item, index) => (
                <Link
                  key={item.session.code}
                  href={`/u/natijalar/${item.session.code}`}
                  className="grid gap-3 rounded-lg border border-line-soft bg-white px-4 py-3 transition hover:border-line hover:shadow-sm lg:grid-cols-[32px_1fr_80px_100px_70px] lg:items-center"
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-black ${index < 3 ? "bg-brand-soft text-brand-dark" : "bg-line-soft text-muted"}`}>
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-black">{item.session.quizTitle}</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-muted">{item.session.className || "Sinf tanlanmagan"} · PIN {item.session.code}</p>
                  </div>
                  <span className="text-sm font-bold text-muted">{item.session.players.length} o'quvchi</span>
                  <Progress value={item.averagePercent} />
                  <span className={`font-black ${item.averagePercent >= 80 ? "text-ok" : item.averagePercent >= 60 ? "text-brand-dark" : "text-bad"}`}>{item.averagePercent}%</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-black">O'quvchilar reytingi</h2>
            <button className="rounded border border-brand bg-brand-tint px-3 py-1 text-xs font-black text-brand-dark">Ball</button>
          </div>
          <div className="space-y-2">
            {(summary.latest?.playerResults ?? []).slice(0, 9).map((player, index) => (
              <div key={player.playerId} className="grid grid-cols-[28px_36px_1fr_70px_52px] items-center gap-3 rounded-lg border border-line-soft px-3 py-2.5">
                <span className={`text-center text-sm font-black ${index < 3 ? "text-brand-dark" : "text-muted"}`}>{index + 1}</span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white ${avatarColors[index % avatarColors.length]}`}>
                  {initials(player.name)}
                </span>
                <span className="truncate text-sm font-black">{player.name}</span>
                <span className="rounded-full bg-brand-soft px-2 py-1 text-center text-xs font-black text-brand-dark">{player.percent}%</span>
                <span className="text-sm font-bold text-ok">↑ {Math.max(1, index + 1)}</span>
              </div>
            ))}
            {!summary.latest?.playerResults.length ? (
              <p className="rounded-lg border border-dashed border-line p-6 text-center text-sm font-bold text-muted">Hali reyting uchun o'quvchilar yo'q.</p>
            ) : null}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-lg border border-dashed border-brand bg-brand-tint p-4">
            <Send size={22} className="text-brand-dark" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">Ota-onalarga yuborish</p>
              <p className="mt-0.5 text-xs font-semibold text-muted">Telegram + SMS uchun tayyor blok.</p>
            </div>
            <button className="rounded-md bg-brand px-3 py-2 text-xs font-black text-white">Yuborish</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, sub, tone }: { icon: React.ReactNode; label: string; value: string; sub: string; tone: "ok" | "blue" | "warn" }) {
  const tones = {
    ok: "bg-ok-soft text-emerald-700",
    blue: "bg-quiz-blue/15 text-blue-700",
    warn: "bg-brand-soft text-brand-dark"
  };
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tones[tone]}`}>{icon}</div>
      <p className="mt-3 text-sm font-bold text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className="mt-2 text-sm font-semibold text-muted">{sub}</p>
    </div>
  );
}

function Bar({ value, label, highlight }: { value: number; label: string; highlight?: boolean }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
      <span className="font-mono text-xs font-black">{value}%</span>
      <div className="relative h-36 w-full max-w-9 overflow-hidden rounded-md bg-line-soft">
        <div className={`absolute bottom-0 left-0 right-0 rounded-md ${highlight ? "bg-ok" : "bg-brand"}`} style={{ height: `${value}%` }} />
      </div>
      <span className="whitespace-nowrap text-xs font-bold text-muted">{label}</span>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  const color = value >= 80 ? "bg-ok" : value >= 60 ? "bg-brand" : "bg-bad";
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-line-soft">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = ["bg-quiz-blue", "bg-brand", "bg-quiz-purple", "bg-pink-500", "bg-ok", "bg-cyan-500"];
