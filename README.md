# Pramana AI

An anti-fake body intelligence platform for beauty, supplements, wellness products,
skin context, fitness, nutrition, hair, sleep, and subtle Indian wellness signals.

Tagline: **Validate Before You Trust**.

## Current Build

- Interactive scan demo for beauty, supplement, and Ayurveda-inspired products
- Production-ready waitlist capture through `/api/waitlist`
- Product concern and demo scan capture through Vercel API routes
- Supabase migration for waitlist, scans, consent, health intake, and admin audit tables
- Premium `/auth` signup/login with consent-led health intake questionnaire
- Pramana AI landing page with premium anti-fake positioning
- Demo dashboard for connected body signals
- Privacy and terms pages with non-diagnostic positioning

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Backend Notes

Production uses Vercel Functions in `api/` and Supabase Postgres. The old local
Node server is still available for lightweight development checks:

```bash
npm run api
```

The API runs on [http://127.0.0.1:8787](http://127.0.0.1:8787) and supports:

- `GET /api/health`
- `POST /api/waitlist`
- `POST /api/product-concerns`
- `POST /api/product-scans`
- `POST /api/health-intake`
- `GET /api/admin/summary`

For production, configure these in Vercel environment variables:

```bash
PUBLIC_SITE_URL=https://your-domain.example
ALLOWED_ORIGINS=https://your-domain.example,https://your-vercel-preview.vercel.app
ADMIN_EMAILS=founder@example.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
SENTRY_DSN=https://example@sentry.io/project
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SENTRY_DSN=https://example@sentry.io/project
VITE_PUBLIC_CONTACT_EMAIL=hello@your-domain.example
```

Run both Supabase migrations in `supabase/migrations/` before deploying the
production API routes.

In Supabase Auth, enable email/password signups and add your Vercel production
and preview URLs to the redirect allowlist so email confirmation returns to
`/auth`.

Admin summary requires a Supabase Auth bearer token whose user email is included
in `ADMIN_EMAILS`.

## Production Checklist

```bash
npm run typecheck
npm run build
npm run audit:prod
```

Then connect the repo to Vercel, set build command `npm run build`, output
directory `dist`, and add the environment variables above. Vercel preview
deployments should be used for smoke testing before production promotion.

Future integrations can include barcode/product data, ingredient databases,
seller authenticity checks, skin analysis APIs, wearable APIs, scientific
retrieval, and curated Ayurveda/prakriti context.

See [docs/scientific-analysis-stack.md](docs/scientific-analysis-stack.md) for
the planned APIs, model layer, and evidence-first backend architecture.
