"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Loader2, Lock, Mail, UserRound } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [subject, setSubject] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isSignUp = mode === "sign-up";
  const title = isSignUp ? "Bepul hisob ochish" : "Qaytib kelganingiz bilan!";
  const description = isSignUp ? "Ustozlar uchun. Karta kerak emas, barchasi bepul." : "Hisobingizga kiring va davom eting.";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!isSignUp && email.trim() === "test_ustoz" && password === "test1234") {
      window.localStorage.setItem(
        "aqlly.dev.user",
        JSON.stringify({
          id: "demo-teacher",
          login: "test_ustoz",
          fullName: "Test Ustoz",
          role: "teacher"
        })
      );
      setLoading(false);
      router.push("/u/dashboard");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setTimeout(() => {
        setLoading(false);
        router.push(isSignUp ? "/boshlash" : "/u/dashboard");
      }, 350);
      return;
    }

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/boshlash`,
          data: {
            full_name: fullName,
            school_name: school,
            subject,
            role: "teacher"
          }
        }
      });

      if (error) {
        setLoading(false);
        setMessage(error.message);
        return;
      }

      if (data.session) {
        await supabase.from("teacher_profiles").upsert({
          id: data.user?.id,
          full_name: fullName,
          subject: subject || null
        });
        setLoading(false);
        router.push("/boshlash");
        return;
      }

      setLoading(false);
      setMessage("Tasdiqlash xati emailingizga yuborildi. Emailni tasdiqlab, keyin kirishingiz mumkin.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/u/dashboard");
  }

  async function continueWithGoogle() {
    if (!isSupabaseConfigured || !supabase) {
      router.push(isSignUp ? "/boshlash" : "/u/dashboard");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${isSignUp ? "/boshlash" : "/u/dashboard"}`
      }
    });
  }

  return (
    <div>
      <p className="text-sm font-bold text-muted">
        {isSignUp ? "Allaqachon ro'yxatdan o'tganmisiz?" : "Yangi foydalanuvchimisiz?"}{" "}
        <Link href={isSignUp ? "/kirish" : "/ro-yxat"} className="font-black text-brand-dark">
          {isSignUp ? "Kirish" : "Ro'yxatdan o'tish"}
        </Link>
      </p>
      <h1 className="mt-2 text-4xl font-black leading-tight">{title}</h1>
      <p className="mt-2 text-[15px] font-semibold leading-7 text-muted">{description}</p>

      <div className="mt-7 grid gap-3">
        <button
          type="button"
          onClick={continueWithGoogle}
          className="inline-flex h-12 items-center justify-center rounded-md border border-line bg-white px-4 text-sm font-black"
        >
          Google bilan
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs font-black uppercase text-slate-300">
        <span className="h-px flex-1 bg-line" />
        {isSignUp ? "Yoki email bilan" : "Yoki"}
        <span className="h-px flex-1 bg-line" />
      </div>

      {!isSupabaseConfigured ? (
        <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900">
          Dev mode: Supabase ulanmagan, forma demo oqimga o'tkazadi.
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        {isSignUp ? (
          <>
            <label className="block">
              <span className="text-sm font-black text-ink/80">Ism familiya</span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-bg px-4 py-3 font-bold outline-none focus:border-brand"
                placeholder="Akmal Yo'ldoshev"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-black text-ink/80">Maktab</span>
              <input
                value={school}
                onChange={(event) => setSchool(event.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-bg px-4 py-3 font-bold outline-none focus:border-brand"
                placeholder="47-maktab, Toshkent shahri"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-black text-ink/80">Asosiy fan</span>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-bg px-4 py-3 font-bold outline-none focus:border-brand"
                placeholder="Matematika"
              />
            </label>
          </>
        ) : null}

        <label className="block">
          <span className="text-sm font-black text-ink/80">{isSignUp ? "Email" : "Login yoki email"}</span>
          <div className="mt-2 flex items-center gap-3 rounded-md border border-line bg-bg px-4 py-3 focus-within:border-brand">
            {isSignUp ? <Mail size={18} className="text-muted" /> : <UserRound size={18} className="text-muted" />}
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type={isSignUp ? "email" : "text"}
              className="w-full border-0 bg-transparent font-bold outline-none"
              placeholder={isSignUp ? "name@example.com" : "test_ustoz"}
              required
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-black text-ink/80">Parol</span>
          <div className="mt-2 flex items-center gap-3 rounded-md border border-line bg-bg px-4 py-3 focus-within:border-brand">
            <Lock size={18} className="text-muted" />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              minLength={6}
              className="w-full border-0 bg-transparent font-bold outline-none"
              placeholder="Kamida 6 ta belgi"
              required
            />
          </div>
        </label>

        {!isSignUp ? (
          <button
            type="button"
            onClick={() => setRemember((value) => !value)}
            className="flex items-center gap-3 text-sm font-bold text-ink/80"
          >
            <span className={`grid h-5 w-5 place-items-center rounded border ${remember ? "border-brand bg-brand text-white" : "border-line bg-white"}`}>
              {remember ? <Check size={13} /> : null}
            </span>
            Meni eslab qol
          </button>
        ) : (
          <div className="flex items-start gap-3 text-sm font-bold leading-6 text-muted">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-brand text-white">
              <Check size={13} />
            </span>
            <span>
              <Link href="#" className="font-black text-brand-dark">Foydalanish shartlari</Link> va{" "}
              <Link href="#" className="font-black text-brand-dark">Maxfiylik siyosati</Link>ga roziman
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand px-5 font-black text-white shadow-[0_3px_0_#B45309] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : null}
          {isSignUp ? "Hisob yaratish" : "Kirish"}
          {!loading ? <ArrowRight size={18} /> : null}
        </button>
      </form>

      {message ? <p className="mt-4 rounded-md bg-bg p-3 text-sm font-bold text-muted">{message}</p> : null}
    </div>
  );
}
