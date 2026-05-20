import { AppShell } from "@/components/app-shell";
import { ClassesGrid } from "@/components/classes/classes-grid";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ClassesPage() {
  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-dark">Sinflarim</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal">O'quvchilar guruhlari</h1>
          <p className="mt-2 text-muted">Faol sinflar, o'quvchilar va oxirgi natijalarni boshqaring.</p>
        </div>
        <Link href="/boshlash" className="inline-flex items-center gap-2 rounded-[10px] bg-brand px-5 py-3 text-sm font-extrabold text-white shadow-[0_2px_0_#B45309]">
          <Plus size={17} />
          Yangi sinf
        </Link>
      </div>
      <ClassesGrid />
    </AppShell>
  );
}
