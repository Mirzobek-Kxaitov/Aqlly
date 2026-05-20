import { classes as mockClasses } from "@/lib/mock-data";
import { getStoredStudents } from "@/lib/students";

export type TeacherClass = {
  id: string;
  name: string;
  subject: string;
  students: number;
  average: number;
  createdAt?: string;
};

const STORAGE_KEY = "aqlly.dev.classes";

export function getStoredClasses(): TeacherClass[] {
  if (typeof window === "undefined") return mockClasses;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw ? (JSON.parse(raw) as TeacherClass[]) : [];
    return [...stored, ...mockClasses].map((item) => ({
      ...item,
      students: getStoredStudents(item.id).length || item.students
    }));
  } catch {
    return mockClasses;
  }
}

export function getStoredClass(id: string) {
  return getStoredClasses().find((item) => item.id === id) ?? null;
}

export function saveStoredClass(input: Pick<TeacherClass, "name" | "subject">) {
  const item: TeacherClass = {
    id: `dev-${Date.now()}`,
    name: input.name,
    subject: input.subject || "Umumiy",
    students: 0,
    average: 0,
    createdAt: new Date().toISOString()
  };

  if (typeof window === "undefined") return item;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const current = raw ? (JSON.parse(raw) as TeacherClass[]) : [];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...current]));
  return item;
}

export function getStoredClassCount() {
  if (typeof window === "undefined") return mockClasses.length;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw ? (JSON.parse(raw) as TeacherClass[]) : [];
    return stored.length + mockClasses.length;
  } catch {
    return mockClasses.length;
  }
}
