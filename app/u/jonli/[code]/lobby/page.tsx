import { LobbyView } from "@/components/live/lobby-view";

export default function LiveLobbyPage({ params }: { params: { code: string } }) {
  return <LobbyView code={params.code} />;
}
