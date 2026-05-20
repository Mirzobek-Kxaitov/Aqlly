import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Grid2X2,
  Play,
  Sparkles,
  UsersRound
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { classes, quizzes } from "@/lib/mock-data";

const activityRows = [
  { title: "Kasr sonlar bilan amallar", type: "Quiz", topic: "Matematika · 6-sinf · 1-chorak", last: "2 soat oldin", plays: 18, avg: 84 },
  { title: "Geometrik shakllar", type: "Juftlash", topic: "Matematika · 6-sinf · 5-mavzu", last: "Kecha", plays: 24, avg: 71 },
  { title: "Algebraik ifoda terminlari", type: "Kartochka", topic: "Matematika · 7-sinf · 2-mavzu", last: "3 kun oldin", plays: 31, avg: 62 },
  { title: quizzes[0].title, type: "Quiz", topic: quizzes[0].topic, last: "5 kun oldin", plays: 42, avg: 78 },
  { title: "Hisoblash trening", type: "Quiz", topic: "Matematika · 7-sinf · takrorlash", last: "1 hafta oldin", plays: 28, avg: 55 }
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-dark">Salom, Akmal</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal">Bugungi xulosa</h1>
          <p className="mt-2 text-muted">Sinflaringizdagi natijalar yaxshi ko'rinmoqda.</p>
        </div>
        <Link href="/u/mashqlar/yangi" className="inline-flex items-center gap-2 rounded-[10px] bg-brand px-5 py-3 text-sm font-extrabold text-white shadow-[0_3px_0_#B45309]">
          <Play size={17} />
          Yangi quiz
        </Link>
      </div>

      <section className="relative mt-6 overflow-hidden rounded-[14px] bg-gradient-to-br from-brand to-orange-400 px-7 py-6 text-white">
        <div className="absolute right-72 top-[-20px] h-20 w-20 rotate-12 rounded-2xl bg-white/15" />
        <div className="absolute bottom-[-20px] right-52 h-14 w-14 rounded-full bg-white/20" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-white/90">AI yordamchi</p>
            <h2 className="mt-2 text-2xl font-black tracking-normal">Dars matnidan 1 daqiqada savollar tuzing</h2>
            <p className="mt-1 text-sm font-semibold text-white/90">Mavzu kiriting, Aqlly quiz draftini tayyorlab beradi.</p>
          </div>
          <Link href="/u/ai-generator" className="inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-3 text-sm font-extrabold text-brand-dark shadow-[0_3px_0_rgba(0,0,0,0.12)]">
            <Sparkles size={17} />
            Hozir sinab ko'ring
          </Link>
        </div>
      </section>

      <DashboardStats />

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[17px] font-extrabold tracking-normal">So'nggi mashqlar</h2>
            <Link href="/u/mashqlar" className="text-sm font-extrabold text-brand-dark">
              Barchasi <ArrowRight className="inline" size={14} />
            </Link>
          </div>
          <div className="hidden grid-cols-[1fr_92px_110px_76px_70px] gap-3 px-4 pb-2 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-muted lg:grid">
            <span>Sarlavha</span>
            <span>Turi</span>
            <span>So'nggi</span>
            <span>Seans</span>
            <span>O'rta</span>
          </div>
          <div className="space-y-2">
            {activityRows.map((item) => (
              <Link
                key={`${item.title}-${item.last}`}
                href="/u/mashqlar"
                className="grid gap-3 rounded-lg border border-line-soft bg-white px-4 py-3.5 transition hover:border-line hover:shadow-sm lg:grid-cols-[1fr_92px_110px_76px_70px] lg:items-center"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14.5px] font-extrabold">{item.title}</p>
                  <p className="mt-0.5 truncate text-xs font-semibold text-muted">{item.topic}</p>
                </div>
                <TypePill type={item.type} />
                <span className="text-xs font-semibold text-muted">{item.last}</span>
                <span className="text-sm font-bold text-ink2">{item.plays} ta</span>
                <ScorePill value={item.avg} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[17px] font-extrabold tracking-normal">Sinflarim</h2>
            <Link href="/u/sinflar" className="text-sm font-extrabold text-brand-dark">
              Boshqarish <ArrowRight className="inline" size={14} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {classes.slice(0, 4).map((item) => (
              <Link key={item.id} href={`/u/sinflar/${item.id}`} className="rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[17px] font-black tracking-normal">{item.name}</p>
                    <p className="mt-0.5 text-sm font-semibold text-muted">{item.subject} · {item.students} o'quvchi</p>
                  </div>
                  <ScorePill value={item.average} compact />
                </div>
                <AvatarStack />
                <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 text-xs font-semibold text-muted">
                  <span className="truncate pr-2">So'nggi mavzu</span>
                  <span>Bugun</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <QuickCard icon={<UsersRound size={20} />} title="Sinf yaratish" body="Yangi guruh ochib, o'quvchilarni qo'shing." href="/boshlash" />
        <QuickCard icon={<Grid2X2 size={20} />} title="Quiz editor" body="Savol, variant va vaqt limitini sozlang." href="/u/mashqlar/yangi" />
        <QuickCard icon={<BarChart3 size={20} />} title="Natijalar" body="Live sessionlardan avtomatik hisobot oling." href="/u/natijalar" />
      </section>
    </AppShell>
  );
}

function TypePill({ type }: { type: string }) {
  const styles: Record<string, string> = {
    Quiz: "bg-brand-soft text-brand-dark",
    Juftlash: "bg-quiz-blue/15 text-blue-700",
    Kartochka: "bg-quiz-purple/15 text-purple-700"
  };
  return <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-extrabold ${styles[type] ?? styles.Quiz}`}>{type}</span>;
}

function ScorePill({ value, compact = false }: { value: number; compact?: boolean }) {
  const tone = value >= 80 ? "bg-ok-soft text-emerald-700" : value >= 60 ? "bg-brand-soft text-brand-dark" : "bg-bad-soft text-red-700";
  return <span className={`w-fit rounded-md font-extrabold ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1 text-sm"} ${tone}`}>{value}%</span>;
}

function AvatarStack() {
  const avatars = ["AR", "MK", "SA", "BN", "ZF"];
  const colors = ["bg-brand", "bg-quiz-blue", "bg-quiz-purple", "bg-ok", "bg-pink-500"];
  return (
    <div className="mt-4 flex">
      {avatars.map((avatar, index) => (
        <span
          key={avatar}
          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-black text-white ${colors[index]} ${index ? "-ml-2" : ""}`}
        >
          {avatar}
        </span>
      ))}
      <span className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-line-soft text-[10px] font-black text-muted">+5</span>
    </div>
  );
}

function QuickCard({ icon, title, body, href }: { icon: React.ReactNode; title: string; body: string; href: string }) {
  return (
    <Link href={href} className="rounded-xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand-dark">{icon}</div>
      <p className="mt-4 font-black">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
    </Link>
  );
}
