import { PlayerView } from "@/components/live/player-view";

export default function StudentPlayerPage({
  params,
  searchParams
}: {
  params: { code: string };
  searchParams: { player?: string };
}) {
  return <PlayerView code={params.code} playerId={searchParams.player} />;
}
