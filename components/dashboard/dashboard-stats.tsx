"use client";

import { useEffect, useState } from "react";
import { getStoredClassCount } from "@/lib/classes";
import { stats } from "@/lib/mock-data";

export function DashboardStats() {
  const [classCount, setClassCount] = useState(stats[0].value);

  useEffect(() => {
    setClassCount(String(getStoredClassCount()));
  }, []);

  const items = stats.map((item) =>
    item.label === "Faol sinflar" ? { ...item, value: classCount, hint: "Jami sinflar" } : item
  );

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-line bg-white p-5">
          <p className="text-sm font-bold text-muted">{item.label}</p>
          <p className="mt-3 text-3xl font-black">{item.value}</p>
          <p className="mt-1 text-sm font-bold text-brand-dark">{item.hint}</p>
        </div>
      ))}
    </section>
  );
}
