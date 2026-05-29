import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/lib/sample-data";

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <h1 className="text-2xl font-bold">FAQ</h1>
      <p className="mt-2 text-sm leading-6 text-muted">학교 현장에서 자주 묻는 질문을 관련 규정과 함께 확인합니다.</p>

      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <div key={`${faq.itemSlug}-${faq.question}`} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <h2 className="font-bold">{faq.question}</h2>
            <p className="mt-2 leading-7 text-muted">{faq.answer}</p>
            <Link href={`/regulations/${faq.itemSlug}`} className="focus-ring mt-3 inline-flex items-center gap-1 rounded-md py-2 text-sm font-bold text-brand-700">
              {faq.itemTitle} 보기
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
