import { HostView } from "@/components/live/host-view";

export default function LiveHostPage({ params }: { params: { code: string } }) {
  return <HostView code={params.code} />;
}
