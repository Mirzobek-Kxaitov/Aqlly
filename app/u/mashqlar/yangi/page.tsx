import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { QuizEditor } from "@/components/quizzes/quiz-editor";

export default function NewQuizPage() {
  return (
    <AppShell>
      <Link href="/u/mashqlar" className="inline-flex items-center gap-2 text-sm font-black text-brand-dark">
        <ArrowLeft size={17} /> Mashqlar
      </Link>
      <div className="mt-5">
        <p className="text-sm font-extrabold uppercase tracking-wide text-brand-dark">Quiz editor</p>
        <h1 className="mt-2 text-3xl font-black">Yangi quiz</h1>
      </div>
      <div className="mt-8">
        <QuizEditor />
      </div>
    </AppShell>
  );
}
