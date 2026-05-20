export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 grid-cols-2 gap-1 rounded-lg bg-white p-1 shadow-sm ring-1 ring-line">
        <span className="rounded bg-brand" />
        <span className="rounded bg-brand/55" />
        <span className="rounded bg-brand/75" />
        <span className="rounded bg-brand" />
      </div>
      <span className="text-2xl font-extrabold tracking-normal text-ink">Aqlly</span>
    </div>
  );
}
