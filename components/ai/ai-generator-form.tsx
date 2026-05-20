"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, FileText, Loader2, Sparkles, Wand2 } from "lucide-react";
import { generateQuizDraft } from "@/lib/ai-generator";
import { saveStoredQuiz } from "@/lib/quizzes";

const presets = ["Matematika", "Ona tili", "Ingliz tili", "Fizika"];

export function AiGeneratorForm() {
  const router = useRouter();
  const [sourceText, setSourceText] = useState("");
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState("O'rta");
  const [language, setLanguage] = useState("O'zbek lotin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const preview = useMemo(() => {
    if (!sourceText.trim()) return null;
    return generateQuizDraft({ sourceText, count: Math.min(count, 3), difficulty, language });
  }, [count, difficulty, language, sourceText]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceText, count, difficulty, language })
      });
      const data = (await response.json()) as {
        quiz?: ReturnType<typeof generateQuizDraft>;
        error?: string;
        provider?: "gemini" | "demo";
      };

      if (!response.ok || !data.quiz) {
        throw new Error(data.error || "AI generator javob qaytarmadi.");
      }

      const quiz = saveStoredQuiz(data.quiz);
      router.push(`/u/mashqlar/${quiz.id}/tahrir`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "AI generator ishlamadi.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
      <form onSubmit={onSubmit} className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-dark">
            <Wand2 size={23} />
          </div>
          <div>
            <h2 className="text-xl font-black">Manba matn</h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted">
              Dars matni, konspekt yoki mavzu rejasini kiriting. Gemini AI savollarni JSON formatda tayyorlaydi.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setSourceText(`${preset} mavzusi bo'yicha asosiy tushunchalar, qoidalar va amaliy misollar.`)}
              className="rounded-md border border-line bg-bg px-3 py-2 text-sm font-black text-ink/75 hover:border-brand hover:bg-brand-tint"
            >
              {preset}
            </button>
          ))}
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-black">Mavzu yoki dars matni</span>
          <textarea
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
            className="mt-3 min-h-72 w-full resize-y rounded-md border border-line bg-bg p-4 text-sm font-semibold leading-7 outline-none focus:border-brand"
            placeholder="Masalan: Kasrlarni qo'shish mavzusi bo'yicha qisqa matn..."
            required
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-muted">Savol</span>
            <select
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="rounded-md border border-line bg-white px-3 py-3 font-bold"
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value}>{value} savol</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-muted">Daraja</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="rounded-md border border-line bg-white px-3 py-3 font-bold"
            >
              <option>O'rta</option>
              <option>Oson</option>
              <option>Qiyin</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-wide text-muted">Til</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-md border border-line bg-white px-3 py-3 font-bold"
            >
              <option>O'zbek lotin</option>
              <option>O'zbek kirill</option>
              <option>Rus</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand px-5 font-black text-white shadow-[0_3px_0_#B45309] disabled:opacity-70"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {loading ? "AI savollar tayyorlayapti..." : "Quiz draft yaratish"}
        </button>
        {message ? <p className="mt-4 rounded-md bg-bad/10 p-3 text-sm font-bold text-bad">{message}</p> : null}
      </form>

      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-brand-dark">Preview</p>
            <h2 className="mt-1 text-2xl font-black">Yaratiladigan savollar</h2>
          </div>
          <div className="rounded-md bg-brand-tint px-3 py-2 text-sm font-black text-brand-dark">
            {preview ? `${preview.questions.length} ta namunaviy savol` : "Avtomatik"}
          </div>
        </div>

        {preview ? (
          <div className="mt-5 space-y-4">
            {preview.questions.map((question, questionIndex) => (
              <article key={question.id} className="rounded-lg border border-line bg-bg p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand text-sm font-black text-white">
                    {questionIndex + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-black leading-6">{question.text}</p>
                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      {question.options.map((answer, index) => (
                        <div
                          key={`${question.id}-${index}`}
                          className={`rounded-md border px-4 py-3 text-sm font-bold ${
                            index === question.correctIndex ? "border-ok bg-ok/10 text-ok" : "border-line bg-white"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {answer}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-6 text-muted">{question.explanation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid min-h-[420px] place-items-center rounded-lg border border-dashed border-line bg-bg p-8 text-center">
            <div>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-md bg-white text-brand-dark shadow-sm">
                <FileText size={26} />
              </div>
              <p className="mt-4 font-black">Matn kiriting</p>
              <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-muted">
                Preview avtomatik shu yerda paydo bo'ladi. Keyin draftni quiz editorda tahrirlaysiz.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-start gap-3 rounded-lg bg-brand-tint p-4">
          <BookOpen size={20} className="mt-0.5 shrink-0 text-brand-dark" />
          <p className="text-sm font-semibold leading-6 text-muted">
            Real AI endi server route orqali ishlaydi. API key browserga chiqmaydi, Vercel environment variable ichida saqlanadi.
          </p>
        </div>
      </section>
    </div>
  );
}
