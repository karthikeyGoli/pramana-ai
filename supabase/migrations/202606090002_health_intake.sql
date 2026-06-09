create extension if not exists pgcrypto;

create table if not exists health_intake_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  age_range text not null check (age_range in ('18-24', '25-34', '35-44', '45-54', '55+')),
  sex_context text not null check (sex_context in ('female', 'male', 'intersex', 'prefer-not-to-say')),
  primary_goals text[] not null default '{}',
  priority_areas text[] not null default '{}',
  skin_context text[] not null default '{}',
  hair_context text[] not null default '{}',
  nutrition_pattern text not null,
  activity_level text not null check (activity_level in ('low', 'moderate', 'active', 'athlete')),
  sleep_quality text not null check (sleep_quality in ('poor', 'mixed', 'good', 'excellent')),
  stress_level text not null check (stress_level in ('low', 'moderate', 'high', 'very-high')),
  allergies text not null default '',
  medications text not null default '',
  known_conditions text not null default '',
  cycle_context text not null default '',
  ayurveda_interest text not null check (ayurveda_interest in ('subtle', 'balanced', 'strong')),
  consent_health_intake boolean not null default false,
  consent_version text not null default '2026-06-09',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table health_intake_profiles enable row level security;

create index if not exists health_intake_profiles_user_id_idx on health_intake_profiles (user_id);
create index if not exists health_intake_profiles_updated_at_idx on health_intake_profiles (updated_at desc);

drop policy if exists "Users can read own health intake" on health_intake_profiles;
create policy "Users can read own health intake"
  on health_intake_profiles for select
  to authenticated
  using (auth.uid() = user_id);

comment on column health_intake_profiles.email is 'PII: email';
comment on column health_intake_profiles.display_name is 'PII: display_name';
comment on column health_intake_profiles.sex_context is 'HEALTH-SENSITIVE: biological context';
comment on column health_intake_profiles.allergies is 'HEALTH-SENSITIVE: allergy context';
comment on column health_intake_profiles.medications is 'HEALTH-SENSITIVE: medication context';
comment on column health_intake_profiles.known_conditions is 'HEALTH-SENSITIVE: condition context';
