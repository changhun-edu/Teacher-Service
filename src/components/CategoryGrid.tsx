import { categories } from "@/lib/sample-data";
import { TopicCard } from "@/components/TopicCard";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <TopicCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
