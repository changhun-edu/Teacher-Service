"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBox({ initialQuery = "", compact = false }: { initialQuery?: string; compact?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`mx-auto flex w-full items-center gap-2 rounded-lg border border-line bg-white p-2 shadow-soft ${
        compact ? "max-w-3xl" : "max-w-4xl"
      }`}
    >
      <Search className="ml-2 shrink-0 text-brand-700" size={compact ? 20 : 24} aria-hidden="true" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="병가, 겸직허가, 외부강의, 육아시간, 징계 절차 검색"
        className={`focus-ring min-w-0 flex-1 rounded-md border-0 bg-transparent px-2 text-ink outline-none ${
          compact ? "py-2 text-base" : "py-3 text-lg"
        }`}
        aria-label="규정 검색어"
      />
      <button
        type="submit"
        className="focus-ring rounded-md bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700"
      >
        검색
      </button>
    </form>
  );
}
