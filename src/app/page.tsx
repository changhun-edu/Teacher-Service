import Link from "next/link";
import { ArrowRight, CheckCircle2, FileWarning, History } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CategoryGrid } from "@/components/CategoryGrid";
import { RegulationList } from "@/components/RegulationList";
import { SearchBox } from "@/components/SearchBox";
import { changeLogs, currentVersion, regulationItems } from "@/lib/sample-data";

export default function HomePage() {
  const featured = regulationItems.filter((item) => item.changed || item.reviewStatus === "needs_review").slice(0, 3);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            <Badge tone="green">최신 기준</Badge>
            <Badge tone="blue">{currentVersion.year} 적용</Badge>
            <Badge tone="amber">연도별 버전 관리</Badge>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-normal md:text-5xl">
            교원 복무·징계 규정을 검색하고 바로 판단하세요
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted">
            PDF 목차 기반 주제, 키워드 검색, 상황별 체크리스트, 원문과 쉬운 설명을 한 화면에서 제공합니다.
          </p>
        </div>

        <div className="mt-8">
          <SearchBox />
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <CheckCircle2 className="text-brand-700" size={22} aria-hidden="true" />
            <p className="mt-3 text-sm font-bold">관리자 검수 상태 표시</p>
            <p className="mt-1 text-sm leading-6 text-muted">원문 개정 시 쉬운 설명은 검토 필요로 전환합니다.</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <FileWarning className="text-amber-700" size={22} aria-hidden="true" />
            <p className="mt-3 text-sm font-bold">원문 페이지 상시 노출</p>
            <p className="mt-1 text-sm leading-6 text-muted">검색 결과와 상세 화면에 PDF 페이지를 함께 표시합니다.</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <History className="text-sky-700" size={22} aria-hidden="true" />
            <p className="mt-3 text-sm font-bold">전년도 대비 변경 이력</p>
            <p className="mt-1 text-sm leading-6 text-muted">변경 있음 배지와 변경사항 목록으로 추적합니다.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white/58">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">주제별 보기</h2>
              <p className="mt-2 text-sm text-muted">PDF 목차를 업무 흐름에 맞게 다시 묶었습니다.</p>
            </div>
            <Link href="/categories" className="focus-ring hidden items-center gap-1 rounded-md px-3 py-2 text-sm font-bold text-brand-700 md:inline-flex">
              전체 보기 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h2 className="text-2xl font-bold">검토가 필요한 주요 항목</h2>
            <p className="mt-2 text-sm text-muted">변경 가능성이 있거나 쉬운 설명 재검토가 필요한 항목입니다.</p>
            <div className="mt-5">
              <RegulationList items={featured} />
            </div>
          </div>
          <aside className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">올해 달라진 내용</h2>
            <div className="mt-4 space-y-3">
              {changeLogs.map((change) => (
                <div key={change.id} className="rounded-lg border border-line p-4">
                  <Badge tone={change.type === "added" ? "green" : "amber"}>{change.type}</Badge>
                  <h3 className="mt-3 font-bold">{change.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{change.summary}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
