import { FormDraftBuilder } from "@/components/FormDraftBuilder";

export default function FormsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">서식 모음</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          외부강의 신고서, 겸직허가 신청서, 국외 자율 연수 계획서 초안을 브라우저에서만 생성합니다.
        </p>
      </div>
      <FormDraftBuilder />
    </main>
  );
}
