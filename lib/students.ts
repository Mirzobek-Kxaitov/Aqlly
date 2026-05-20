export type Student = {
  id: string;
  classId: string;
  firstName: string;
  lastName: string;
  pin?: string;
  createdAt?: string;
};

const STORAGE_KEY = "aqlly.dev.students";

function readStudents(): Student[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Student[]) : [];
  } catch {
    return [];
  }
}

function writeStudents(items: Student[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getStoredStudents(classId: string) {
  return readStudents().filter((item) => item.classId === classId);
}

export function saveStoredStudent(input: Pick<Student, "classId" | "firstName" | "lastName" | "pin">) {
  const item: Student = {
    id: `student-${Date.now()}`,
    classId: input.classId,
    firstName: input.firstName,
    lastName: input.lastName,
    pin: input.pin,
    createdAt: new Date().toISOString()
  };

  writeStudents([item, ...readStudents()]);
  return item;
}
