import { DecisionGuidePanel } from "@/components/DecisionGuidePanel";

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">상황별 판단 도우미</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          휴가, 겸직허가, 외부강의 신고 여부를 질문형 체크리스트로 점검하고 관련 규정으로 이동합니다.
        </p>
      </div>
      <DecisionGuidePanel />
    </main>
  );
}
