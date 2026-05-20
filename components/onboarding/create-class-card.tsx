"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, UsersRound } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { saveStoredClass } from "@/lib/classes";
import { Logo } from "@/components/logo";

const steps = [
  { label: "Profil", done: true },
  { label: "Birinchi sinf", active: true },
  { label: "O'quvchilar" },
  { label: "Birinchi mashq" }
];

const levels = ["4", "5", "6", "7", "8", "9", "10", "11"];
const colors = ["#F59E0B", "#3B82F6", "#8B5CF6", "#10B981", "#EC4899", "#06B6D4"];

export function CreateClassCard() {
  const router = useRouter();
  const [name, setName] = useState("6-A guruh");
  const [level, setLevel] = useState("6");
  const [subject, setSubject] = useState("Matematika");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!isSupabaseConfigured || !supabase) {
      saveStoredClass({ name, subject });
      router.push("/u/sinflar");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setLoading(false);
      setMessage("Avval tizimga kiring. Supabase sessiyasi topilmadi.");
      return;
    }

    const { error } = await supabase.from("classes").insert({
      name,
      subject: subject || null,
      teacher_id: userData.user.id
    });

    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/u/sinflar");
  }

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <Logo />
          <div className="hidden flex-1 items-center justify-center gap-3 lg:flex">
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-xs font-black ${
                      step.done
                        ? "bg-ok text-white"
                        : step.active
                          ? "bg-brand text-white"
                          : "bg-slate-100 text-muted"
                    }`}
                  >
                    {step.done ? <Check size={14} /> : index + 1}
                  </span>
                  <span className={`text-sm font-black ${step.active ? "text-ink" : "text-muted"}`}>{step.label}</span>
                </div>
                {index < steps.length - 1 ? <span className={`h-0.5 w-8 ${step.done ? "bg-ok" : "bg-line"}`} /> : null}
              </div>
            ))}
          </div>
          <button onClick={() => router.push("/u/dashboard")} className="text-sm font-black text-muted">
            Keyinroq sozlash <ArrowRight className="inline" size={15} />
          </button>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-5xl items-center gap-8 px-5 py-10 lg:grid-cols-[1fr_420px]">
        <section>
          <span className="inline-flex rounded-full bg-brand-tint px-3 py-1 text-xs font-black text-brand-dark">
            2-qadam · 4 dan
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight">Birinchi sinfingizni yarating</h1>
          <p className="mt-4 max-w-xl text-[15px] font-semibold leading-7 text-muted">
            Sinf o'quvchilar guruhi. Keyin ularni shu sinfga qo'shasiz, mashqlarni biriktirasiz va natijalarni guruh bo'yicha ko'rasiz.
          </p>
          <div className="mt-7 flex gap-4 rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-dark">
              <UsersRound size={22} />
            </div>
            <div>
              <p className="font-black">Maslahat</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted">
                Bir nechta sinf bilan ishlasangiz, har biri uchun alohida yarating. Misol: "6-A guruh", "7-B guruh".
              </p>
            </div>
          </div>
        </section>

        <form onSubmit={onSubmit} className="rounded-lg border border-line bg-white p-6 shadow-lift">
          {!isSupabaseConfigured ? (
            <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900">
              Dev mode: sinf brauzer localStorage'iga saqlanadi.
            </div>
          ) : null}

          <label className="block">
            <span className="text-sm font-black">Sinf nomi</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-bg px-4 py-3 font-bold outline-none focus:border-brand"
              placeholder="masalan: 6-A guruh"
              required
            />
            <span className="mt-1 block text-xs font-bold text-muted">O'quvchilar ham shu nomni ko'radi</span>
          </label>

          <div className="mt-5">
            <p className="text-sm font-black">Sinf darajasi</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {levels.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLevel(item)}
                  className={`h-10 rounded-md text-sm font-black ${
                    level === item ? "bg-brand text-white" : "border border-line bg-white text-ink/75"
                  }`}
                >
                  {item}-sinf
                </button>
              ))}
            </div>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-black">Fan</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="mt-2 w-full rounded-md border border-line bg-bg px-4 py-3 font-bold outline-none focus:border-brand"
              placeholder="Masalan: Matematika"
            />
          </label>

          <div className="mt-5">
            <p className="text-sm font-black">Sinf rangi</p>
            <div className="mt-2 flex gap-3">
              {colors.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedColor(item)}
                  className="h-9 w-9 rounded-md"
                  style={{
                    backgroundColor: item,
                    boxShadow: selectedColor === item ? "0 0 0 3px white, 0 0 0 5px #111827" : "none"
                  }}
                  aria-label="Sinf rangi"
                />
              ))}
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/ro-yxat")}
              className="h-12 rounded-md border border-line bg-white px-5 font-black text-ink/75"
            >
              Orqaga
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-brand px-5 font-black text-white shadow-[0_3px_0_#B45309] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              Davom etish <ArrowRight size={18} />
            </button>
          </div>

          {message ? <p className="mt-4 rounded-md bg-bad/10 p-3 text-sm font-bold text-bad">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}
