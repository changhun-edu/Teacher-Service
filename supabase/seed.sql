insert into public.regulation_versions (id, year, title, status, effective_date, pdf_path, published_at)
values (
  '11111111-1111-4111-8111-111111111111',
  2026,
  '2026 초등 교육공무원 인사실무 제3장 교원의 복무·징계',
  'published',
  '2026-03-01',
  'regulations/2026/2026_인사실무_제3장 교원의 복무 징계.pdf',
  now()
)
on conflict (year) do update
set title = excluded.title,
    status = excluded.status,
    effective_date = excluded.effective_date,
    pdf_path = excluded.pdf_path,
    published_at = excluded.published_at;

insert into public.categories (id, slug, title, description, icon, display_order)
values
  ('22222222-2222-4222-8222-222222222201', 'basics', '복무 기본', '근무 원칙, 복무 관리, 소속 기관장의 승인 사항', 'ClipboardCheck', 1),
  ('22222222-2222-4222-8222-222222222202', 'attendance', '출장·조퇴·외출·지각', '근무상황 신청, 출장 처리, 근태 기록', 'AlarmClockCheck', 2),
  ('22222222-2222-4222-8222-222222222203', 'leave', '휴가', '연가, 병가, 공가, 특별휴가, 육아시간', 'Umbrella', 3),
  ('22222222-2222-4222-8222-222222222204', 'outside-work', '겸직·외부강의', '겸직허가, 외부강의 신고, 사례금 확인', 'BriefcaseBusiness', 4),
  ('22222222-2222-4222-8222-222222222205', 'discipline', '징계', '징계 사유, 절차, 의결 요구, 처분 관리', 'Gavel', 5),
  ('22222222-2222-4222-8222-222222222206', 'forms', '서식·체크리스트', '신고서, 신청서, 점검표, 국외 자율 연수 서식', 'FileCheck2', 6)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    icon = excluded.icon,
    display_order = excluded.display_order;

insert into public.regulation_items (
  id, version_id, category_id, slug, title, summary, original_text, easy_text, practice_notes,
  pdf_page_start, pdf_page_end, source_label, keywords, status, review_status, changed_from_previous, published_at
)
values
  (
    '33333333-3333-4333-8333-333333333301',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222203',
    'sick-leave',
    '병가 신청 및 증빙 확인',
    '질병 또는 부상으로 직무 수행이 어려운 경우 병가 신청 가능 여부와 증빙 기준을 확인합니다.',
    '병가는 질병 또는 부상으로 직무를 수행할 수 없는 경우에 승인하며, 일정 기간 이상이거나 기관장이 필요하다고 인정하는 경우 진단서 등 증빙자료를 확인한다.',
    '아파서 수업이나 업무를 하기 어려운 때 신청합니다. 기간이 길어지거나 반복 신청되는 경우에는 진단서 등 객관적인 자료를 준비해야 합니다.',
    'NEIS 근무상황 신청 시 병가 사유와 기간을 구체적으로 적습니다. 연속 사용 또는 장기 사용은 학교 내부 결재선과 증빙 확인을 먼저 점검합니다.',
    42,
    44,
    '제3장 교원의 복무·징계 > 휴가 > 병가',
    array['병가', '질병', '진단서', '휴가', '증빙'],
    'published',
    'needs_review',
    true,
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333302',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222203',
    'parenting-time',
    '육아시간 사용 기준',
    '자녀 연령 등 요건을 충족하는 교원이 육아시간을 사용할 때 확인할 핵심 기준입니다.',
    '육아시간은 대상 자녀, 사용 가능 기간, 일 단위 사용 한도 등 관련 법령과 지침에서 정한 요건을 충족하는 경우 승인할 수 있다.',
    '대상 자녀 요건과 하루 사용 가능 시간을 확인한 뒤 신청합니다. 수업 운영과 복무 처리에 영향이 있으므로 사전 협의가 중요합니다.',
    '담임, 전담, 보직 여부에 따라 수업 대체와 업무 공백을 먼저 확인합니다.',
    51,
    53,
    '제3장 교원의 복무·징계 > 휴가 > 특별휴가',
    array['육아시간', '특별휴가', '자녀', '근무시간', '휴가'],
    'published',
    'needs_review',
    true,
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333303',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222204',
    'concurrent-permission',
    '겸직허가 필요 여부',
    '영리 업무, 계속성 있는 활동, 직무 관련성이 있는 외부 활동의 허가 필요 여부를 판단합니다.',
    '공무원은 직무 능률을 떨어뜨리거나 공무에 부당한 영향을 줄 우려가 있는 영리 업무에 종사할 수 없으며, 계속성이 있는 직무 외 활동은 겸직허가 대상 여부를 검토한다.',
    '수익이 있거나 반복되는 외부 활동이면 먼저 겸직허가가 필요한지 확인해야 합니다. 직무 관련성이 있거나 학교 업무에 영향을 줄 수 있으면 더 엄격하게 봅니다.',
    '수익 발생 여부보다 계속성, 직무 관련성, 근무시간 침해 가능성을 함께 판단합니다.',
    67,
    70,
    '제3장 교원의 복무·징계 > 겸직·외부강의 > 겸직허가',
    array['겸직', '겸직허가', '영리', '부업', '직무관련성'],
    'published',
    'reviewed',
    true,
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333304',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222204',
    'outside-lecture-report',
    '외부강의 신고 기준',
    '외부강의, 회의, 자문 등 대가를 받는 외부 요청 활동의 신고 필요 여부를 확인합니다.',
    '직무 관련 외부강의, 회의, 자문 등에 대가를 받는 경우 신고 대상 여부와 사례금 기준을 확인하고 정해진 절차에 따라 신고한다.',
    '학교 밖 기관에서 강의나 자문을 요청했고 대가가 있다면 외부강의 신고를 먼저 확인합니다. 직무 관련성이 있으면 신고 가능성이 높습니다.',
    '요청 기관, 주제, 일시, 대가, 직무 관련성을 신청서에 명확히 적습니다.',
    71,
    75,
    '제3장 교원의 복무·징계 > 겸직·외부강의 > 외부강의',
    array['외부강의', '신고', '사례금', '자문', '회의'],
    'published',
    'reviewed',
    true,
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333305',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222202',
    'business-trip',
    '출장 신청과 복무 처리',
    '공무 수행을 위한 출장 신청, 복귀 보고, 근무상황 기록 기준을 확인합니다.',
    '출장은 공무 수행을 위해 근무지를 벗어나는 경우 사전에 명령 또는 승인을 받아 처리하며, 일정 변경 시 기관의 기준에 따라 변경 보고한다.',
    '학교 밖에서 공무를 수행해야 할 때 출장으로 신청합니다. 일정, 장소, 목적이 바뀌면 승인권자에게 다시 확인해야 합니다.',
    '출장 목적과 주관 기관을 명확히 적습니다.',
    24,
    27,
    '제3장 교원의 복무·징계 > 출장·조퇴·외출·지각 > 출장',
    array['출장', '복명', '근무상황', '조퇴', '외출'],
    'published',
    'reviewed',
    false,
    now()
  ),
  (
    '33333333-3333-4333-8333-333333333306',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222205',
    'discipline-process',
    '징계 절차 기본 흐름',
    '비위 사실 확인부터 징계 의결 요구, 처분 통지까지의 실무 흐름을 정리합니다.',
    '징계 사유가 있다고 인정되는 경우 사실관계 확인, 관련 자료 확보, 징계 의결 요구, 징계위원회 심의, 처분 통지 등 절차에 따라 처리한다.',
    '징계는 단순 민원 처리와 다릅니다. 사실 확인 자료, 당사자 소명, 의결 요구 문서, 처분 통지까지 절차별 기록을 남겨야 합니다.',
    '처분 전 사실관계와 증빙의 출처를 분리해 정리합니다.',
    92,
    99,
    '제3장 교원의 복무·징계 > 징계 > 절차',
    array['징계', '징계 절차', '의결', '처분', '비위'],
    'published',
    'reviewed',
    false,
    now()
  )
on conflict (version_id, slug) do update
set title = excluded.title,
    summary = excluded.summary,
    original_text = excluded.original_text,
    easy_text = excluded.easy_text,
    practice_notes = excluded.practice_notes,
    pdf_page_start = excluded.pdf_page_start,
    pdf_page_end = excluded.pdf_page_end,
    source_label = excluded.source_label,
    keywords = excluded.keywords,
    status = excluded.status,
    review_status = excluded.review_status,
    changed_from_previous = excluded.changed_from_previous,
    published_at = excluded.published_at;

insert into public.change_logs (version_id, item_id, title, summary, change_type, status)
values
  ('11111111-1111-4111-8111-111111111111', '33333333-3333-4333-8333-333333333301', '휴가 관련 설명 검토 필요', '병가와 육아시간 항목은 2026 지침 기준으로 원문 반영 후 쉬운 설명 재검토가 필요합니다.', 'updated', 'published'),
  ('11111111-1111-4111-8111-111111111111', '33333333-3333-4333-8333-333333333303', '겸직·외부강의 항목 표시 강화', '겸직허가와 외부강의 신고의 판단 기준을 분리해 검색 결과와 도우미에서 연결합니다.', 'clarified', 'published'),
  ('11111111-1111-4111-8111-111111111111', null, '서식 자동 작성 기능 추가', '개인정보를 저장하지 않고 브라우저에서 서식 초안을 생성하는 방식으로 설계했습니다.', 'added', 'published')
on conflict (version_id, title) do update
set item_id = excluded.item_id,
    summary = excluded.summary,
    change_type = excluded.change_type,
    status = excluded.status;

insert into public.decision_guides (id, slug, title, description, status, display_order)
values
  ('44444444-4444-4444-8444-444444444401', 'leave', '휴가 판단 도우미', '병가, 특별휴가, 공가 등 복무 처리 전 확인할 항목을 점검합니다.', 'published', 1),
  ('44444444-4444-4444-8444-444444444402', 'concurrent', '겸직허가 판단 도우미', '반복적 외부 활동, 수익 발생, 직무 관련성 여부를 점검합니다.', 'published', 2),
  ('44444444-4444-4444-8444-444444444403', 'outside-lecture', '외부강의 신고 판단 도우미', '강의·회의·자문 요청이 신고 대상인지 확인합니다.', 'published', 3)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    status = excluded.status,
    display_order = excluded.display_order;

insert into public.decision_questions (guide_id, question, help_text, answer_key, display_order)
values
  ('44444444-4444-4444-8444-444444444401', '질병·부상 등 객관적 사유가 있나요?', null, 'health', 1),
  ('44444444-4444-4444-8444-444444444401', '진단서, 확인서 등 증빙을 제출할 수 있나요?', null, 'proof', 2),
  ('44444444-4444-4444-8444-444444444401', '연속 또는 반복 사용으로 추가 검토가 필요한가요?', null, 'long', 3),
  ('44444444-4444-4444-8444-444444444402', '보수나 광고 수익 등 경제적 이익이 있나요?', null, 'profit', 1),
  ('44444444-4444-4444-8444-444444444402', '일회성이 아니라 계속·반복되는 활동인가요?', null, 'repeat', 2),
  ('44444444-4444-4444-8444-444444444402', '교원 직무 또는 소속 학교와 관련성이 있나요?', null, 'related', 3),
  ('44444444-4444-4444-8444-444444444403', '외부 기관의 요청을 받은 활동인가요?', null, 'request', 1),
  ('44444444-4444-4444-8444-444444444403', '담당 직무나 교육 전문성과 관련된 내용인가요?', null, 'job', 2),
  ('44444444-4444-4444-8444-444444444403', '사례금 또는 교통비 등 대가를 받나요?', null, 'fee', 3)
on conflict (guide_id, answer_key) do update
set question = excluded.question,
    help_text = excluded.help_text,
    display_order = excluded.display_order;

insert into public.decision_results (guide_id, result_key, title, description, severity, related_item_ids, rule)
values
  ('44444444-4444-4444-8444-444444444401', 'leave_possible', '가능성 있음', '휴가 신청 가능성이 있습니다. 증빙과 결재 기준을 함께 확인하세요.', 'success', array['33333333-3333-4333-8333-333333333301']::uuid[], '{"minScore":4}'::jsonb),
  ('44444444-4444-4444-8444-444444444401', 'leave_review', '검토 필요', '휴가 종류와 증빙 요건을 더 확인해야 합니다.', 'warning', array['33333333-3333-4333-8333-333333333301','33333333-3333-4333-8333-333333333302']::uuid[], '{"minScore":2}'::jsonb),
  ('44444444-4444-4444-8444-444444444402', 'concurrent_permission', '허가 필요', '겸직허가 신청 후 승인 여부를 확인하고 활동을 시작하세요.', 'danger', array['33333333-3333-4333-8333-333333333303']::uuid[], '{"minScore":4}'::jsonb),
  ('44444444-4444-4444-8444-444444444402', 'concurrent_review', '검토 필요', '계속성, 수익성, 직무 관련성을 정리해 관리자 검토를 받으세요.', 'warning', array['33333333-3333-4333-8333-333333333303']::uuid[], '{"minScore":2}'::jsonb),
  ('44444444-4444-4444-8444-444444444403', 'lecture_report', '신고 필요', '외부강의 신고서를 작성하고 사례금 기준을 확인하세요.', 'danger', array['33333333-3333-4333-8333-333333333304']::uuid[], '{"minScore":4}'::jsonb),
  ('44444444-4444-4444-8444-444444444403', 'lecture_review', '검토 필요', '직무 관련성 또는 대가 여부가 불명확합니다. 요청 문서를 확보하세요.', 'warning', array['33333333-3333-4333-8333-333333333304']::uuid[], '{"minScore":2}'::jsonb)
on conflict (guide_id, result_key) do update
set title = excluded.title,
    description = excluded.description,
    severity = excluded.severity,
    related_item_ids = excluded.related_item_ids,
    rule = excluded.rule;

insert into public.forms (title, description, form_type, required_fields, status)
values
  ('외부강의 신고서', '강의 요청 기관, 주제, 일시, 사례금 정보를 바탕으로 신고서 초안을 만듭니다.', 'outside_lecture', '[{"key":"teacherName","label":"성명"},{"key":"organization","label":"요청 기관"},{"key":"topic","label":"강의 주제"},{"key":"date","label":"일시"},{"key":"fee","label":"사례금"}]', 'published'),
  ('겸직허가 신청서', '활동 내용, 기간, 보수, 직무 관련성 검토 내용을 정리합니다.', 'concurrent_permission', '[{"key":"teacherName","label":"성명"},{"key":"activity","label":"활동 내용"},{"key":"period","label":"활동 기간"},{"key":"reward","label":"보수"},{"key":"review","label":"직무 관련성 검토"}]', 'published'),
  ('국외 자율 연수 계획서', '연수 목적, 일정, 방문지, 복무 처리 계획을 정리합니다.', 'overseas_training', '[{"key":"teacherName","label":"성명"},{"key":"country","label":"국가 및 방문지"},{"key":"period","label":"연수 기간"},{"key":"purpose","label":"연수 목적"}]', 'published')
on conflict (form_type) do update
set title = excluded.title,
    description = excluded.description,
    required_fields = excluded.required_fields,
    status = excluded.status;

insert into public.faqs (question, answer, category_id, related_item_id, status, display_order)
values
  ('반나절 병가도 가능한가요?', '기관의 복무 처리 기준에 따라 시간 단위 입력 가능 여부를 확인하고, 학교 결재 기준에 맞춰 신청합니다.', '22222222-2222-4222-8222-222222222203', '33333333-3333-4333-8333-333333333301', 'published', 1),
  ('블로그 광고 수익도 겸직인가요?', '수익 규모, 반복성, 운영 방식에 따라 검토가 필요합니다. 계속적 영리 활동이면 허가 대상 가능성이 있습니다.', '22222222-2222-4222-8222-222222222204', '33333333-3333-4333-8333-333333333303', 'published', 2),
  ('민원이 들어오면 바로 징계 절차인가요?', '민원 제기만으로 바로 징계가 되는 것은 아니며 사실관계 확인과 관련 규정 검토가 선행됩니다.', '22222222-2222-4222-8222-222222222205', '33333333-3333-4333-8333-333333333306', 'published', 3)
on conflict (question) do update
set answer = excluded.answer,
    category_id = excluded.category_id,
    related_item_id = excluded.related_item_id,
    status = excluded.status,
    display_order = excluded.display_order;
