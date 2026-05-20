import { Download } from "lucide-react";
import { DirectorShell } from "@/components/director/director-shell";

const rows = [
  ["6-A", "Akmal Yo'ldoshev", "Matematika", 28, 18, 92, 84, 8],
  ["6-B", "Akmal Yo'ldoshev", "Matematika", 26, 14, 78, 71, 4],
  ["6-V", "Nodira Karimova", "Ona tili", 27, 16, 88, 79, 6],
  ["6-G", "Kamola T.", "Ingliz tili", 25, 12, 72, 81, 12],
  ["7-A", "Akmal Yo'ldoshev", "Matematika", 32, 12, 65, 68, -2],
  ["7-B", "Sherzod Aliyev", "Fizika", 32, 14, 70, 76, 5],
  ["7-V", "Bobur Saidov", "Geografiya", 30, 8, 52, 58, -7],
  ["8-A", "Nodira Karimova", "Ona tili", 29, 11, 68, 74, 2],
  ["8-B", "Kamola T.", "Ingliz tili", 28, 9, 60, 71, 4],
  ["9-A", "Sherzod Aliyev", "Fizika", 31, 10, 64, 62, -5]
] as const;

export default function DirectorReportsPage() {
  const actions = (
    <div className="hidden items-center gap-2 sm:flex">
      <button className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-black">
        <Download size={15} /> PDF
      </button>
      <button className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-black">
        <Download size={15} /> Excel
      </button>
    </div>
  );

  return (
    <DirectorShell active="reports" title="Hisobotlar" subtitle="Sinflar bo'yicha to'liq tahlil va eksport" actions={actions}>
      <section className="mb-5 flex flex-wrap items-end gap-4 rounded-lg border border-line bg-white p-5">
        {["Davr", "Sinf darajasi", "Fan", "Ustoz"].map((label, index) => (
          <label key={label} className="grid gap-1">
            <span className="text-xs font-black uppercase tracking-wide text-muted">{label}</span>
            <select className="min-w-36 rounded-md border border-line bg-bg px-3 py-2 text-sm font-black">
              <option>{index === 0 ? "1-chorak" : "Hammasi"}</option>
            </select>
          </label>
        ))}
        <button className="ml-auto rounded-md border border-purple-700 bg-purple-100 px-5 py-2.5 text-sm font-black text-purple-700">Qo'llash</button>
      </section>

      <section className="overflow-hidden rounded-lg border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="text-lg font-black">Sinflar bo'yicha tahlil</h2>
          <span className="text-sm font-bold text-muted">44 ta sinf · 1-chorak natijalari</span>
        </div>
        <div className="overflow-auto">
          <div className="min-w-[940px]">
            <div className="grid grid-cols-[80px_1fr_140px_110px_100px_120px_120px_100px] gap-3 bg-bg px-5 py-3 text-xs font-black uppercase tracking-wide text-muted">
              <span>Sinf</span><span>Ustoz</span><span>Fan</span><span>O'quvchi</span><span>Seans</span><span>Faollik</span><span>O'rt. ball</span><span>Trend</span>
            </div>
            {rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-[80px_1fr_140px_110px_100px_120px_120px_100px] items-center gap-3 border-t border-line-soft px-5 py-3 text-sm">
                <span className="font-black">{row[0]}</span>
                <span className="truncate font-bold text-ink/80">{row[1]}</span>
                <span className="font-bold text-muted">{row[2]}</span>
                <span className="font-bold text-muted">{row[3]}</span>
                <span className="font-black">{row[4]}</span>
                <span>
                  <span className="block h-1.5 w-20 overflow-hidden rounded-full bg-line-soft">
                    <span className={`block h-full rounded-full ${row[5] >= 80 ? "bg-ok" : row[5] >= 60 ? "bg-brand" : "bg-bad"}`} style={{ width: `${row[5]}%` }} />
                  </span>
                  <span className="mt-1 block text-xs font-bold text-muted">{row[5]}%</span>
                </span>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${row[6] >= 80 ? "bg-ok/10 text-ok" : row[6] >= 60 ? "bg-brand-soft text-brand-dark" : "bg-bad/10 text-bad"}`}>
                  {row[6]}%
                </span>
                <span className={`font-black ${row[7] >= 0 ? "text-ok" : "text-bad"}`}>
                  {row[7] >= 0 ? "↑" : "↓"} {Math.abs(row[7])}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DirectorShell>
  );
}
