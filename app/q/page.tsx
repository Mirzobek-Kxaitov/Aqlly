import { StudentJoin } from "@/components/live/student-join";

export default function StudentJoinPage({
  searchParams
}: {
  searchParams: { code?: string };
}) {
  return <StudentJoin initialCode={searchParams.code || ""} />;
}
