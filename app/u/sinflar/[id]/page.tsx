import { AppShell } from "@/components/app-shell";
import { ClassDetail } from "@/components/classes/class-detail";

export default function ClassDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <ClassDetail classId={params.id} />
    </AppShell>
  );
}
