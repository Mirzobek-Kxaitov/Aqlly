import Link from "next/link";
import { BarChart3, Bell, BookOpenCheck, Home, Library, Plus, Search, Settings, Sparkles, UsersRound } from "lucide-react";
import { Logo } from "@/components/logo";

const nav = [
  { href: "/u/dashboard", label: "Dashboard", icon: Home },
  { href: "/u/sinflar", label: "Sinflar", icon: UsersRound },
  { href: "/u/mashqlar", label: "Mashqlar", icon: Library },
  { href: "/u/ai-generator", label: "AI generator", icon: Sparkles },
  { href: "/u/natijalar", label: "Natijalar", icon: BarChart3 }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-line bg-white lg:block">
        <div className="px-5 pb-4 pt-5">
          <Logo />
        </div>
        <div className="px-4 pb-4">
          <Link
            href="/u/mashqlar/yangi"
            className="flex w-full items-center gap-2 rounded-[10px] bg-brand px-4 py-3 text-sm font-extrabold text-white shadow-[0_3px_0_#B45309]"
          >
            <Plus size={18} />
            Yangi mashq
          </Link>
        </div>
        <nav className="space-y-1 px-3 py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14.5px] font-bold text-ink2 hover:bg-brand-tint hover:text-brand-dark"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-24 left-4 right-4 rounded-xl border border-line bg-brand-tint p-4">
          <BookOpenCheck size={20} className="text-brand-dark" />
          <p className="mt-3 text-sm font-bold">MVP rejimi</p>
          <p className="mt-1 text-xs leading-5 text-muted">Auth, sinflar, quiz editor va live session oqimi navbat bilan ulanadi.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-line-soft p-4">
          <Link href="#" className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-muted hover:bg-line-soft">
            <Settings size={18} />
            Sozlamalar
          </Link>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-quiz-purple to-quiz-blue text-sm font-extrabold text-white">
              AY
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">Akmal Yo'ldoshev</p>
              <p className="text-xs text-muted">Matematika</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-[64px] items-center justify-between gap-4 border-b border-line bg-white px-5 lg:hidden">
          <Logo />
          <Link
            href="/u/mashqlar/yangi"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-brand px-3 text-sm font-black text-white shadow-[0_3px_0_#B45309]"
          >
            <Plus size={17} />
            Yangi
          </Link>
        </header>
        <header className="sticky top-0 z-20 hidden h-[68px] items-center gap-6 border-b border-line bg-white px-8 lg:flex">
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-muted">Aqlly ustoz paneli</p>
          </div>
          <div className="flex w-80 items-center gap-2 rounded-[10px] border border-line bg-bg px-3.5 py-2.5">
            <Search size={17} className="text-muted" />
            <input
              className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-faint"
              placeholder="Mashq, mavzu yoki sinf izlash..."
            />
            <span className="rounded border border-line bg-white px-1.5 py-0.5 text-[11px] font-bold text-faint">⌘K</span>
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-white text-ink2">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-bad" />
          </button>
        </header>
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 lg:pb-6">{children}</div>
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white px-2 py-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] lg:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-w-0 flex-col items-center gap-1 rounded-md px-1 py-1.5 text-[11px] font-black text-muted hover:bg-brand-tint hover:text-brand-dark"
          >
            <item.icon size={18} />
            <span className="max-w-full truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
