import { BarChart3, BookOpenCheck, Library, Play, UsersRound } from "lucide-react";
import { DirectorShell, StatCard } from "@/components/director/director-shell";

const teachers = [
  ["Akmal Yo'ldoshev", "Matematika", 48, 84, "#F59E0B"],
  ["Nodira Karimova", "Ona tili", 42, 79, "#EC4899"],
  ["Sherzod Aliyev", "Fizika", 38, 76, "#3B82F6"],
  ["Kamola Toshmatova", "Ingliz tili", 35, 81, "#10B981"],
  ["Bobur Saidov", "Geografiya", 31, 68, "#8B5CF6"]
] as const;

const subjects = [
  ["Matematika", 78, 142],
  ["Ona tili", 81, 118],
  ["Ingliz tili", 73, 96],
  ["Fizika", 68, 84],
  ["Geografiya", 71, 62],
  ["Tarix", 65, 58]
] as const;

function Heatmap() {
  const cells = Array.from({ length: 168 }, (_, index) => {
    const row = Math.floor(index / 24);
    const col = index % 24;
    const value = Math.abs(Math.sin(row * 13 + col * 7) * Math.cos(col * 3)) * (col < 18 ? 1 : 0.2);
    const color = value < 0.1 ? "bg-line-soft" : value < 0.3 ? "bg-brand-soft" : value < 0.55 ? "bg-amber-300" : value < 0.8 ? "bg-brand" : "bg-brand-dark";
    return <span key={index} className={`aspect-square rounded-[3px] ${color}`} />;
  });
  return <div className="grid flex-1 grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-1">{cells}</div>;
}

export default function DirectorDashboardPage() {
  return (
    <DirectorShell active="home" title="47-maktab - Bosh sahifa" subtitle="Toshkent shahri · 2025-2026 o'quv yili">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="O'quvchilar" value="1,284" sub={<><b className="text-ok">+18</b> bu oy</>} tone="bg-purple-100 text-purple-700" icon={UsersRound} />
        <StatCard label="Ustozlar" value="62" sub={<><b className="text-ok">48</b> faol</>} tone="bg-brand-soft text-brand-dark" icon={Library} />
        <StatCard label="Sinflar" value="44" sub="6 dan 11 gacha" tone="bg-blue-100 text-blue-700" icon={BookOpenCheck} />
        <StatCard label="Quiz seanslari" value="892" sub={<><b className="text-ok">↑ 34%</b> bu oy</>} tone="bg-ok/10 text-ok" icon={Play} />
        <StatCard label="O'rt. ball" value="74%" sub={<><b className="text-ok">↑ 4%</b> chorakda</>} tone="bg-bad/10 text-bad" icon={BarChart3} />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <article className="rounded-lg border border-line bg-white p-5">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <div>
                <h2 className="font-black">Maktab faolligi</h2>
                <p className="text-sm font-bold text-muted">Kun va soat bo'yicha quiz seanslari</p>
              </div>
              <select className="rounded-md border border-line bg-white px-3 py-2 text-xs font-bold">
                <option>O'tgan 4 hafta</option>
              </select>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col justify-between text-xs font-bold text-muted">
                {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((day) => <span key={day}>{day}</span>)}
              </div>
              <Heatmap />
            </div>
            <p className="mt-3 pl-8 text-xs font-bold text-muted">Eng faol: <b className="text-ink">Seshanba 10:00</b> · Eng band soat: <b className="text-ink">11:00-12:00</b></p>
          </article>

          <article className="rounded-lg border border-line bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-black">Eng faol ustozlar</h2>
              <span className="text-xs font-black text-purple-700">Hammasi</span>
            </div>
            <div className="grid grid-cols-[36px_44px_1fr_120px_80px_80px] gap-3 px-2 pb-2 text-xs font-black uppercase text-muted">
              <span /> <span /> <span>Ustoz</span><span>Fan</span><span>Seans</span><span>O'rt.</span>
            </div>
            {teachers.map((teacher, index) => (
              <div key={teacher[0]} className="grid grid-cols-[36px_44px_1fr_120px_80px_80px] items-center gap-3 border-t border-line-soft px-2 py-3 text-sm">
                <span className="text-center font-black text-purple-700">{index + 1}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full text-xs font-black text-white" style={{ backgroundColor: teacher[4] }}>
                  {teacher[0].split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </span>
                <span className="truncate font-black">{teacher[0]}</span>
                <span className="font-bold text-muted">{teacher[1]}</span>
                <span className="font-black">{teacher[2]}</span>
                <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-black text-brand-dark">{teacher[3]}%</span>
              </div>
            ))}
          </article>
        </div>

        <div className="space-y-6">
          <article className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-black">Fanlar bo'yicha</h2>
            <div className="mt-4 space-y-4">
              {subjects.map((subject) => (
                <div key={subject[0]}>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span>{subject[0]}</span>
                    <span className="text-muted"><b className="text-brand-dark">{subject[1]}%</b> · {subject[2]} seans</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-line-soft">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${subject[1]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-line bg-white p-5">
            <h2 className="font-black">E'tibor talab mavzular</h2>
            <div className="mt-4 space-y-2">
              {[
                ["Geografiya · Materiklar", "7-sinf", 48],
                ["Fizika · Mexanika", "9-sinf", 52],
                ["Matematika · Algebra", "7-sinf", 58]
              ].map((item) => (
                <div key={item[0] as string} className="flex items-center gap-3 rounded-md bg-bad/10 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{item[0]}</p>
                    <p className="text-xs font-bold text-muted">{item[1]}</p>
                  </div>
                  <span className="font-black text-bad">{item[2]}%</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </DirectorShell>
  );
}
