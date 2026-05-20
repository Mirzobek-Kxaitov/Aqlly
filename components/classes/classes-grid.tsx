"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Play, Plus } from "lucide-react";
import { getStoredClasses, TeacherClass } from "@/lib/classes";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export function ClassesGrid() {
  const [items, setItems] = useState<TeacherClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadClasses() {
      if (!isSupabaseConfigured || !supabase) {
        setItems(getStoredClasses());
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setItems(getStoredClasses());
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("classes")
        .select("id,name,subject,created_at")
        .eq("teacher_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error || !data) {
        setItems(getStoredClasses());
      } else {
        setItems(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            subject: item.subject || "Umumiy",
            students: 0,
            average: 0,
            createdAt: item.created_at
          }))
        );
      }
      setLoading(false);
    }

    loadClasses();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="mt-8 rounded-lg border border-line bg-white p-6 font-bold text-muted">Sinflar yuklanmoqda...</div>;
  }

  if (!items.length) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-line bg-white p-8 text-center">
        <h2 className="text-xl font-black">Hali sinf yo'q</h2>
        <p className="mt-2 text-muted">Birinchi sinfni onboarding orqali yarating.</p>
        <Link href="/boshlash" className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 font-black text-white">
          <Plus size={18} /> Sinf qo'shish
        </Link>
      </div>
    );
  }

  const tabs = [
    { label: "Hamma", count: items.length, active: true },
    { label: "6-sinf", count: items.filter((item) => item.name.includes("6")).length },
    { label: "7-sinf", count: items.filter((item) => item.name.includes("7")).length },
    { label: "Arxiv", count: 0 }
  ];

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-extrabold ${
              tab.active ? "border-brand bg-brand-tint text-brand-dark" : "border-line bg-white text-ink2"
            }`}
          >
            {tab.label}
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${tab.active ? "bg-white text-brand-dark" : "bg-line-soft text-muted"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`/u/sinflar/${item.id}`}
            className="rounded-[14px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-start gap-3.5">
              <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl text-lg font-black text-white ${classColors[index % classColors.length]}`}>
                {item.name.split(" ")[0]}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-black tracking-normal">{item.name}</h2>
                <p className="mt-0.5 text-sm font-semibold text-muted">{item.subject}</p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-line-soft text-muted">
                <MoreHorizontal size={16} />
              </span>
            </div>

            <dl className="mt-4 flex gap-5 border-t border-line-soft pt-4">
              <div>
                <dt className="mb-1 text-[11px] font-black uppercase tracking-[0.04em] text-muted">O'quvchi</dt>
                <dd className="text-xl font-black leading-none">{item.students}</dd>
              </div>
              <div>
                <dt className="mb-1 text-[11px] font-black uppercase tracking-[0.04em] text-muted">Seans</dt>
                <dd className="text-xl font-black leading-none">{Math.max(1, Math.round(item.students / 2))}</dd>
              </div>
              <div className="ml-auto text-right">
                <dt className="mb-1 text-[11px] font-black uppercase tracking-[0.04em] text-muted">O'rtacha</dt>
                <dd className={`text-lg font-black leading-none ${scoreColor(item.average)}`}>{item.average}%</dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              Oxirgi faollik: {index === 0 ? "2 soat oldin" : index === 1 ? "Kecha" : "3 kun oldin"}
            </div>

            <div className="mt-4 flex gap-2">
              <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-extrabold text-white">
                <Play size={13} />
                Jonli quiz
              </span>
              <span className="inline-flex items-center justify-center rounded-lg border border-line px-3 py-2 text-sm font-extrabold text-ink2">
                O'quvchilar
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/boshlash"
          className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-[14px] border-2 border-dashed border-line bg-transparent p-5 text-center text-muted transition hover:border-brand hover:bg-brand-tint"
        >
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
            <Plus size={26} />
          </span>
          <span className="text-base font-black text-ink2">Yangi sinf qo'shish</span>
          <span className="max-w-48 text-sm">Sinf yarating va o'quvchilarni qo'shing</span>
        </Link>
      </div>
    </>
  );
}

const classColors = ["bg-brand", "bg-quiz-blue", "bg-quiz-purple", "bg-ok", "bg-pink-500"];

function scoreColor(value: number) {
  if (value >= 80) return "text-ok";
  if (value >= 60) return "text-brand-dark";
  return "text-bad";
}
