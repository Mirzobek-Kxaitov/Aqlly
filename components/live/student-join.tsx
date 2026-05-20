"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, QrCode, Search } from "lucide-react";
import { addStoredPlayer, getStoredSession, LivePlayer, LiveSession } from "@/lib/live-sessions";
import { Logo } from "@/components/logo";

export function StudentJoin({ initialCode = "" }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [name, setName] = useState("");
  const [session, setSession] = useState<LiveSession | null>(null);
  const [player, setPlayer] = useState<LivePlayer | null>(null);
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialCode) setSession(getStoredSession(initialCode));
  }, [initialCode]);

  const codeDigits = useMemo(() => code.padEnd(6, " ").slice(0, 6).split(""), [code]);
  const roster = session?.players ?? [];

  function findSession() {
    const found = getStoredSession(code);
    setSession(found);
    setMessage(found ? "" : "Bunday PIN topilmadi.");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = session || getStoredSession(code);
    if (!found) {
      setMessage("Avval to'g'ri PIN kiriting.");
      return;
    }
    const result = addStoredPlayer(found.code, name.trim());
    setSession(result.session);
    setPlayer(result.player);
    setJoined(true);
    setMessage("");
  }

  if (joined && session) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#FFFBEB_0%,#ffffff_48%)] px-5 py-7">
        <div className="mx-auto max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <section className="mt-10 rounded-lg border border-line bg-white p-6 text-center shadow-lift">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-ok/10 text-ok">
              <CheckCircle2 size={28} />
            </div>
            <h1 className="mt-5 text-3xl font-black">Lobbyga qo'shildingiz</h1>
            <p className="mt-2 text-sm font-bold text-muted">{session.quizTitle}</p>
            <div className="mt-5 rounded-md bg-bg p-4 text-left">
              <p className="text-xs font-black uppercase tracking-wide text-muted">Ishtirokchi</p>
              <p className="mt-1 text-lg font-black">{player?.name}</p>
              <p className="mt-3 text-sm font-bold text-muted">Ustoz boshlashini kuting.</p>
            </div>
            {player ? (
              <Link
                href={`/q/jonli/${session.code}?player=${player.id}`}
                className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-4 font-black text-ink shadow-[0_3px_0_#B45309]"
              >
                Quiz oynasiga o'tish <ArrowRight size={18} />
              </Link>
            ) : null}
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#FFFBEB_0%,#ffffff_52%)] px-5 py-7">
      <div className="mx-auto max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>

        <section className="mt-10 rounded-lg border border-line bg-white p-6 shadow-lift">
          <div>
            <h1 className="text-3xl font-black">Quizga qo'shilish</h1>
            <p className="mt-1 text-sm font-bold text-muted">Ustozingiz ekranidagi PIN'ni kiriting</p>
          </div>

          <div className="mt-6">
            <label htmlFor="pin" className="sr-only">PIN kod</label>
            <input
              id="pin"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="sr-only"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
            <div className="grid grid-cols-6 gap-2" onClick={() => document.getElementById("pin")?.focus()}>
              {codeDigits.map((digit, index) => {
                const isActive = index === Math.min(code.length, 5);
                return (
                  <div
                    key={index}
                    className={`grid h-14 place-items-center rounded-md border text-2xl font-black ${
                      digit.trim()
                        ? "border-brand/30 bg-brand-tint text-ink"
                        : isActive
                          ? "border-2 border-brand bg-bg text-brand-dark"
                          : "border-line bg-bg text-muted"
                    }`}
                  >
                    {digit.trim() || ""}
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={findSession}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand font-black text-ink shadow-[0_3px_0_#B45309]"
            >
              Davom etish <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-md bg-bg p-3 text-sm font-bold text-muted">
            <QrCode size={18} className="text-brand-dark" />
            <span className="flex-1">Yoki ustozning QR kodini skanerlang</span>
            <span className="font-black text-brand-dark">Skaner</span>
          </div>
        </section>

        {session ? (
          <form onSubmit={onSubmit} className="mt-5 rounded-lg border border-line bg-white p-5 shadow-lift">
            <Link href="/q" className="inline-flex items-center gap-2 text-sm font-black text-muted" onClick={() => setSession(null)}>
              <ArrowLeft size={16} /> PINni almashtirish
            </Link>
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1 text-xs font-black text-brand-dark">
                <span className="h-2 w-2 rounded-full bg-ok" /> Sinf topildi
              </span>
              <h2 className="mt-3 text-2xl font-black">Siz kimsiz?</h2>
              <p className="mt-1 text-sm font-bold text-muted">
                {session.className || "Jonli quiz"} · {session.quizTitle}
              </p>
            </div>

            <label className="mt-4 flex items-center gap-2 rounded-md border border-line bg-bg px-3 py-3">
              <Search size={17} className="text-muted" />
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full bg-transparent text-sm font-bold outline-none"
                placeholder="Ismingizni yozing..."
                required
              />
            </label>

            {roster.length > 0 ? (
              <div className="mt-4 max-h-44 space-y-2 overflow-auto">
                {roster.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setName(item.name)}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-brand-tint"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-black text-white">
                      {item.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                    </span>
                    <span className="font-black">{item.name}</span>
                  </button>
                ))}
              </div>
            ) : null}

            <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand font-black text-ink shadow-[0_3px_0_#B45309]">
              Quizga kirish <ArrowRight size={18} />
            </button>
          </form>
        ) : null}

        {message ? <p className="mt-4 rounded-md bg-bad/10 p-3 text-sm font-bold text-bad">{message}</p> : null}
      </div>
    </main>
  );
}
