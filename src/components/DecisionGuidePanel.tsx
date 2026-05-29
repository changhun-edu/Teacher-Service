"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, HelpCircle } from "lucide-react";
import { Badge } from "@/components/Badge";
import { decisionGuides, getRelatedItems, type DecisionGuide } from "@/lib/sample-data";

function calculateOutcome(guide: DecisionGuide, answers: Record<string, boolean>) {
  const score = guide.questions.reduce((total, question) => total + (answers[question.id] ? question.yesWeight : 0), 0);
  return guide.outcomes.find((outcome) => score >= outcome.minScore) ?? guide.outcomes[guide.outcomes.length - 1];
}

export function DecisionGuidePanel() {
  const [activeId, setActiveId] = useState(decisionGuides[0].id);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const guide = decisionGuides.find((entry) => entry.id === activeId) ?? decisionGuides[0];

  const outcome = useMemo(() => calculateOutcome(guide, answers), [guide, answers]);
  const relatedItems = getRelatedItems(outcome.relatedItemSlugs);

  function switchGuide(nextId: string) {
    setActiveId(nextId);
    setAnswers({});
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-lg border border-line bg-white p-4 shadow-sm">
        <h2 className="px-2 text-sm font-bold text-muted">도우미 선택</h2>
        <div className="mt-3 space-y-2">
          {decisionGuides.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => switchGuide(entry.id)}
              className={`focus-ring w-full rounded-md px-3 py-3 text-left text-sm font-semibold ${
                activeId === entry.id ? "bg-brand-600 text-white" : "bg-slate-50 text-ink hover:bg-brand-50"
              }`}
            >
              {entry.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{guide.title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">{guide.description}</p>
          </div>
          <Badge tone="blue">질문형 체크리스트</Badge>
        </div>

        <div className="mt-6 space-y-3">
          {guide.questions.map((question) => (
            <div key={question.id} className="rounded-lg border border-line p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-700">
                    <HelpCircle size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-bold">{question.label}</p>
                    {question.help && <p className="mt-1 text-sm text-muted">{question.help}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:w-44">
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: true }))}
                    className={`focus-ring rounded-md border px-3 py-2 text-sm font-bold ${
                      answers[question.id] === true ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white"
                    }`}
                  >
                    예
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: false }))}
                    className={`focus-ring rounded-md border px-3 py-2 text-sm font-bold ${
                      answers[question.id] === false ? "border-slate-700 bg-slate-700 text-white" : "border-line bg-white"
                    }`}
                  >
                    아니오
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-line bg-slate-50 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Check size={18} className="text-brand-700" aria-hidden="true" />
            <Badge tone={outcome.tone}>{outcome.title}</Badge>
          </div>
          <p className="mt-3 leading-7 text-ink">{outcome.description}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedItems.map((item) => (
              <Link
                key={item.slug}
                href={`/regulations/${item.slug}`}
                className="focus-ring rounded-lg border border-line bg-white p-4 text-sm hover:border-brand-100"
              >
                <span className="font-bold">{item.title}</span>
                <span className="mt-2 flex items-center gap-1 text-brand-700">
                  관련 규정 p.{item.pdfPageStart}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
