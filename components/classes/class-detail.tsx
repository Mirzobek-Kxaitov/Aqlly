"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Grid2X2, Loader2, MoreHorizontal, Plus, Search, Upload, UserRoundPlus } from "lucide-react";
import { getStoredClass, TeacherClass } from "@/lib/classes";
import { getStoredStudents, saveStoredStudent, Student } from "@/lib/students";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type ClassDetailProps = {
  classId: string;
};

export function ClassDetail({ classId }: ClassDetailProps) {
  const [classItem, setClassItem] = useState<TeacherClass | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!isSupabaseConfigured || !supabase) {
        if (!active) return;
        setClassItem(getStoredClass(classId));
        setStudents(getStoredStudents(classId));
        setLoading(false);
        return;
      }

      const { data: classData } = await supabase
        .from("classes")
        .select("id,name,subject,created_at")
        .eq("id", classId)
        .maybeSingle();

      const { data: studentRows } = await supabase
        .from("class_students")
        .select("students(id,first_name,last_name,created_at)")
        .eq("class_id", classId);

      if (!active) return;

      setClassItem(
        classData
          ? {
              id: classData.id,
              name: classData.name,
              subject: classData.subject || "Umumiy",
              students: studentRows?.length ?? 0,
              average: 0,
              createdAt: classData.created_at
            }
          : getStoredClass(classId)
      );
      setStudents(
        (studentRows ?? []).flatMap((row) => {
          const student = row.students as unknown as { id: string; first_name: string; last_name: string | null; created_at: string } | null;
          if (!student) return [];
          return {
            id: student.id,
            classId,
            firstName: student.first_name,
            lastName: student.last_name || "",
            createdAt: student.created_at
          };
        })
      );
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [classId]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    if (!isSupabaseConfigured || !supabase) {
      const item = saveStoredStudent({ classId, firstName, lastName, pin });
      setStudents((current) => [item, ...current]);
      resetForm();
      return;
    }

    const { data: student, error: studentError } = await supabase
      .from("students")
      .insert({
        first_name: firstName,
        last_name: lastName || null,
        pin_hash: pin || null
      })
      .select("id,first_name,last_name,created_at")
      .single();

    if (studentError || !student) {
      setMessage(studentError?.message || "O'quvchini saqlab bo'lmadi.");
      setSaving(false);
      return;
    }

    const { error: linkError } = await supabase.from("class_students").insert({
      class_id: classId,
      student_id: student.id
    });

    if (linkError) {
      setMessage(linkError.message);
      setSaving(false);
      return;
    }

    setStudents((current) => [
      {
        id: student.id,
        classId,
        firstName: student.first_name,
        lastName: student.last_name || "",
        createdAt: student.created_at
      },
      ...current
    ]);
    resetForm();
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setPin("");
    setSaving(false);
    setShowForm(false);
  }

  if (loading) {
    return <div className="rounded-xl border border-line bg-white p-6 font-bold text-muted">Sinf yuklanmoqda...</div>;
  }

  if (!classItem) {
    return (
      <div className="rounded-xl border border-line bg-white p-6">
        <h1 className="text-2xl font-black">Sinf topilmadi</h1>
        <Link href="/u/sinflar" className="mt-4 inline-flex items-center gap-2 font-black text-brand-dark">
          <ArrowLeft size={18} /> Sinflarga qaytish
        </Link>
      </div>
    );
  }

  const online = Math.min(6, Math.max(0, students.length));
  const tabs = [
    { label: "O'quvchilar", count: students.length, active: true },
    { label: "Mashqlar", count: 14 },
    { label: "Natijalar" },
    { label: "QR kodlar" },
    { label: "Sozlamalar" }
  ];

  return (
    <div>
      <header className="-mx-5 -mt-6 border-b border-line bg-white px-5 py-5 sm:-mx-8 sm:px-8">
        <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-muted">
          <Link href="/u/sinflar">Sinflarim</Link>
          <ChevronRight size={13} />
          <span className="font-bold text-ink2">{classItem.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[14px] bg-brand text-xl font-black text-white">
            {classItem.name.split(" ")[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black tracking-normal">{classItem.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted">
              <span>{classItem.subject}</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>{students.length} ta o'quvchi · <b className="text-ok">{online} onlayn</b></span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>O'rtacha: <b className="text-ink">{classItem.average}%</b></span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-white px-4 py-2.5 text-sm font-extrabold text-ink2">
            <Upload size={16} />
            CSV yuklash
          </button>
          <button
            onClick={() => setShowForm((value) => !value)}
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_2px_0_#B45309]"
          >
            <Plus size={16} />
            O'quvchi qo'shish
          </button>
        </div>
      </header>

      <div className="-mx-5 border-b border-line bg-white px-5 sm:-mx-8 sm:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`mb-[-1px] inline-flex items-center gap-2 border-b-3 px-4 py-3.5 text-sm font-extrabold ${
                tab.active ? "border-brand text-brand-dark" : "border-transparent text-muted"
              }`}
            >
              {tab.label}
              {tab.count !== undefined ? (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${tab.active ? "bg-brand-tint text-brand-dark" : "bg-line-soft text-muted"}`}>
                  {tab.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {showForm ? (
        <form onSubmit={onSubmit} className="mt-5 rounded-xl border border-line bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand-dark">
              <UserRoundPlus size={20} />
            </div>
            <h2 className="text-xl font-black">O'quvchi qo'shish</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} className="rounded-[10px] border border-line px-4 py-3 outline-none focus:border-brand" placeholder="Ism" required />
            <input value={lastName} onChange={(event) => setLastName(event.target.value)} className="rounded-[10px] border border-line px-4 py-3 outline-none focus:border-brand" placeholder="Familiya" required />
            <input value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 4))} className="rounded-[10px] border border-line px-4 py-3 outline-none focus:border-brand" placeholder="PIN (ixtiyoriy)" inputMode="numeric" />
            <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-5 py-3 font-black text-white disabled:opacity-70">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
              Qo'shish
            </button>
          </div>
          {message ? <p className="mt-4 rounded-md bg-bad-soft p-3 text-sm font-bold text-red-700">{message}</p> : null}
        </form>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex max-w-sm flex-1 items-center gap-2 rounded-[10px] border border-line bg-white px-3.5 py-2.5">
          <Search size={16} className="text-muted" />
          <input className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-faint" placeholder="O'quvchini izlash..." />
        </div>
        <select className="rounded-[10px] border border-line bg-white px-3.5 py-2.5 text-sm font-bold text-ink2">
          <option>Saralash: ism (A-Z)</option>
          <option>O'rtacha ball (yuqori)</option>
          <option>Faollik (faol)</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-brand bg-brand-tint px-3 py-2 text-sm font-extrabold text-brand-dark">
            <Grid2X2 size={15} />
            Karta
          </button>
          <button className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-extrabold text-muted">Jadval</button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {students.map((student, index) => (
          <StudentCard key={student.id} student={student} index={index} />
        ))}
        {!students.length ? (
          <div className="col-span-full rounded-xl border border-dashed border-line bg-white p-10 text-center">
            <p className="font-black">Hali o'quvchi qo'shilmagan</p>
            <p className="mt-2 text-sm text-muted">Yuqoridagi “O'quvchi qo'shish” tugmasi orqali ro'yxatni boshlang.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StudentCard({ student, index }: { student: Student; index: number }) {
  const name = `${student.firstName} ${student.lastName}`.trim();
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const avg = [84, 76, 81, 62, 73, 58, 88, 92][index % 8];
  const online = index % 3 !== 1;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-3.5 transition hover:shadow-sm">
      <div className="relative">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-white ${studentColors[index % studentColors.length]}`}>
          {initials || "O"}
        </div>
        {online ? <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-ok" /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold">{name}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${avg >= 80 ? "bg-ok-soft text-emerald-700" : avg >= 60 ? "bg-brand-soft text-brand-dark" : "bg-bad-soft text-red-700"}`}>
            {avg}%
          </span>
          <span className="text-xs font-semibold text-muted">{9 + (index % 6)} seans</span>
        </div>
      </div>
      <button className="flex h-7 w-7 items-center justify-center rounded bg-transparent text-faint">
        <MoreHorizontal size={15} />
      </button>
    </div>
  );
}

const studentColors = ["bg-brand", "bg-ok", "bg-pink-500", "bg-lime-500", "bg-cyan-500", "bg-bad", "bg-quiz-purple", "bg-quiz-blue"];
