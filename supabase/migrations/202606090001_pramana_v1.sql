create extension if not exists pgcrypto;

create table if not exists waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null unique,
  goal text not null,
  product_concern text not null default '',
  consent_privacy boolean not null default false,
  consent_marketing boolean not null default false,
  privacy_policy_version text not null default '2026-06-09',
  source text not null default 'pramana-ai-web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_concerns (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  category text not null default 'unknown',
  concern text not null default '',
  source text not null default 'pramana-ai-web',
  created_at timestamptz not null default now()
);

create table if not exists product_scans (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  brand text not null default '',
  category text not null default 'unknown',
  barcode text not null default '',
  ingredients_text text not null default '',
  image_metadata jsonb not null default '{}'::jsonb,
  scan_result jsonb not null default '{}'::jsonb,
  confidence numeric(4, 3) not null default 0 check (confidence >= 0 and confidence <= 1),
  source_list jsonb not null default '[]'::jsonb,
  source text not null default 'pramana-ai-web',
  created_at timestamptz not null default now()
);

create table if not exists consent_events (
  id uuid primary key default gen_random_uuid(),
  email text,
  session_id text,
  consent_type text not null,
  consent_version text not null,
  consented boolean not null default true,
  source text not null default 'pramana-ai-web',
  created_at timestamptz not null default now()
);

create table if not exists admin_audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_email text not null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table waitlist_leads enable row level security;
alter table product_concerns enable row level security;
alter table product_scans enable row level security;
alter table consent_events enable row level security;
alter table admin_audit_events enable row level security;

create index if not exists waitlist_leads_email_idx on waitlist_leads (email);
create index if not exists waitlist_leads_created_at_idx on waitlist_leads (created_at desc);
create index if not exists product_concerns_created_at_idx on product_concerns (created_at desc);
create index if not exists product_scans_created_at_idx on product_scans (created_at desc);
create index if not exists consent_events_email_idx on consent_events (email);
create index if not exists admin_audit_events_created_at_idx on admin_audit_events (created_at desc);

comment on column waitlist_leads.email is 'PII: email';
comment on column waitlist_leads.name is 'PII: name';
comment on column consent_events.email is 'PII: email';
