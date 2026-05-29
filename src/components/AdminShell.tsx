"use client";

import { FormEvent, useState } from "react";
import { Lock, UploadCloud } from "lucide-react";
import { Badge } from "@/components/Badge";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const adminMenus = [
  "규정 연도 관리",
  "규정 항목 등록/수정",
  "원문/쉬운 설명 수정",
  "PDF 원본 업로드",
  "서식 파일 업로드",
  "전년도 대비 변경사항 등록",
  "검토 필요 항목 관리",
  "게시/비공개 상태 관리"
];

export function AdminShell() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Supabase 환경 변수를 설정하면 이메일/비밀번호 로그인을 사용할 수 있습니다.");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : "로그인 요청이 완료되었습니다. profiles.role = admin 권한을 확인하세요.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "로그인 설정을 확인하세요.");
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Lock size={22} className="text-brand-700" aria-hidden="true" />
          <h1 className="text-2xl font-bold">관리자 로그인</h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">Supabase Auth와 profiles.role 정책으로 관리자 권한을 구분합니다.</p>
        <form onSubmit={signIn} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-bold">이메일</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold">비밀번호</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="focus-ring mt-2 w-full rounded-md border border-line px-3 py-3 outline-none"
            />
          </label>
          <button type="submit" className="focus-ring w-full rounded-md bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700">
            로그인
          </button>
        </form>
        <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-muted">{message}</p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">관리자 작업대</h2>
            <p className="mt-2 text-sm leading-6 text-muted">연도별 PDF와 규정 항목을 검수한 뒤 게시 상태로 전환하는 구조입니다.</p>
          </div>
          <Badge tone="amber">RLS 관리자 전용</Badge>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {adminMenus.map((menu) => (
            <div key={menu} className="rounded-lg border border-line p-4">
              <UploadCloud size={18} className="text-brand-700" aria-hidden="true" />
              <h3 className="mt-3 font-bold">{menu}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">관리자 권한 확인 후 Supabase 테이블과 Storage에 연결할 영역입니다.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
