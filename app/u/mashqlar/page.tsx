import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { QuizzesList } from "@/components/quizzes/quizzes-list";

export default function ActivitiesPage() {
  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-dark">Mashqlarim</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal">Quiz kutubxonasi</h1>
          <p className="mt-2 text-muted">Quizlarni yarating, tahrirlang va jonli seans boshlang.</p>
        </div>
        <Link href="/u/mashqlar/yangi" className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-black text-white">
          <Plus size={17} /> Quiz yaratish
        </Link>
      </div>
      <QuizzesList />
    </AppShell>
  );
}
