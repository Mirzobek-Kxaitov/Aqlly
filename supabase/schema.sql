create extension if not exists "pgcrypto";

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text,
  director_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.teacher_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  full_name text not null,
  subject text,
  created_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  name text not null,
  subject text,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  pin_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.class_students (
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('quiz')),
  title text not null,
  topic text,
  is_public boolean not null default false,
  content_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  host_id uuid not null references auth.users(id) on delete cascade,
  class_id uuid references public.classes(id) on delete set null,
  code text not null unique,
  status text not null default 'lobby' check (status in ('lobby', 'running', 'finished', 'cancelled')),
  started_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.schools enable row level security;
alter table public.teacher_profiles enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.class_students enable row level security;
alter table public.activities enable row level security;
alter table public.quiz_sessions enable row level security;

create policy "teachers can read own profile"
  on public.teacher_profiles for select
  using (id = auth.uid());

create policy "teachers can upsert own profile"
  on public.teacher_profiles for insert
  with check (id = auth.uid());

create policy "teachers can update own profile"
  on public.teacher_profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "teachers can manage own classes"
  on public.classes for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

create policy "teachers can manage own activities"
  on public.activities for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "teachers can manage own quiz sessions"
  on public.quiz_sessions for all
  using (host_id = auth.uid())
  with check (host_id = auth.uid());
