import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { Category } from "@/lib/sample-data";
import { Badge } from "@/components/Badge";

export function TopicCard({ category }: { category: Category }) {
  const Icon = category.icon ?? FileText;

  return (
    <Link
      href={`/categories?topic=${category.slug}`}
      className="focus-ring group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
          <Icon size={23} aria-hidden="true" />
        </span>
        <span className="flex flex-wrap justify-end gap-1.5">
          {category.latest && <Badge tone="green">최신 기준</Badge>}
          {category.changed && <Badge tone="amber">변경 있음</Badge>}
        </span>
      </div>
      <div className="mt-5 flex-1">
        <h3 className="text-lg font-bold">{category.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{category.summary}</p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="font-semibold text-muted">관련 항목 {category.itemCount}개</span>
        <span className="inline-flex items-center gap-1 font-bold text-brand-700">
          보기 <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
