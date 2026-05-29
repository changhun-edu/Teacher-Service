import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Badge } from "@/components/Badge";
import { getCategory, type RegulationItem } from "@/lib/sample-data";

export function RegulationDetail({ item }: { item: RegulationItem }) {
  const category = getCategory(item.categorySlug);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <Link href="/search" className="focus-ring inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-brand-700">
        <ArrowLeft size={16} aria-hidden="true" />
        검색으로 돌아가기
      </Link>

      <div className="mt-4 rounded-lg border border-line bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{category?.title ?? "규정"}</Badge>
          <Badge tone="green">최신 기준</Badge>
          {item.changed && <Badge tone="amber">변경 있음</Badge>}
          {item.reviewStatus === "needs_review" && <Badge tone="red">검토 필요</Badge>}
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-normal md:text-3xl">{item.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-muted">{item.summary}</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-semibold text-muted">
          <FileText size={16} aria-hidden="true" />
          원문 출처: {item.sourceLabel}, PDF p.{item.pdfPageStart}
          {item.pdfPageEnd ? `-${item.pdfPageEnd}` : ""}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-lg font-bold">원문</h2>
          <p className="mt-4 whitespace-pre-line leading-8 text-ink">{item.originalText}</p>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-muted">
            PDF 원본 업로드 후에는 Supabase Storage의 페이지 또는 원문 추출 결과와 연결하세요.
          </div>
        </section>

        <section className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">쉬운 설명</h2>
            {item.reviewStatus === "needs_review" && <Badge tone="red">원문 개정 후 검토 필요</Badge>}
          </div>
          <p className="mt-4 leading-8 text-ink">{item.easyText}</p>

          <h3 className="mt-6 font-bold">실무 유의사항</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {item.practiceNotes.map((note) => (
              <li key={note} className="rounded-md bg-brand-50 px-3 py-2">
                {note}
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-bold">관련 서식</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.relatedForms.map((form) => (
              <Badge key={form} tone="gray">
                {form}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-lg font-bold">FAQ</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {item.faq.map((entry) => (
            <div key={entry.question} className="rounded-lg border border-line p-4">
              <h3 className="font-bold">{entry.question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{entry.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
