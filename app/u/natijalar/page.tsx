import { AppShell } from "@/components/app-shell";
import { ResultsList } from "@/components/results/results-list";

export default function ResultsPage() {
  return (
    <AppShell>
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-dark">Natijalar</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal">Sinf va mashq hisobotlari</h1>
        <p className="mt-2 text-muted">Live quizlardan yig'ilgan ballar, reytinglar va savol statistikasi.</p>
      </div>
      <ResultsList />
    </AppShell>
  );
}
