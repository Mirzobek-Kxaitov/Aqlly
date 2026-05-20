"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit3, Grid2X2, Plus } from "lucide-react";
import { StartLiveButton } from "@/components/live/start-live-button";
import { getStoredQuizzes, Quiz } from "@/lib/quizzes";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export function QuizzesList() {
  const [items, setItems] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!isSupabaseConfigured || !supabase) {
        setItems(getStoredQuizzes());
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setItems(getStoredQuizzes());
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("activities")
        .select("id,title,topic,content_json,created_at,updated_at")
        .eq("owner_id", userData.user.id)
        .eq("type", "quiz")
        .order("updated_at", { ascending: false });

      if (!active) return;

      if (error || !data) {
        setItems(getStoredQuizzes());
      } else {
        setItems(
          data.map((item) => {
            const content = item.content_json as { questions?: Quiz["questions"]; status?: Quiz["status"] };
            return {
              id: item.id,
              title: item.title,
              topic: item.topic || "",
              status: content.status || "Draft",
              questions: content.questions || [],
              createdAt: item.created_at,
              updatedAt: item.updated_at
            };
          })
        );
      }
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="mt-8 rounded-lg border border-line bg-white p-6 font-bold text-muted">Quizlar yuklanmoqda...</div>;
  }

  if (!items.length) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-line bg-white p-8 text-center">
        <h2 className="text-xl font-black">Hali quiz yo'q</h2>
        <p className="mt-2 text-muted">Birinchi quizni editor orqali yarating.</p>
        <Link href="/u/mashqlar/yangi" className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 font-black text-white">
          <Plus size={18} /> Quiz yaratish
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {["Hamma", "Quiz", "Qoralama", "Tayyor"].map((tab, index) => (
          <button
            key={tab}
            className={`rounded-lg border px-4 py-2 text-sm font-extrabold ${
              index === 0 ? "border-brand bg-brand-tint text-brand-dark" : "border-line bg-white text-ink2"
            }`}
          >
            {tab}
          </button>
        ))}
        <button className="ml-auto inline-flex items-center gap-2 rounded-lg border border-brand bg-brand-tint px-3 py-2 text-sm font-extrabold text-brand-dark">
          <Grid2X2 size={15} />
          Karta
        </button>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-[14px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-lg font-black tracking-normal">{item.title || "Nomsiz quiz"}</p>
                <p className="mt-1 truncate text-sm font-semibold text-muted">{item.topic || "Mavzu yo'q"}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${item.status === "Tayyor" ? "bg-ok-soft text-emerald-700" : "bg-line-soft text-muted"}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line-soft pt-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.04em] text-muted">Savollar</p>
                <p className="mt-1 text-2xl font-black">{item.questions.length}</p>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.04em] text-muted">Vaqt</p>
                <p className="mt-1 text-2xl font-black">{item.questions.reduce((sum, question) => sum + question.timeLimit, 0)}s</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              <StartLiveButton quiz={item} />
              <Link href={`/u/mashqlar/${item.id}/tahrir`} className="inline-flex w-fit items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-black">
                <Edit3 size={15} /> Tahrirlash
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
