# 교원 복무·징계 규정 안내 웹서비스

2026 초등 교육공무원 인사실무 제3장 「교원의 복무·징계」를 주제별 탐색, 키워드 검색, 상황별 판단 도우미, 원문/쉬운 설명 병렬 보기, 서식 초안 작성 기능으로 안내하는 Next.js + Supabase 프로젝트입니다.

## 실행

```bash
npm install
npm run dev
```

환경 변수는 `.env.example`을 복사해 `.env.local`에 설정합니다. 브라우저에는 Supabase URL과 anon 또는 publishable key만 노출합니다.

## GitHub에 올리는 구조

이 프로젝트는 단순 HTML 사이트가 아니라 Next.js 앱입니다. GitHub에는 아래 구조 그대로 올리고, 실제 배포는 GitHub 저장소를 Vercel에 연결하는 방식을 권장합니다.

```text
teacher-service-discipline-guide/
├─ index.html
├─ package.json
├─ next.config.mjs
├─ tailwind.config.ts
├─ tsconfig.json
├─ .env.example
├─ README.md
├─ src/
│  ├─ app/
│  ├─ components/
│  └─ lib/
└─ supabase/
   ├─ schema.sql
   └─ seed.sql
```

`index.html`은 GitHub에서 바로 열어볼 수 있는 안내용 파일입니다. 실제 서비스 홈 화면은 `src/app/page.tsx`입니다.

## Supabase

- `supabase/schema.sql`: 테이블, 인덱스, RLS 정책
- `supabase/seed.sql`: 2026년 샘플 데이터

관리자 판정은 `profiles.role = 'admin'` 기준입니다. Supabase Auth 사용자 생성 후 해당 사용자의 `id`를 `profiles.id`로 등록하면 관리자 화면에서 사용할 수 있습니다.

적용 순서:

1. Supabase SQL editor에서 `supabase/schema.sql` 실행
2. Storage에 `regulations/2026/` 경로로 PDF 업로드
3. `supabase/seed.sql` 실행
4. `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정

초보자용 연결 순서:

1. [Supabase](https://supabase.com)에서 새 프로젝트를 만듭니다.
2. 왼쪽 메뉴의 `SQL Editor`를 엽니다.
3. `supabase/schema.sql` 파일 내용을 전체 복사해 실행합니다.
4. 이어서 `supabase/seed.sql` 파일 내용을 전체 복사해 실행합니다.
5. `Project Settings` → `API`로 이동합니다.
6. `Project URL`을 복사해 `NEXT_PUBLIC_SUPABASE_URL`에 넣습니다.
7. `anon` 또는 `publishable` key를 복사해 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 넣습니다.
8. `service_role` key는 절대 GitHub나 브라우저 코드에 넣지 않습니다.

로컬 `.env.local` 예시:

```env
NEXT_PUBLIC_SUPABASE_URL=https://프로젝트아이디.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=복사한_anon_public_key
```

Vercel 배포 시에는 Vercel 프로젝트의 `Settings` → `Environment Variables`에 같은 이름으로 등록합니다.

## 주요 화면

- `/`: 홈, 중앙 검색창, 주제별 카드, 변경 항목
- `/search`: 키워드 검색 결과
- `/categories`: PDF 목차 기반 주제별 보기
- `/regulations/[slug]`: 원문과 쉬운 설명 병렬 상세
- `/reader`: 원문/쉬운 설명 선택형 보기
- `/guides`: 휴가·겸직허가·외부강의 판단 도우미
- `/forms`: 브라우저 전용 서식 초안 생성 및 다운로드
- `/changes`: 전년도 대비 변경사항
- `/faq`: 자주 묻는 질문
- `/admin`: 관리자 로그인 및 운영 메뉴 기본 구조
