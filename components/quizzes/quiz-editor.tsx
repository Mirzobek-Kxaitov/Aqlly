"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock,
  Image,
  Loader2,
  Play,
  Plus,
  Save,
  Sparkles,
  Trash2
} from "lucide-react";
import { createDraftQuiz, createEmptyQuestion, getStoredQuiz, Quiz, saveStoredQuiz } from "@/lib/quizzes";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type QuizEditorProps = {
  quizId?: string;
};

const answerColors = ["bg-quiz-red", "bg-quiz-green", "bg-quiz-blue", "bg-quiz-purple"];
const answerBorders = ["border-quiz-red", "border-quiz-green", "border-quiz-blue", "border-quiz-purple"];
const answerSoft = ["bg-quiz-red/10", "bg-quiz-green/10", "bg-quiz-blue/10", "bg-quiz-purple/10"];

export function QuizEditor({ quizId }: QuizEditorProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz>(() => createDraftQuiz());
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(Boolean(quizId));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadQuiz() {
      if (!quizId) return;

      if (!isSupabaseConfigured || !supabase) {
        const stored = getStoredQuiz(quizId);
        if (active && stored) setQuiz(stored);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("activities")
        .select("id,title,topic,content_json,created_at,updated_at")
        .eq("id", quizId)
        .maybeSingle();

      if (!active) return;

      if (data) {
        const content = data.content_json as { questions?: Quiz["questions"]; status?: Quiz["status"] };
        setQuiz({
          id: data.id,
          title: data.title,
          topic: data.topic || "",
          status: content.status || "Draft",
          questions: content.questions?.length ? content.questions : [createEmptyQuestion()],
          createdAt: data.created_at,
          updatedAt: data.updated_at
        });
      } else {
        const stored = getStoredQuiz(quizId);
        if (stored) setQuiz(stored);
      }
      setLoading(false);
    }

    loadQuiz();
    return () => {
      active = false;
    };
  }, [quizId]);

  const activeQuestion = quiz.questions[activeIndex] ?? quiz.questions[0];
  const isReady = useMemo(
    () => quiz.questions.every((question) => question.text.trim() && question.options.every((option) => option.trim())),
    [quiz.questions]
  );

  function updateQuestion(questionId: string, updater: (question: Quiz["questions"][number]) => Quiz["questions"][number]) {
    setQuiz((current) => ({
      ...current,
      questions: current.questions.map((question) => (question.id === questionId ? updater(question) : question))
    }));
  }

  function addQuestion() {
    setQuiz((current) => {
      const next = [...current.questions, createEmptyQuestion()];
      setActiveIndex(next.length - 1);
      return { ...current, questions: next };
    });
  }

  function removeQuestion(questionId: string) {
    setQuiz((current) => {
      if (current.questions.length === 1) return current;
      const next = current.questions.filter((question) => question.id !== questionId);
      setActiveIndex((index) => Math.max(0, Math.min(index, next.length - 1)));
      return { ...current, questions: next };
    });
  }

  async function saveQuiz(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setSaving(true);
    setMessage("");

    const normalized: Quiz = {
      ...quiz,
      status: isReady ? "Tayyor" : "Draft",
      title: quiz.title.trim() || "Nomsiz quiz",
      topic: quiz.topic.trim(),
      questions: quiz.questions.map((question) => ({
        ...question,
        text: question.text.trim(),
        options: question.options.map((option) => option.trim()),
        explanation: question.explanation?.trim()
      }))
    };

    if (!isSupabaseConfigured || !supabase) {
      saveStoredQuiz(normalized);
      setSaving(false);
      router.push("/u/mashqlar");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setSaving(false);
      setMessage("Avval tizimga kiring. Supabase sessiyasi topilmadi.");
      return;
    }

    const payload = {
      owner_id: userData.user.id,
      type: "quiz",
      title: normalized.title,
      topic: normalized.topic || null,
      content_json: {
        status: normalized.status,
        questions: normalized.questions
      }
    };

    const request = quizId
      ? supabase.from("activities").update(payload).eq("id", normalized.id).select("id").single()
      : supabase.from("activities").insert(payload).select("id").single();

    const { data, error } = await request;
    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push(data?.id ? `/u/mashqlar/${data.id}/tahrir` : "/u/mashqlar");
  }

  if (loading || !activeQuestion) {
    return <div className="rounded-xl border border-line bg-white p-6 font-bold text-muted">Quiz yuklanmoqda...</div>;
  }

  return (
    <form onSubmit={saveQuiz} className="-mx-5 -mb-6 -mt-6 flex min-h-[calc(100vh-68px)] flex-col bg-bg sm:-mx-8">
      <header className="flex min-h-[68px] items-center gap-4 border-b border-line bg-white px-5 sm:px-6">
        <Link href="/u/mashqlar" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-ink2">
          <ArrowLeft size={18} />
        </Link>
        <div className="min-w-0 flex-1">
          <input
            value={quiz.title}
            onChange={(event) => setQuiz((current) => ({ ...current, title: event.target.value }))}
            className="w-full bg-transparent text-xl font-black tracking-normal outline-none"
            placeholder="Quiz nomi"
            required
          />
          <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
            <input
              value={quiz.topic}
              onChange={(event) => setQuiz((current) => ({ ...current, topic: event.target.value }))}
              className="min-w-64 bg-transparent outline-none placeholder:text-faint"
              placeholder="Mavzu: Matematika · 6-sinf · 1-chorak"
            />
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span className="inline-flex items-center gap-1 text-ok">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              {isReady ? "Tayyor" : "Qoralama"}
            </span>
          </div>
        </div>
        <Link href="/u/mashqlar" className="hidden rounded-lg border border-line px-4 py-2.5 text-sm font-extrabold text-ink2 md:inline-flex">
          Ko'rib chiqish
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_2px_0_#B45309] disabled:opacity-70"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Saqlash
        </button>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[240px_1fr_360px]">
        <aside className="min-h-0 border-r border-line bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-[13px] font-black uppercase tracking-[0.06em]">Savollar · {quiz.questions.length}</p>
          </div>
          <div className="flex max-h-[360px] flex-col gap-1 overflow-auto px-2 pb-3 lg:max-h-none">
            {quiz.questions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left ${
                  index === activeIndex ? "border-brand bg-brand-tint" : "border-transparent hover:bg-line-soft"
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-black ${index === activeIndex ? "bg-brand text-white" : "bg-line-soft text-muted"}`}>
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 text-xs font-semibold leading-5 text-ink">{question.text || "Yangi savol - tahrir qiling"}</span>
                  <span className="mt-1 flex items-center gap-1.5">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-black ${question.text ? "bg-brand-soft text-brand-dark" : "bg-line-soft text-muted"}`}>
                      {question.text ? "Tayyor" : "Qoralama"}
                    </span>
                  </span>
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-line px-3 py-3 text-sm font-extrabold text-muted hover:border-brand hover:text-brand-dark"
            >
              <Plus size={15} />
              Savol qo'shish
            </button>
          </div>
        </aside>

        <main className="min-w-0 overflow-auto px-5 py-6 sm:px-8">
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-sm font-black text-white">{activeIndex + 1}</span>
              <p className="text-[13px] font-black uppercase tracking-[0.06em] text-muted">Savol matni</p>
              <span className="ml-auto inline-flex items-center gap-1 rounded bg-quiz-purple/15 px-2 py-1 text-[11px] font-black text-purple-700">
                <Sparkles size={12} />
                Editor
              </span>
            </div>
            <textarea
              value={activeQuestion.text}
              onChange={(event) => updateQuestion(activeQuestion.id, (current) => ({ ...current, text: event.target.value }))}
              className="min-h-24 w-full resize-y rounded-[10px] border border-line bg-white px-4 py-4 text-lg font-bold leading-7 outline-none focus:border-brand"
              placeholder="Savolni yozing..."
              required
            />
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-[10px] border border-dashed border-line bg-line-soft px-4 py-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-dark">
              <Image size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">Rasm qo'shish (ixtiyoriy)</p>
              <p className="mt-0.5 text-sm font-semibold text-muted">PNG, JPG yoki GIF · 5MB gacha</p>
            </div>
            <button type="button" className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-extrabold text-ink2">
              Tanlash
            </button>
          </div>

          <section className="mb-6">
            <p className="mb-3 text-[13px] font-black uppercase tracking-[0.06em] text-muted">Javob variantlari · to'g'risini belgilang</p>
            <div className="space-y-3">
              {activeQuestion.options.map((option, optionIndex) => {
                const correct = activeQuestion.correctIndex === optionIndex;
                return (
                  <div
                    key={optionIndex}
                    className={`flex items-center gap-3 rounded-[10px] border p-3 ${correct ? `${answerSoft[optionIndex]} ${answerBorders[optionIndex]} border-2` : "border-line bg-white"}`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white ${answerColors[optionIndex]}`}>
                      {String.fromCharCode("A".charCodeAt(0) + optionIndex)}
                    </span>
                    <input
                      value={option}
                      onChange={(event) =>
                        updateQuestion(activeQuestion.id, (current) => ({
                          ...current,
                          options: current.options.map((item, index) => (index === optionIndex ? event.target.value : item))
                        }))
                      }
                      className="min-w-0 flex-1 bg-transparent text-[14.5px] font-semibold outline-none placeholder:text-faint"
                      placeholder={`${String.fromCharCode("A".charCodeAt(0) + optionIndex)} javob`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => updateQuestion(activeQuestion.id, (current) => ({ ...current, correctIndex: optionIndex }))}
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${correct ? `${answerColors[optionIndex]} text-white` : "border-2 border-line bg-white text-transparent"}`}
                      aria-label="To'g'ri javob"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-2">
            <div>
              <p className="mb-3 text-[13px] font-black uppercase tracking-[0.06em] text-muted">Vaqt chegarasi</p>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 20, 30].map((seconds) => (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => updateQuestion(activeQuestion.id, (current) => ({ ...current, timeLimit: seconds }))}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-extrabold ${
                      activeQuestion.timeLimit === seconds ? "bg-brand text-white" : "border border-line bg-white text-ink2"
                    }`}
                  >
                    {activeQuestion.timeLimit !== seconds ? <Clock size={14} /> : null}
                    {seconds} sek
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <p className="mb-3 text-[13px] font-black uppercase tracking-[0.06em] text-muted">Qisqa izoh</p>
              <input
                value={activeQuestion.explanation || ""}
                onChange={(event) => updateQuestion(activeQuestion.id, (current) => ({ ...current, explanation: event.target.value }))}
                className="w-full rounded-[10px] border border-line bg-white px-4 py-3 font-semibold outline-none focus:border-brand"
                placeholder="Nima uchun to'g'ri javob shu?"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-3 rounded-xl border border-line bg-white p-4">
            <button
              type="button"
              onClick={() => removeQuestion(activeQuestion.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-extrabold text-bad"
            >
              <Trash2 size={16} />
              Savolni o'chirish
            </button>
            {message ? <p className="rounded-md bg-bad-soft px-3 py-2 text-sm font-bold text-red-700">{message}</p> : null}
          </div>
        </main>

        <aside className="min-h-0 border-l border-line bg-white">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-quiz-purple to-quiz-blue text-white">
              <Sparkles size={17} />
            </div>
            <div>
              <p className="text-sm font-black">AI yordamchi</p>
              <p className="text-xs font-semibold text-muted">Mavzudan savol tuzib bering</p>
            </div>
          </div>
          <div className="flex gap-1 px-4 pt-3">
            {["Mavzu matni", "PDF", "Mavzudan"].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`flex-1 rounded-lg px-2 py-2 text-xs font-extrabold ${index === 0 ? "bg-brand-tint text-brand-dark" : "text-muted"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="border-b border-line-soft p-5">
            <textarea
              className="min-h-28 w-full resize-none rounded-lg border border-line bg-bg p-3 text-xs font-semibold leading-5 outline-none focus:border-brand"
              defaultValue="6-sinf 'Kasr sonlar bilan qo'shish va ayirish' mavzusi: kasrlarni qo'shish uchun maxraj bir xil bo'lishi kerak..."
            />
            <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-faint">
              <span>284 / 5000 belgi</span>
              <button type="button" className="text-muted">Tozalash</button>
            </div>
          </div>
          <div className="space-y-3 border-b border-line-soft p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-ink2">Savollar soni</span>
              <div className="flex gap-1">
                {[5, 10, 15, 20].map((item) => (
                  <button key={item} type="button" className={`rounded-md px-2.5 py-1.5 text-xs font-black ${item === 10 ? "bg-brand text-white" : "border border-line text-muted"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-quiz-purple to-quiz-blue px-4 py-3 text-sm font-black text-white shadow-[0_3px_0_rgba(0,0,0,0.12)]">
              <Sparkles size={15} />
              Savollar generatsiya qil
            </button>
          </div>
          <div className="space-y-2 p-4">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.06em] text-muted">Takliflar · 3</p>
            {[
              "2/5 + 1/5 ni hisoblang va natijani qisqartiring.",
              "Quyidagi kasrlardan qaysi biri 1/2 ga teng?",
              "Aralash sonlar yig'indisi nechaga teng?"
            ].map((text, index) => (
              <div key={text} className="rounded-lg border border-line bg-white p-3">
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-quiz-purple/15 text-xs font-black text-purple-700">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold leading-5">{text}</p>
                    <div className="mt-2 flex gap-1.5">
                      <button type="button" className="inline-flex items-center gap-1 rounded bg-brand px-2.5 py-1 text-xs font-black text-white">
                        <Plus size={12} />
                        Qo'sh
                      </button>
                      <button type="button" className="rounded border border-line px-2.5 py-1 text-xs font-bold text-muted">Tahrirla</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </form>
  );
}
