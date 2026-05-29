import { CategoryGrid } from "@/components/CategoryGrid";
import { RegulationList } from "@/components/RegulationList";
import { categories, getCategory, getItemsByCategory } from "@/lib/sample-data";

export default function CategoriesPage({
  searchParams
}: {
  searchParams: { topic?: string };
}) {
  const selectedSlug = searchParams.topic ?? categories[0]?.slug;
  const selected = getCategory(selectedSlug);
  const items = selected ? getItemsByCategory(selected.slug) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <section>
        <h1 className="text-2xl font-bold">주제별 카드 메뉴</h1>
        <p className="mt-2 text-sm leading-6 text-muted">복무 실무에서 자주 찾는 흐름에 맞춰 항목을 묶었습니다.</p>
        <div className="mt-5">
          <CategoryGrid />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">{selected?.title ?? "선택된 주제"} 관련 규정</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{selected?.description}</p>
        </div>
        <RegulationList items={items} />
      </section>
    </main>
  );
}
