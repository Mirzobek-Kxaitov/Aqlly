import { AppShell } from "@/components/app-shell";
import { AiGeneratorForm } from "@/components/ai/ai-generator-form";

export default function AiGeneratorPage() {
  return (
    <AppShell>
      <div>
        <p className="text-sm font-extrabold uppercase tracking-wide text-brand-dark">AI generator</p>
        <h1 className="mt-2 text-4xl font-black">Matndan quiz savollari</h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Bu sahifa MVP uchun birinchi AI oqimi: ustoz mavzu matnini beradi, tizim 4 variantli savollar va qisqa izohlarni tayyorlaydi.
        </p>
      </div>
      <AiGeneratorForm />
    </AppShell>
  );
}
