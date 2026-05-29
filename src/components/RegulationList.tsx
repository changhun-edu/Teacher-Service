import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Badge } from "@/components/Badge";
import { getCategory, type RegulationItem } from "@/lib/sample-data";

export function RegulationList({ items }: { items: RegulationItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-muted">
        검색 결과가 없습니다. 다른 키워드로 다시 검색해 주세요.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const category = getCategory(item.categorySlug);
        return (
          <Link
            key={item.id}
            href={`/regulations/${item.slug}`}
            className="focus-ring block rounded-lg border border-line bg-white p-5 shadow-sm transition hover:border-brand-100 hover:shadow-soft"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">{category?.title ?? "규정"}</Badge>
                  <Badge tone="green">{item.year} 적용</Badge>
                  {item.changed && <Badge tone="amber">변경 있음</Badge>}
                  {item.reviewStatus === "needs_review" && <Badge tone="red">검토 필요</Badge>}
                </div>
                <h3 className="mt-3 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 leading-6 text-muted">{item.summary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700">
                <FileText size={16} aria-hidden="true" />
                p.{item.pdfPageStart}
                {item.pdfPageEnd ? `-${item.pdfPageEnd}` : ""}
                <ArrowRight size={16} aria-hidden="true" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
