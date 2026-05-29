import { notFound } from "next/navigation";
import { RegulationDetail } from "@/components/RegulationDetail";
import { getRegulationItem, regulationItems } from "@/lib/sample-data";

export function generateStaticParams() {
  return regulationItems.map((item) => ({ slug: item.slug }));
}

export default function RegulationPage({ params }: { params: { slug: string } }) {
  const item = getRegulationItem(params.slug);

  if (!item) {
    notFound();
  }

  return <RegulationDetail item={item} />;
}
