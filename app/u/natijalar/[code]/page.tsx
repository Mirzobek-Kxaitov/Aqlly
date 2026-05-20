import { AppShell } from "@/components/app-shell";
import { ResultDetail } from "@/components/results/result-detail";

export default function ResultDetailPage({ params }: { params: { code: string } }) {
  return (
    <AppShell>
      <ResultDetail code={params.code} />
    </AppShell>
  );
}
