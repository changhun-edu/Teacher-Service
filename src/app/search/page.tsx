import { SearchBox } from "@/components/SearchBox";
import { RegulationList } from "@/components/RegulationList";
import { searchRegulations } from "@/lib/sample-data";

export default function SearchPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";
  const results = searchRegulations(query);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-7">
        <h1 className="text-2xl font-bold">통합검색</h1>
        <p className="mt-2 text-sm leading-6 text-muted">키워드와 쉬운 설명, 원문 요약, PDF 출처를 함께 검색합니다.</p>
        <div className="mt-5">
          <SearchBox initialQuery={query} compact />
        </div>
      </div>

      <section className="mt-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">{query ? `"${query}" 검색 결과` : "전체 규정 항목"}</h2>
          <span className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-muted">{results.length}개 항목</span>
        </div>
        <RegulationList items={results} />
      </section>
    </main>
  );
}
