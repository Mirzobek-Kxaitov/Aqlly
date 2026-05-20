"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Play } from "lucide-react";
import { getStoredClasses, TeacherClass } from "@/lib/classes";
import { createCloudSession } from "@/lib/cloud-live-sessions";
import { createStoredSession } from "@/lib/live-sessions";
import { Quiz } from "@/lib/quizzes";

export function StartLiveButton({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = getStoredClasses();

  async function start() {
    setLoading(true);
    const selectedClass = classes.find((item) => item.id === classId);

    const cloudState = await createCloudSession(quiz, selectedClass);
    if (cloudState) {
      setLoading(false);
      router.push(`/u/jonli/${cloudState.session.code}/lobby`);
      return;
    }

    const session = createStoredSession(quiz, selectedClass);
    setLoading(false);
    router.push(`/u/jonli/${session.code}/lobby`);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-2 inline-flex items-center gap-2 text-sm font-black text-brand-dark">
        <Play size={15} /> Jonli boshlash
      </button>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <select
        value={classId}
        onChange={(event) => setClassId(event.target.value)}
        className="rounded-md border border-line bg-white px-3 py-2 text-sm font-bold outline-none focus:border-brand"
      >
        <option value="">Sinf tanlash</option>
        {classes.map((item: TeacherClass) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={start} disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-sm font-black text-white disabled:opacity-70">
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
        Boshlash
      </button>
    </div>
  );
}
