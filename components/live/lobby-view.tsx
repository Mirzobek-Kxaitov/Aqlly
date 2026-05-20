"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, QrCode, Sparkles, UsersRound } from "lucide-react";
import { getStoredSession, LiveSession, startStoredSession } from "@/lib/live-sessions";

export function LobbyView({ code }: { code: string }) {
  const router = useRouter();
  const [session, setSession] = useState<LiveSession | null>(null);
  const [joinUrl, setJoinUrl] = useState("");

  useEffect(() => {
    const load = () => setSession(getStoredSession(code));
    load();
    setJoinUrl(`${window.location.origin}/q?code=${code}`);
    const timer = window.setInterval(load, 1200);
    return () => window.clearInterval(timer);
  }, [code]);

  function markRunning() {
    const next = startStoredSession(code);
    setSession(next);
    router.push(`/u/jonli/${code}/xost`);
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-white">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/10 p-6 text-center shadow-xl shadow-black/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-brand text-ink">
            <Sparkles size={22} />
          </div>
          <h1 className="mt-4 text-2xl font-black">Lobby topilmadi</h1>
          <p className="mt-2 text-sm font-bold text-white/60">Kod eskirgan yoki sessiya yopilgan bo'lishi mumkin.</p>
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.25),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.16),transparent_30%),linear-gradient(135deg,#111827_0%,#0f172a_54%,#111827_100%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/u/mashqlar"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 text-sm font-black text-white backdrop-blur"
          >
            <ArrowLeft size={17} /> Orqaga
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-brand/40 bg-brand/15 px-3 py-2 text-sm font-black text-brand-soft">
              Jonli quiz
            </span>
            <span className="rounded-md bg-white px-3 py-2 text-sm font-black text-ink">Aqlly</span>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-soft">O'quvchilar qo'shilmoqda</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">{session.quizTitle}</h1>
            <div className="mt-6 flex flex-wrap gap-3">
              {session.className && (
                <span className="rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white/80">
                  {session.className}
                </span>
              )}
              <span className="rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm font-black text-white/80">
                {session.players.length} ishtirokchi
              </span>
            </div>

            <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-black uppercase tracking-wide text-white/55">Kirish manzili</p>
                <p className="mt-3 break-all text-lg font-black text-white">{joinUrl}</p>
              </div>
              <div className="rounded-lg border border-brand/35 bg-brand p-5 text-ink shadow-xl shadow-brand/20">
                <p className="text-sm font-black uppercase tracking-wide text-ink/60">PIN kod</p>
                <p className="mt-2 text-5xl font-black tracking-[0.12em]">{session.code}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white p-5 text-ink shadow-2xl shadow-black/30">
            <div className="grid aspect-square place-items-center rounded-lg border border-dashed border-ink/20 bg-bg">
              <QrCode size={180} strokeWidth={1.7} className="text-ink" />
            </div>
            <button
              onClick={markRunning}
              className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-brand text-base font-black text-ink shadow-lg shadow-brand/25"
            >
              <Play size={20} fill="currentColor" /> Boshlash
            </button>
          </aside>
        </section>

        <section className="mb-5 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-black text-white/70">
              <UsersRound size={18} /> Lobby
            </div>
            <span className="text-sm font-black text-white/50">O'quvchilar telefon orqali qo'shiladi</span>
          </div>
          <div className="mt-4 flex min-h-[52px] flex-wrap gap-3">
            {session.players.length === 0 ? (
              <span className="rounded-md border border-dashed border-white/20 px-4 py-3 text-sm font-bold text-white/45">
                Hali hech kim qo'shilmadi
              </span>
            ) : (
              session.players.map((player) => (
                <span key={player.id} className="rounded-md bg-white px-4 py-3 text-sm font-black text-ink">
                  {player.name}
                </span>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
