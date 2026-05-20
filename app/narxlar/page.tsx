import Link from "next/link";
import { Check, Clock3, CreditCard, Headphones, MapPin, X } from "lucide-react";
import { Logo } from "@/components/logo";

const plans = [
  {
    name: "Bepul",
    tagline: "Boshlash uchun. Karta kerak emas.",
    price: "Bepul",
    period: "Doimo bepul",
    tone: "bg-slate-100 text-ink/75",
    cta: "Hozir boshlash",
    popular: false,
    features: [
      ["5 ta mashq", true],
      ["1 ta sinf · 30 o'quvchi", true],
      ["Quiz, Juftlash, Kartochkalar", true],
      ["Jonli seans · 30 ishtirokchi", true],
      ["AI savol generator · oyiga 5 marta", true],
      ["PDF yuklash", false],
      ["Ota-onaga Telegram/SMS", false],
      ["Chorak/yillik hisobot", false]
    ]
  },
  {
    name: "Pro",
    tagline: "Faol ustozlar uchun. To'liq imkoniyatlar.",
    price: "29,000 so'm",
    period: "oyiga · birinchi 14 kun bepul",
    tone: "bg-brand-soft text-brand-dark",
    cta: "14 kun bepul sinab ko'rish",
    popular: true,
    features: [
      ["Cheksiz mashqlar", true],
      ["Cheksiz sinflar va o'quvchilar", true],
      ["Barcha mashq turlari", true],
      ["Jonli seans · 200 ishtirokchi", true],
      ["AI savol generator · cheksiz", true],
      ["PDF darslik yuklash", true],
      ["Ota-onaga Telegram + SMS", true],
      ["Chorak/yillik hisobotlar", true]
    ]
  },
  {
    name: "Maktab",
    tagline: "Maktablar va o'quv markazlari uchun.",
    price: "Maxsus",
    period: "Shartnoma asosida",
    tone: "bg-purple-100 text-purple-700",
    cta: "Bog'lanish",
    popular: false,
    features: [
      ["Pro tarifning hammasi", true],
      ["Direktor paneli", true],
      ["Maktab darajasidagi hisobotlar", true],
      ["Cheksiz ustozlar", true],
      ["Ustozlarni boshqarish", true],
      ["Brending va o'z domen", true],
      ["Onboarding trening", true],
      ["API kirish", true]
    ]
  }
];

const assurances = [
  { icon: CreditCard, title: "Karta talab qilinmaydi", body: "Bepul tarifda karta kerak emas. Pro tarifda 14 kun bepul sinov." },
  { icon: MapPin, title: "O'zbekistonda yaratilgan", body: "Click, Payme, Uzcard, Humo va o'zbek tilida yordam." },
  { icon: Clock3, title: "Istalgan vaqt bekor qilish", body: "Hech qanday uzoq muddatli majburiyat yo'q." },
  { icon: Headphones, title: "Tez yordam", body: "Telegram orqali qo'llab-quvvatlash. Maktab tarifida alohida onboarding." }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF0] text-ink">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 sm:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-bold md:flex">
          <Link href="/" className="text-ink">Imkoniyatlar</Link>
          <Link href="/narxlar" className="font-black text-brand-dark">Narxlar</Link>
          <Link href="/q" className="text-ink">O'quvchi kirishi</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/kirish" className="rounded-md border border-ink bg-white px-4 py-2 text-sm font-black">Kirish</Link>
          <Link href="/ro-yxat" className="rounded-md bg-brand px-4 py-2 text-sm font-black text-white shadow-[0_3px_0_#B45309]">
            Bepul ro'yxat
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-3xl px-5 py-12 text-center">
        <span className="inline-flex rounded-full bg-brand-soft px-4 py-1.5 text-xs font-black uppercase tracking-wide text-brand-dark">
          Oddiy va shaffof narxlash
        </span>
        <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">Sizga eng mos tarifni tanlang</h1>
        <p className="mt-5 text-lg font-semibold leading-8 text-muted">
          Ustozlar uchun har doim bepul tarif bor. Pro va Maktab tariflari qo'shimcha imkoniyatlar beradi.
        </p>
        <div className="mt-7 inline-flex rounded-md border border-line bg-white p-1">
          <button className="rounded bg-ink px-5 py-2 text-sm font-black text-white">Oylik</button>
          <button className="rounded px-5 py-2 text-sm font-black text-muted">Yillik <span className="ml-2 rounded bg-ok/10 px-1.5 py-0.5 text-[11px] text-ok">-20%</span></button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex rounded-lg bg-white p-7 shadow-sm ${
              plan.popular ? "scale-[1.02] border-2 border-brand shadow-xl shadow-brand/15" : "border border-line"
            } flex-col`}
          >
            {plan.popular ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-black uppercase tracking-wide text-white">
                Eng mashhur
              </span>
            ) : null}
            <span className={`w-fit rounded-md px-3 py-1 text-xs font-black uppercase tracking-wide ${plan.tone}`}>{plan.name}</span>
            <p className="mt-4 min-h-10 text-sm font-semibold leading-6 text-muted">{plan.tagline}</p>
            <div className="mt-6 border-t border-line-soft pt-6">
              <p className="text-4xl font-black">{plan.price}</p>
              <p className="mt-2 text-sm font-bold text-muted">{plan.period}</p>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map(([text, included]) => (
                <li key={text as string} className={`flex items-start gap-3 text-sm font-bold leading-6 ${included ? "text-ink/80" : "text-faint"}`}>
                  <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ${included ? "bg-ok text-white" : "bg-slate-100 text-faint"}`}>
                    {included ? <Check size={12} /> : <X size={12} />}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <Link
              href={plan.name === "Maktab" ? "/kirish" : "/ro-yxat"}
              className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-md font-black ${
                plan.popular ? "bg-brand text-white shadow-[0_3px_0_#B45309]" : "border border-ink bg-white text-ink"
              }`}
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 md:grid-cols-2 lg:grid-cols-4">
        {assurances.map((item) => (
          <article key={item.title} className="rounded-lg border border-line bg-white p-5">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-soft text-brand-dark">
              <item.icon size={20} />
            </div>
            <h2 className="mt-4 font-black">{item.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
