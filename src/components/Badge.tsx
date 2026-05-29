import type { BadgeTone } from "@/lib/sample-data";

const toneClass: Record<BadgeTone, string> = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-soft text-amber-800",
  blue: "border-sky-200 bg-sky-50 text-sky-700",
  red: "border-rose-200 bg-rose-50 text-rose-700",
  gray: "border-slate-200 bg-slate-50 text-slate-700"
};

export function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: BadgeTone }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${toneClass[tone]}`}>
      {children}
    </span>
  );
}
