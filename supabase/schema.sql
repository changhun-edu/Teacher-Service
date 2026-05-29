create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.regulation_versions (
  id uuid primary key default gen_random_uuid(),
  year integer not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  effective_date date,
  pdf_path text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  slug text not null unique,
  title text not null,
  description text,
  icon text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.regulation_items (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.regulation_versions(id) on delete cascade,
  category_id uuid not null references public.categories(id),
  slug text not null,
  title text not null,
  summary text not null,
  original_text text,
  easy_text text,
  practice_notes text,
  pdf_page_start integer,
  pdf_page_end integer,
  source_label text,
  keywords text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'private')),
  review_status text not null default 'reviewed' check (review_status in ('reviewed', 'needs_review')),
  changed_from_previous boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (version_id, slug)
);

create table public.change_logs (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.regulation_versions(id) on delete cascade,
  item_id uuid references public.regulation_items(id) on delete set null,
  title text not null,
  summary text not null,
  change_type text not null check (change_type in ('added', 'updated', 'removed', 'clarified')),
  status text not null default 'published' check (status in ('draft', 'published', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (version_id, title)
);

create table public.decision_guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'private')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.decision_questions (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.decision_guides(id) on delete cascade,
  question text not null,
  help_text text,
  answer_key text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (guide_id, answer_key)
);

create table public.decision_results (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.decision_guides(id) on delete cascade,
  result_key text not null,
  title text not null,
  description text not null,
  severity text not null default 'info' check (severity in ('success', 'warning', 'danger', 'info')),
  related_item_ids uuid[] not null default '{}',
  rule jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (guide_id, result_key)
);

create table public.forms (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  form_type text not null,
  storage_path text,
  required_fields jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'private')),
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (form_type)
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category_id uuid references public.categories(id) on delete set null,
  related_item_id uuid references public.regulation_items(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'private')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (question)
);

create table public.search_logs (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  result_count integer not null default 0,
  selected_item_id uuid references public.regulation_items(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index regulation_items_title_trgm_idx on public.regulation_items using gin (title gin_trgm_ops);
create index regulation_items_summary_trgm_idx on public.regulation_items using gin (summary gin_trgm_ops);
create index regulation_items_keywords_idx on public.regulation_items using gin (keywords);
create index regulation_items_version_idx on public.regulation_items (version_id);
create index regulation_items_category_idx on public.regulation_items (category_id);
create index search_logs_created_idx on public.search_logs (created_at desc);

create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_regulation_versions_updated_at before update on public.regulation_versions for each row execute function public.set_updated_at();
create trigger set_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger set_regulation_items_updated_at before update on public.regulation_items for each row execute function public.set_updated_at();
create trigger set_change_logs_updated_at before update on public.change_logs for each row execute function public.set_updated_at();
create trigger set_decision_guides_updated_at before update on public.decision_guides for each row execute function public.set_updated_at();
create trigger set_decision_questions_updated_at before update on public.decision_questions for each row execute function public.set_updated_at();
create trigger set_decision_results_updated_at before update on public.decision_results for each row execute function public.set_updated_at();
create trigger set_forms_updated_at before update on public.forms for each row execute function public.set_updated_at();
create trigger set_faqs_updated_at before update on public.faqs for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.regulation_versions enable row level security;
alter table public.categories enable row level security;
alter table public.regulation_items enable row level security;
alter table public.change_logs enable row level security;
alter table public.decision_guides enable row level security;
alter table public.decision_questions enable row level security;
alter table public.decision_results enable row level security;
alter table public.forms enable row level security;
alter table public.faqs enable row level security;
alter table public.search_logs enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "profiles admin insert" on public.profiles for insert with check (public.is_admin());
create policy "profiles admin update" on public.profiles for update using (public.is_admin()) with check (public.is_admin());
create policy "profiles admin delete" on public.profiles for delete using (public.is_admin());

create policy "versions public published read" on public.regulation_versions for select using (status = 'published' or public.is_admin());
create policy "versions admin insert" on public.regulation_versions for insert with check (public.is_admin());
create policy "versions admin update" on public.regulation_versions for update using (public.is_admin()) with check (public.is_admin());
create policy "versions admin delete" on public.regulation_versions for delete using (public.is_admin());

create policy "categories public active read" on public.categories for select using (is_active = true or public.is_admin());
create policy "categories admin insert" on public.categories for insert with check (public.is_admin());
create policy "categories admin update" on public.categories for update using (public.is_admin()) with check (public.is_admin());
create policy "categories admin delete" on public.categories for delete using (public.is_admin());

create policy "items public published read" on public.regulation_items
for select
using (
  public.is_admin()
  or (
    status = 'published'
    and exists (
      select 1
      from public.regulation_versions v
      where v.id = version_id
        and v.status = 'published'
    )
  )
);
create policy "items admin insert" on public.regulation_items for insert with check (public.is_admin());
create policy "items admin update" on public.regulation_items for update using (public.is_admin()) with check (public.is_admin());
create policy "items admin delete" on public.regulation_items for delete using (public.is_admin());

create policy "changes public published read" on public.change_logs for select using (status = 'published' or public.is_admin());
create policy "changes admin insert" on public.change_logs for insert with check (public.is_admin());
create policy "changes admin update" on public.change_logs for update using (public.is_admin()) with check (public.is_admin());
create policy "changes admin delete" on public.change_logs for delete using (public.is_admin());

create policy "guides public published read" on public.decision_guides for select using (status = 'published' or public.is_admin());
create policy "guides admin insert" on public.decision_guides for insert with check (public.is_admin());
create policy "guides admin update" on public.decision_guides for update using (public.is_admin()) with check (public.is_admin());
create policy "guides admin delete" on public.decision_guides for delete using (public.is_admin());

create policy "questions public via published guide" on public.decision_questions
for select
using (
  public.is_admin()
  or exists (
    select 1 from public.decision_guides g
    where g.id = guide_id and g.status = 'published'
  )
);
create policy "questions admin insert" on public.decision_questions for insert with check (public.is_admin());
create policy "questions admin update" on public.decision_questions for update using (public.is_admin()) with check (public.is_admin());
create policy "questions admin delete" on public.decision_questions for delete using (public.is_admin());

create policy "results public via published guide" on public.decision_results
for select
using (
  public.is_admin()
  or exists (
    select 1 from public.decision_guides g
    where g.id = guide_id and g.status = 'published'
  )
);
create policy "results admin insert" on public.decision_results for insert with check (public.is_admin());
create policy "results admin update" on public.decision_results for update using (public.is_admin()) with check (public.is_admin());
create policy "results admin delete" on public.decision_results for delete using (public.is_admin());

create policy "forms public published read" on public.forms for select using (status = 'published' or public.is_admin());
create policy "forms admin insert" on public.forms for insert with check (public.is_admin());
create policy "forms admin update" on public.forms for update using (public.is_admin()) with check (public.is_admin());
create policy "forms admin delete" on public.forms for delete using (public.is_admin());

create policy "faqs public published read" on public.faqs for select using (status = 'published' or public.is_admin());
create policy "faqs admin insert" on public.faqs for insert with check (public.is_admin());
create policy "faqs admin update" on public.faqs for update using (public.is_admin()) with check (public.is_admin());
create policy "faqs admin delete" on public.faqs for delete using (public.is_admin());

create policy "search logs public insert" on public.search_logs
for insert
with check (user_id is null or user_id = auth.uid());
create policy "search logs admin read" on public.search_logs for select using (public.is_admin());
create policy "search logs admin delete" on public.search_logs for delete using (public.is_admin());
