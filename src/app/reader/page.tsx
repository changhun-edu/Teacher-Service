import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/Badge";
import { getRegulationItem, regulationItems } from "@/lib/sample-data";

export default function ReaderPage({
  searchParams
}: {
  searchParams: { item?: string };
}) {
  const selected = getRegulationItem(searchParams.item ?? regulationItems[0].slug) ?? regulationItems[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">원문/쉬운 설명 보기</h1>
        <p className="mt-2 text-sm leading-6 text-muted">왼쪽 원문과 오른쪽 쉬운 설명을 비교하며 PDF 출처 페이지를 확인합니다.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-lg border border-line bg-white p-4 shadow-sm">
          <h2 className="px-2 text-sm font-bold text-muted">규정 항목</h2>
          <div className="mt-3 space-y-2">
            {regulationItems.map((item) => (
              <Link
                key={item.slug}
                href={`/reader?item=${item.slug}`}
                className={`focus-ring block rounded-md px-3 py-3 text-sm font-semibold ${
                  selected.slug === item.slug ? "bg-brand-600 text-white" : "bg-slate-50 text-ink hover:bg-brand-50"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone="green">{selected.year} 적용</Badge>
              {selected.changed && <Badge tone="amber">변경 있음</Badge>}
              {selected.reviewStatus === "needs_review" && <Badge tone="red">검토 필요</Badge>}
            </div>
            <h2 className="mt-4 text-2xl font-bold">{selected.title}</h2>
            <p className="mt-2 text-sm font-semibold text-muted">
              원문 출처: {selected.sourceLabel}, PDF p.{selected.pdfPageStart}
              {selected.pdfPageEnd ? `-${selected.pdfPageEnd}` : ""}
            </p>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h3 className="font-bold">원문</h3>
              <p className="mt-4 leading-8">{selected.originalText}</p>
            </div>
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold">쉬운 설명</h3>
                {selected.reviewStatus === "needs_review" && <Badge tone="red">원문 개정 후 검토 필요</Badge>}
              </div>
              <p className="mt-4 leading-8">{selected.easyText}</p>
              <Link href={`/regulations/${selected.slug}`} className="focus-ring mt-5 inline-flex items-center gap-1 rounded-md py-2 text-sm font-bold text-brand-700">
                상세 보기
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
