import {
  AlarmClockCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gavel,
  Umbrella
} from "lucide-react";

export type BadgeTone = "green" | "amber" | "blue" | "red" | "gray";

export type Category = {
  slug: string;
  title: string;
  description: string;
  icon: typeof FileText;
  summary: string;
  itemCount: number;
  changed: boolean;
  latest: boolean;
};

export type RegulationItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  year: number;
  pdfPageStart: number;
  pdfPageEnd?: number;
  sourceLabel: string;
  originalText: string;
  easyText: string;
  practiceNotes: string[];
  relatedForms: string[];
  faq: { question: string; answer: string }[];
  keywords: string[];
  changed: boolean;
  reviewStatus: "reviewed" | "needs_review";
  status: "published" | "draft";
};

export type ChangeLog = {
  id: string;
  title: string;
  summary: string;
  type: "added" | "updated" | "clarified";
};

export type FormTemplate = {
  id: string;
  title: string;
  description: string;
  formType: string;
  fields: { key: string; label: string; placeholder?: string; multiline?: boolean }[];
};

export type DecisionGuide = {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    label: string;
    help?: string;
    yesWeight: number;
  }[];
  outcomes: {
    minScore: number;
    title: string;
    description: string;
    tone: BadgeTone;
    relatedItemSlugs: string[];
  }[];
};

export const currentVersion = {
  year: 2026,
  title: "2026 초등 교육공무원 인사실무 제3장 교원의 복무·징계",
  status: "published",
  pdfName: "2026_인사실무_제3장 교원의 복무 징계.pdf"
};

export const categories: Category[] = [
  {
    slug: "basics",
    title: "복무 기본",
    description: "근무 원칙, 복무 관리, 소속 기관장의 승인 사항",
    icon: ClipboardCheck,
    summary: "교원이 지켜야 할 기본 복무 원칙과 학교장 승인 흐름을 확인합니다.",
    itemCount: 4,
    changed: false,
    latest: true
  },
  {
    slug: "attendance",
    title: "출장·조퇴·외출·지각",
    description: "근무상황 신청, 출장 처리, 근태 기록",
    icon: AlarmClockCheck,
    summary: "근무상황부 처리와 시간 단위 복무 신청 기준을 한곳에 모았습니다.",
    itemCount: 5,
    changed: true,
    latest: true
  },
  {
    slug: "leave",
    title: "휴가",
    description: "연가, 병가, 공가, 특별휴가, 육아시간",
    icon: Umbrella,
    summary: "휴가 종류별 승인 기준과 증빙 필요 여부를 빠르게 확인합니다.",
    itemCount: 8,
    changed: true,
    latest: true
  },
  {
    slug: "outside-work",
    title: "겸직·외부강의",
    description: "겸직허가, 외부강의 신고, 사례금 확인",
    icon: BriefcaseBusiness,
    summary: "허가와 신고가 필요한 활동을 질문형 기준으로 구분합니다.",
    itemCount: 7,
    changed: true,
    latest: true
  },
  {
    slug: "discipline",
    title: "징계",
    description: "징계 사유, 절차, 의결 요구, 처분 관리",
    icon: Gavel,
    summary: "징계 절차와 실무상 확인해야 할 문서 흐름을 정리합니다.",
    itemCount: 6,
    changed: false,
    latest: true
  },
  {
    slug: "forms",
    title: "서식·체크리스트",
    description: "신고서, 신청서, 점검표, 국외 자율 연수 서식",
    icon: FileCheck2,
    summary: "자주 쓰는 서식 초안을 브라우저에서 작성하고 내려받습니다.",
    itemCount: 9,
    changed: true,
    latest: true
  }
];

export const regulationItems: RegulationItem[] = [
  {
    id: "item-sick-leave",
    slug: "sick-leave",
    title: "병가 신청 및 증빙 확인",
    summary: "질병 또는 부상으로 직무 수행이 어려운 경우 병가 신청 가능 여부와 증빙 기준을 확인합니다.",
    categorySlug: "leave",
    year: 2026,
    pdfPageStart: 42,
    pdfPageEnd: 44,
    sourceLabel: "제3장 교원의 복무·징계 > 휴가 > 병가",
    originalText:
      "병가는 질병 또는 부상으로 직무를 수행할 수 없는 경우에 승인하며, 일정 기간 이상이거나 기관장이 필요하다고 인정하는 경우 진단서 등 증빙자료를 확인한다.",
    easyText:
      "아파서 수업이나 업무를 하기 어려운 때 신청합니다. 기간이 길어지거나 반복 신청되는 경우에는 진단서 등 객관적인 자료를 준비해야 합니다.",
    practiceNotes: ["NEIS 근무상황 신청 시 병가 사유와 기간을 구체적으로 적습니다.", "연속 사용 또는 장기 사용은 학교 내부 결재선과 증빙 확인을 먼저 점검합니다."],
    relatedForms: ["진단서 또는 진료확인서", "근무상황 신청"],
    faq: [
      {
        question: "반나절 병가도 가능한가요?",
        answer: "기관의 복무 처리 기준에 따라 시간 단위 입력 가능 여부를 확인하고, 학교 결재 기준에 맞춰 신청합니다."
      }
    ],
    keywords: ["병가", "질병", "진단서", "휴가", "증빙"],
    changed: true,
    reviewStatus: "needs_review",
    status: "published"
  },
  {
    id: "item-parenting-time",
    slug: "parenting-time",
    title: "육아시간 사용 기준",
    summary: "자녀 연령 등 요건을 충족하는 교원이 육아시간을 사용할 때 확인할 핵심 기준입니다.",
    categorySlug: "leave",
    year: 2026,
    pdfPageStart: 51,
    pdfPageEnd: 53,
    sourceLabel: "제3장 교원의 복무·징계 > 휴가 > 특별휴가",
    originalText:
      "육아시간은 대상 자녀, 사용 가능 기간, 일 단위 사용 한도 등 관련 법령과 지침에서 정한 요건을 충족하는 경우 승인할 수 있다.",
    easyText:
      "대상 자녀 요건과 하루 사용 가능 시간을 확인한 뒤 신청합니다. 수업 운영과 복무 처리에 영향이 있으므로 사전 협의가 중요합니다.",
    practiceNotes: ["담임, 전담, 보직 여부에 따라 수업 대체와 업무 공백을 먼저 확인합니다.", "사용 요건이 바뀐 경우 쉬운 설명은 검토 필요 상태로 전환합니다."],
    relatedForms: ["육아시간 신청 증빙", "근무상황 신청"],
    faq: [
      {
        question: "매일 같은 시간에 사용할 수 있나요?",
        answer: "요건 충족 여부와 학교 교육과정 운영 여건을 함께 검토해 기관장의 승인을 받아야 합니다."
      }
    ],
    keywords: ["육아시간", "특별휴가", "자녀", "근무시간", "휴가"],
    changed: true,
    reviewStatus: "needs_review",
    status: "published"
  },
  {
    id: "item-concurrent-permission",
    slug: "concurrent-permission",
    title: "겸직허가 필요 여부",
    summary: "영리 업무, 계속성 있는 활동, 직무 관련성이 있는 외부 활동의 허가 필요 여부를 판단합니다.",
    categorySlug: "outside-work",
    year: 2026,
    pdfPageStart: 67,
    pdfPageEnd: 70,
    sourceLabel: "제3장 교원의 복무·징계 > 겸직·외부강의 > 겸직허가",
    originalText:
      "공무원은 직무 능률을 떨어뜨리거나 공무에 부당한 영향을 줄 우려가 있는 영리 업무에 종사할 수 없으며, 계속성이 있는 직무 외 활동은 겸직허가 대상 여부를 검토한다.",
    easyText:
      "수익이 있거나 반복되는 외부 활동이면 먼저 겸직허가가 필요한지 확인해야 합니다. 직무 관련성이 있거나 학교 업무에 영향을 줄 수 있으면 더 엄격하게 봅니다.",
    practiceNotes: ["수익 발생 여부보다 계속성, 직무 관련성, 근무시간 침해 가능성을 함께 판단합니다.", "승인 전 활동을 시작하지 않도록 안내합니다."],
    relatedForms: ["겸직허가 신청서", "활동 계획서"],
    faq: [
      {
        question: "블로그 광고 수익도 겸직인가요?",
        answer: "수익 규모, 반복성, 운영 방식에 따라 검토가 필요합니다. 계속적 영리 활동이면 허가 대상 가능성이 있습니다."
      }
    ],
    keywords: ["겸직", "겸직허가", "영리", "부업", "직무관련성"],
    changed: true,
    reviewStatus: "reviewed",
    status: "published"
  },
  {
    id: "item-outside-lecture",
    slug: "outside-lecture-report",
    title: "외부강의 신고 기준",
    summary: "외부강의, 회의, 자문 등 대가를 받는 외부 요청 활동의 신고 필요 여부를 확인합니다.",
    categorySlug: "outside-work",
    year: 2026,
    pdfPageStart: 71,
    pdfPageEnd: 75,
    sourceLabel: "제3장 교원의 복무·징계 > 겸직·외부강의 > 외부강의",
    originalText:
      "직무 관련 외부강의, 회의, 자문 등에 대가를 받는 경우 신고 대상 여부와 사례금 기준을 확인하고 정해진 절차에 따라 신고한다.",
    easyText:
      "학교 밖 기관에서 강의나 자문을 요청했고 대가가 있다면 외부강의 신고를 먼저 확인합니다. 직무 관련성이 있으면 신고 가능성이 높습니다.",
    practiceNotes: ["요청 기관, 주제, 일시, 대가, 직무 관련성을 신청서에 명확히 적습니다.", "사후 신고가 되지 않도록 요청 단계에서 안내합니다."],
    relatedForms: ["외부강의 신고서", "요청 공문 또는 의뢰서"],
    faq: [
      {
        question: "무료 강의도 신고해야 하나요?",
        answer: "대가가 없는 경우라도 기관 기준과 직무 관련성을 확인해야 하며, 출장 또는 복무 처리와 별도로 검토합니다."
      }
    ],
    keywords: ["외부강의", "신고", "사례금", "자문", "회의"],
    changed: true,
    reviewStatus: "reviewed",
    status: "published"
  },
  {
    id: "item-business-trip",
    slug: "business-trip",
    title: "출장 신청과 복무 처리",
    summary: "공무 수행을 위한 출장 신청, 복귀 보고, 근무상황 기록 기준을 확인합니다.",
    categorySlug: "attendance",
    year: 2026,
    pdfPageStart: 24,
    pdfPageEnd: 27,
    sourceLabel: "제3장 교원의 복무·징계 > 출장·조퇴·외출·지각 > 출장",
    originalText:
      "출장은 공무 수행을 위해 근무지를 벗어나는 경우 사전에 명령 또는 승인을 받아 처리하며, 일정 변경 시 기관의 기준에 따라 변경 보고한다.",
    easyText:
      "학교 밖에서 공무를 수행해야 할 때 출장으로 신청합니다. 일정, 장소, 목적이 바뀌면 승인권자에게 다시 확인해야 합니다.",
    practiceNotes: ["출장 목적과 주관 기관을 명확히 적습니다.", "개인 용무와 공무 목적이 섞이지 않도록 증빙을 분리합니다."],
    relatedForms: ["출장 신청", "출장 복명"],
    faq: [
      {
        question: "출장 중 개인 일정이 생기면 어떻게 하나요?",
        answer: "공무 수행 범위를 벗어나는 시간은 별도 복무 처리 필요 여부를 확인해야 합니다."
      }
    ],
    keywords: ["출장", "복명", "근무상황", "조퇴", "외출"],
    changed: false,
    reviewStatus: "reviewed",
    status: "published"
  },
  {
    id: "item-discipline-process",
    slug: "discipline-process",
    title: "징계 절차 기본 흐름",
    summary: "비위 사실 확인부터 징계 의결 요구, 처분 통지까지의 실무 흐름을 정리합니다.",
    categorySlug: "discipline",
    year: 2026,
    pdfPageStart: 92,
    pdfPageEnd: 99,
    sourceLabel: "제3장 교원의 복무·징계 > 징계 > 절차",
    originalText:
      "징계 사유가 있다고 인정되는 경우 사실관계 확인, 관련 자료 확보, 징계 의결 요구, 징계위원회 심의, 처분 통지 등 절차에 따라 처리한다.",
    easyText:
      "징계는 단순 민원 처리와 다릅니다. 사실 확인 자료, 당사자 소명, 의결 요구 문서, 처분 통지까지 절차별 기록을 남겨야 합니다.",
    practiceNotes: ["처분 전 사실관계와 증빙의 출처를 분리해 정리합니다.", "징계와 주의·경고 등 행정지도 성격의 조치를 혼동하지 않도록 검토합니다."],
    relatedForms: ["사실확인서", "징계 의결 요구 문서"],
    faq: [
      {
        question: "민원이 들어오면 바로 징계 절차인가요?",
        answer: "민원 제기만으로 바로 징계가 되는 것은 아니며 사실관계 확인과 관련 규정 검토가 선행됩니다."
      }
    ],
    keywords: ["징계", "징계 절차", "의결", "처분", "비위"],
    changed: false,
    reviewStatus: "reviewed",
    status: "published"
  }
];

export const changeLogs: ChangeLog[] = [
  {
    id: "change-leave",
    title: "휴가 관련 설명 검토 필요",
    summary: "병가와 육아시간 항목은 2026 지침 기준으로 원문 반영 후 쉬운 설명 재검토가 필요합니다.",
    type: "updated"
  },
  {
    id: "change-outside-work",
    title: "겸직·외부강의 항목 표시 강화",
    summary: "겸직허가와 외부강의 신고의 판단 기준을 분리해 검색 결과와 도우미에서 연결합니다.",
    type: "clarified"
  },
  {
    id: "change-forms",
    title: "서식 자동 작성 기능 추가",
    summary: "개인정보를 저장하지 않고 브라우저에서 서식 초안을 생성하는 방식으로 설계했습니다.",
    type: "added"
  }
];

export const formTemplates: FormTemplate[] = [
  {
    id: "outside-lecture-form",
    title: "외부강의 신고서",
    description: "강의 요청 기관, 주제, 일시, 사례금 정보를 바탕으로 신고서 초안을 만듭니다.",
    formType: "outside_lecture",
    fields: [
      { key: "teacherName", label: "성명", placeholder: "홍길동" },
      { key: "organization", label: "요청 기관", placeholder: "광주교육연수원" },
      { key: "topic", label: "강의 주제", placeholder: "학교 복무 실무" },
      { key: "date", label: "일시", placeholder: "2026. 6. 15. 14:00-16:00" },
      { key: "fee", label: "사례금", placeholder: "200,000원" }
    ]
  },
  {
    id: "concurrent-form",
    title: "겸직허가 신청서",
    description: "활동 내용, 기간, 보수, 직무 관련성 검토 내용을 정리합니다.",
    formType: "concurrent_permission",
    fields: [
      { key: "teacherName", label: "성명", placeholder: "홍길동" },
      { key: "activity", label: "활동 내용", placeholder: "교육 콘텐츠 원고 집필" },
      { key: "period", label: "활동 기간", placeholder: "2026. 7. 1.-2026. 12. 31." },
      { key: "reward", label: "보수", placeholder: "월 100,000원" },
      { key: "review", label: "직무 관련성 검토", placeholder: "담당 업무와 직접 관련 없음", multiline: true }
    ]
  },
  {
    id: "overseas-training-form",
    title: "국외 자율 연수 계획서",
    description: "연수 목적, 일정, 방문지, 복무 처리 계획을 정리합니다.",
    formType: "overseas_training",
    fields: [
      { key: "teacherName", label: "성명", placeholder: "홍길동" },
      { key: "country", label: "국가 및 방문지", placeholder: "일본 도쿄" },
      { key: "period", label: "연수 기간", placeholder: "2026. 8. 1.-2026. 8. 5." },
      { key: "purpose", label: "연수 목적", placeholder: "초등 교육과정 운영 사례 조사", multiline: true }
    ]
  }
];

export const decisionGuides: DecisionGuide[] = [
  {
    id: "leave",
    title: "휴가 판단 도우미",
    description: "병가, 특별휴가, 공가 등 복무 처리 전 확인할 항목을 점검합니다.",
    questions: [
      { id: "health", label: "질병·부상 등 객관적 사유가 있나요?", yesWeight: 2 },
      { id: "proof", label: "진단서, 확인서 등 증빙을 제출할 수 있나요?", yesWeight: 2 },
      { id: "long", label: "연속 또는 반복 사용으로 추가 검토가 필요한가요?", yesWeight: 1 }
    ],
    outcomes: [
      { minScore: 4, title: "가능성 있음", description: "휴가 신청 가능성이 있습니다. 증빙과 결재 기준을 함께 확인하세요.", tone: "green", relatedItemSlugs: ["sick-leave"] },
      { minScore: 2, title: "검토 필요", description: "휴가 종류와 증빙 요건을 더 확인해야 합니다.", tone: "amber", relatedItemSlugs: ["sick-leave", "parenting-time"] },
      { minScore: 0, title: "사유 확인 필요", description: "복무 담당자와 휴가 종류를 먼저 확인하세요.", tone: "gray", relatedItemSlugs: ["business-trip"] }
    ]
  },
  {
    id: "concurrent",
    title: "겸직허가 판단 도우미",
    description: "반복적 외부 활동, 수익 발생, 직무 관련성 여부를 점검합니다.",
    questions: [
      { id: "profit", label: "보수나 광고 수익 등 경제적 이익이 있나요?", yesWeight: 2 },
      { id: "repeat", label: "일회성이 아니라 계속·반복되는 활동인가요?", yesWeight: 2 },
      { id: "related", label: "교원 직무 또는 소속 학교와 관련성이 있나요?", yesWeight: 1 }
    ],
    outcomes: [
      { minScore: 4, title: "허가 필요", description: "겸직허가 신청 후 승인 여부를 확인하고 활동을 시작하세요.", tone: "red", relatedItemSlugs: ["concurrent-permission"] },
      { minScore: 2, title: "검토 필요", description: "계속성, 수익성, 직무 관련성을 정리해 관리자 검토를 받으세요.", tone: "amber", relatedItemSlugs: ["concurrent-permission"] },
      { minScore: 0, title: "가능성 낮음", description: "허가 대상 가능성은 낮지만 기관 기준에 따라 예외가 있을 수 있습니다.", tone: "green", relatedItemSlugs: ["concurrent-permission"] }
    ]
  },
  {
    id: "outside-lecture",
    title: "외부강의 신고 판단 도우미",
    description: "강의·회의·자문 요청이 신고 대상인지 확인합니다.",
    questions: [
      { id: "request", label: "외부 기관의 요청을 받은 활동인가요?", yesWeight: 1 },
      { id: "job", label: "담당 직무나 교육 전문성과 관련된 내용인가요?", yesWeight: 2 },
      { id: "fee", label: "사례금 또는 교통비 등 대가를 받나요?", yesWeight: 2 }
    ],
    outcomes: [
      { minScore: 4, title: "신고 필요", description: "외부강의 신고서를 작성하고 사례금 기준을 확인하세요.", tone: "red", relatedItemSlugs: ["outside-lecture-report"] },
      { minScore: 2, title: "검토 필요", description: "직무 관련성 또는 대가 여부가 불명확합니다. 요청 문서를 확보하세요.", tone: "amber", relatedItemSlugs: ["outside-lecture-report"] },
      { minScore: 0, title: "신고 가능성 낮음", description: "신고 대상 가능성은 낮지만 출장·복무 처리는 별도로 확인하세요.", tone: "green", relatedItemSlugs: ["business-trip"] }
    ]
  }
];

export const faqs = regulationItems.flatMap((item) =>
  item.faq.map((entry) => ({
    ...entry,
    itemTitle: item.title,
    itemSlug: item.slug
  }))
);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getRegulationItem(slug: string) {
  return regulationItems.find((item) => item.slug === slug && item.status === "published");
}

export function getItemsByCategory(slug: string) {
  return regulationItems.filter((item) => item.categorySlug === slug && item.status === "published");
}

export function searchRegulations(query: string) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return regulationItems.filter((item) => item.status === "published");
  }

  return regulationItems.filter((item) => {
    const haystack = [
      item.title,
      item.summary,
      item.sourceLabel,
      item.originalText,
      item.easyText,
      ...item.keywords
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(term);
  });
}

export function getRelatedItems(slugs: string[]) {
  return slugs
    .map((slug) => getRegulationItem(slug))
    .filter((item): item is RegulationItem => Boolean(item));
}
