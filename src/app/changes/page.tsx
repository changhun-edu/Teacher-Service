import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/Badge";
import { changeLogs, regulationItems } from "@/lib/sample-data";

export default function ChangesPage() {
  const changedItems = regulationItems.filter((item) => item.changed);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold">올해 달라진 내용</h1>
      <p className="mt-2 text-sm leading-6 text-muted">전년도 대비 변경사항과 검토 필요 항목을 함께 관리합니다.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {changeLogs.map((change) => (
          <div key={change.id} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <Badge tone={change.type === "added" ? "green" : "amber"}>{change.type}</Badge>
            <h2 className="mt-3 font-bold">{change.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{change.summary}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">변경 표시 항목</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {changedItems.map((item) => (
            <Link key={item.slug} href={`/regulations/${item.slug}`} className="focus-ring rounded-lg border border-line bg-white p-5 shadow-sm hover:border-brand-100">
              <div className="flex flex-wrap gap-2">
                <Badge tone="amber">변경 있음</Badge>
                {item.reviewStatus === "needs_review" && <Badge tone="red">검토 필요</Badge>}
              </div>
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                원문 p.{item.pdfPageStart}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
