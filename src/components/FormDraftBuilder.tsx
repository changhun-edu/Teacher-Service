"use client";

import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { Badge } from "@/components/Badge";
import { formTemplates } from "@/lib/sample-data";

export function FormDraftBuilder() {
  const [activeId, setActiveId] = useState(formTemplates[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const active = formTemplates.find((template) => template.id === activeId) ?? formTemplates[0];

  const draft = useMemo(() => {
    const rows = active.fields.map((field) => `${field.label}: ${values[field.key] ?? ""}`).join("\n");
    return `${active.title} 초안\n\n${rows}\n\n작성 안내: 이 초안은 브라우저에서만 생성되며 DB에 저장되지 않습니다. 제출 전 원문 규정과 기관 서식을 확인하세요.`;
  }, [active, values]);

  function selectTemplate(id: string) {
    setActiveId(id);
    setValues({});
  }

  function downloadDraft() {
    const blob = new Blob([draft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${active.title}_초안.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-lg border border-line bg-white p-4 shadow-sm">
        <h2 className="px-2 text-sm font-bold text-muted">서식 목록</h2>
        <div className="mt-3 space-y-2">
          {formTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => selectTemplate(template.id)}
              className={`focus-ring w-full rounded-md px-3 py-3 text-left text-sm font-semibold ${
                active.id === template.id ? "bg-brand-600 text-white" : "bg-slate-50 text-ink hover:bg-brand-50"
              }`}
            >
              {template.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText size={22} className="text-brand-700" aria-hidden="true" />
              <h1 className="text-2xl font-bold">{active.title}</h1>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{active.description}</p>
          </div>
          <Badge tone="green">브라우저 전용 생성</Badge>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {active.fields.map((field) => (
            <label key={field.key} className={field.multiline ? "md:col-span-2" : undefined}>
              <span className="text-sm font-bold">{field.label}</span>
              {field.multiline ? (
                <textarea
                  value={values[field.key] ?? ""}
                  onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  placeholder={field.placeholder}
                  rows={4}
                  className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3 outline-none"
                />
              ) : (
                <input
                  value={values[field.key] ?? ""}
                  onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3 outline-none"
                />
              )}
            </label>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-line bg-slate-50 p-4">
          <h2 className="font-bold">초안 미리보기</h2>
          <pre className="mt-3 whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-ink">{draft}</pre>
          <button
            type="button"
            onClick={downloadDraft}
            className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700"
          >
            <Download size={17} aria-hidden="true" />
            초안 다운로드
          </button>
        </div>
      </section>
    </div>
  );
}
