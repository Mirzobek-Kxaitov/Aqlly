import Link from "next/link";
import { BarChart3, Bell, BookOpenCheck, Building2, Home, Library, LucideIcon, Search, Settings, UsersRound } from "lucide-react";
import { Logo } from "@/components/logo";

const nav = [
  { href: "/m/dashboard", label: "Bosh sahifa", icon: Home },
  { href: "#", label: "Sinflar", icon: UsersRound },
  { href: "#", label: "Ustozlar", icon: Library },
  { href: "/m/hisobotlar", label: "Hisobotlar", icon: BarChart3 },
  { href: "#", label: "Mashqlar", icon: BookOpenCheck },
  { href: "#", label: "Maktab sozlash", icon: Settings }
];

export function DirectorShell({
  active,
  title,
  subtitle,
  actions,
  children
}: {
  active: "home" | "reports";
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-line bg-white lg:block">
        <div className="px-5 pb-4 pt-5">
          <Logo />
        </div>
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-md bg-purple-100 p-3 text-purple-700">
          <div className="grid h-8 w-8 place-items-center rounded bg-purple-700 text-white">
            <Building2 size={17} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-wide">Direktor</p>
            <p className="truncate text-sm font-black text-ink">47-maktab</p>
          </div>
        </div>
        <nav className="space-y-1 px-3 py-2">
          {nav.map((item) => {
            const isActive = active === "home" ? item.href === "/m/dashboard" : item.href === "/m/hisobotlar";
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[14.5px] font-bold ${
                  isActive ? "bg-purple-100 text-purple-700" : "text-ink2 hover:bg-purple-50"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-line-soft p-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-700 to-quiz-blue text-sm font-extrabold text-white">
              SX
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">Saidakbar X.</p>
              <p className="text-xs text-muted">Direktor</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:pl-60">
        <header className="sticky top-0 z-20 flex min-h-[72px] items-center gap-5 border-b border-line bg-white px-5 py-4 sm:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-black">{title}</h1>
            <p className="truncate text-sm font-bold text-muted">{subtitle}</p>
          </div>
          <div className="hidden w-72 items-center gap-2 rounded-md border border-line bg-bg px-3.5 py-2.5 lg:flex">
            <Search size={17} className="text-muted" />
            <input className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-faint" placeholder="Izlash..." />
          </div>
          {actions}
          <button className="relative grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-ink2">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-bad" />
          </button>
        </header>
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 lg:pb-6">{children}</div>
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-white px-2 py-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] lg:hidden">
        {nav.slice(0, 4).map((item) => {
          const isActive = active === "home" ? item.href === "/m/dashboard" : item.href === "/m/hisobotlar";
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-md px-1 py-1.5 text-[11px] font-black ${
                isActive ? "bg-purple-100 text-purple-700" : "text-muted"
              }`}
            >
              <item.icon size={18} />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  tone,
  icon: Icon
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
  tone: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className={`grid h-9 w-9 place-items-center rounded-md ${tone}`}>
        <Icon size={17} />
      </div>
      <p className="mt-4 text-sm font-bold text-muted">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-muted">{sub}</p>
    </article>
  );
}
