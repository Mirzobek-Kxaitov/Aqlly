import Link from "next/link";
import { Logo } from "@/components/logo";

type AuthShellProps = {
  children: React.ReactNode;
  side?: "left" | "right";
};

function BrandPanel() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-[linear-gradient(160deg,#F59E0B_0%,#FB923C_60%,#B45309_100%)] p-12 text-white lg:flex lg:w-[560px] lg:flex-col lg:justify-between">
      <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute right-24 top-36 h-20 w-20 rotate-12 rounded-lg bg-white/15" />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

      <Link href="/" className="relative flex items-center gap-3">
        <div className="grid h-11 w-11 grid-cols-2 gap-1 rounded-lg bg-white p-1 shadow-sm">
          <span className="rounded bg-brand" />
          <span className="rounded bg-brand/55" />
          <span className="rounded bg-brand/75" />
          <span className="rounded bg-brand" />
        </div>
        <span className="text-3xl font-black">Aqlly</span>
      </Link>

      <div className="relative max-w-md">
        <h2 className="text-5xl font-black leading-tight">Darslarni jonli o'yinga aylantiring.</h2>
        <p className="mt-5 text-lg font-semibold leading-8 text-white/90">
          AI yordamchi 1 daqiqada savol tuzadi. Sinfdagi har bir o'quvchi telefoni bilan ishtirok etadi. Natijalar avtomatik saqlanadi.
        </p>
        <div className="mt-9 rounded-lg border border-white/20 bg-white/15 p-5 backdrop-blur">
          <p className="text-sm font-semibold leading-6 text-white/90">
            "Avval darsga tayyorgarlik 1-2 soat olardi. Endi 10 daqiqada test tayyor."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/25 text-sm font-black">NK</div>
            <div>
              <p className="text-sm font-black">Nodira Karimova</p>
              <p className="text-xs font-bold text-white/75">Matematika · 47-maktab</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex gap-8 text-sm font-bold text-white/85">
        <div><span className="block text-2xl font-black text-white">5,000+</span>ustoz</div>
        <div><span className="block text-2xl font-black text-white">100K+</span>o'quvchi</div>
        <div><span className="block text-2xl font-black text-white">250+</span>maktab</div>
      </div>
    </section>
  );
}

export function AuthShell({ children, side = "right" }: AuthShellProps) {
  const formSide = (
    <section className="flex min-h-screen flex-1 items-center justify-center overflow-auto bg-white px-5 py-8 sm:px-8 lg:px-12">
      <div className="w-full max-w-[460px]">
        <Link href="/" className="mb-8 flex justify-center lg:hidden">
          <Logo />
        </Link>
        {children}
      </div>
    </section>
  );

  return (
    <main className="flex min-h-screen bg-white text-ink">
      {side === "left" ? (
        <>
          {formSide}
          <BrandPanel />
        </>
      ) : (
        <>
          <BrandPanel />
          {formSide}
        </>
      )}
    </main>
  );
}
