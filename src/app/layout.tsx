import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "교원 복무·징계 규정 안내",
  description: "2026 초등 교육공무원 인사실무 제3장 교원의 복무·징계 안내 서비스"
};

const navItems = [
  { href: "/", label: "홈" },
  { href: "/search", label: "통합검색" },
  { href: "/categories", label: "주제별 보기" },
  { href: "/guides", label: "판단 도우미" },
  { href: "/reader", label: "원문/쉬운 설명" },
  { href: "/forms", label: "서식 모음" },
  { href: "/changes", label: "올해 달라진 내용" },
  { href: "/faq", label: "FAQ" },
  { href: "/admin", label: "관리자" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b border-line bg-white/88 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-600 text-white">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-base font-bold">교원 복무·징계 안내</span>
                <span className="block text-xs text-muted">2026 초등 교육공무원 인사실무</span>
              </span>
            </Link>
            <nav className="flex gap-2 overflow-x-auto text-sm text-muted">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring whitespace-nowrap rounded-md px-3 py-2 hover:bg-brand-50 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
