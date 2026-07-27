-- ============================================================================
-- Site oussamaabassi.com — schéma des leads et du chatbot
-- À exécuter dans l'éditeur SQL du projet Supabase boebkjuohvrgjeylluhx.
-- Idempotent : peut être rejoué sans risque.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. Leads — le formulaire ET le chatbot convergent ici
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  source        text not null check (source in ('form', 'chat')),
  locale        text not null default 'fr' check (locale in ('fr', 'en')),
  name          text not null,
  email         text not null,
  company       text,
  project_type  text,
  budget_range  text,
  message       text,
  status        text not null default 'new'
                check (status in ('new', 'partial', 'read', 'replied', 'archived')),
  email_sent    boolean not null default false,
  email_error   text,
  referrer      text,
  utm           jsonb,
  ip_hash       text,   -- SHA-256 salé. L'IP en clair n'est jamais stockée (RGPD).
  user_agent    text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_status_idx     on public.leads (status);

-- ----------------------------------------------------------------------------
-- 2. Sessions de chat
-- ----------------------------------------------------------------------------
create table if not exists public.chat_sessions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  locale      text not null default 'fr' check (locale in ('fr', 'en')),
  lead_id     uuid references public.leads(id) on delete set null,
  step        text not null default 'greeting',
  completed   boolean not null default false,
  llm_calls   integer not null default 0,
  referrer    text,
  utm         jsonb
);

create index if not exists chat_sessions_created_at_idx on public.chat_sessions (created_at desc);

-- ----------------------------------------------------------------------------
-- 3. Messages
-- ----------------------------------------------------------------------------
create table if not exists public.chat_messages (
  id          bigserial primary key,
  session_id  uuid not null references public.chat_sessions(id) on delete cascade,
  created_at  timestamptz not null default now(),
  role        text not null check (role in ('bot', 'user', 'llm')),
  step_key    text,
  content     text not null
);

create index if not exists chat_messages_session_idx on public.chat_messages (session_id, created_at);

-- ----------------------------------------------------------------------------
-- 4. Sécurité
--    RLS activé, AUCUNE policy pour anon ni authenticated.
--    Toutes les écritures passent par les Server Actions et les route handlers
--    Next.js, avec la clé service_role qui contourne RLS côté serveur.
--    Conséquence : même si la clé publishable fuite, la base reste fermée.
-- ----------------------------------------------------------------------------
alter table public.leads          enable row level security;
alter table public.chat_sessions  enable row level security;
alter table public.chat_messages  enable row level security;

revoke all on public.leads         from anon, authenticated;
revoke all on public.chat_sessions from anon, authenticated;
revoke all on public.chat_messages from anon, authenticated;

-- ----------------------------------------------------------------------------
-- 5. Vue de lecture rapide pour la boîte de réception
-- ----------------------------------------------------------------------------
create or replace view public.leads_inbox as
select
  id,
  created_at,
  source,
  status,
  name,
  email,
  company,
  project_type,
  budget_range,
  left(coalesce(message, ''), 160) as extrait,
  email_sent
from public.leads
order by created_at desc;
