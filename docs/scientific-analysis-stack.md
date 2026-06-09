# Pramana AI Scientific Analysis Stack

## Principle

Pramana should not let an LLM invent health or safety claims. The backend should:

1. collect user-consented context,
2. retrieve product, ingredient, wearable, and scientific evidence,
3. normalize it into structured records,
4. ask an LLM to explain only what the retrieved evidence supports,
5. return confidence, sources, and clear non-diagnostic language.

## Local Backend Now

Implemented for production as Vercel Functions in `api/`, with a dev-only local
server still available at `server/pramana-api.mjs`:

- `GET /api/health`
- `POST /api/waitlist`
- `POST /api/product-concerns`
- `POST /api/product-scans`
- `POST /api/health-intake`
- `GET /api/admin/summary`

Production data is stored in Supabase Postgres using the migration under
`supabase/migrations/`. Local dev-server data is stored in `server/storage/` and
ignored by git.

## API Keys / Integrations Later

Start with APIs that make Pramana useful without needing a medical partner on day one.

Priority 1:

- OpenAI or Claude for structured explanation and evidence summaries.
- Open Food Facts / Open Beauty Facts style barcode and product lookup.
- PubChem for ingredient and compound normalization.
- NCBI/PubMed and Crossref for literature retrieval.

Priority 2:

- Oura, WHOOP, Apple HealthKit, and Android Health Connect once the app has a
  real user account and consent flow.
- Haut.AI or a similar B2B skin analysis vendor once camera-based skin scoring is
  a core workflow.

Priority 3:

- Licensed contamination, lab-test, seller-authenticity, clinic, and brand data.
- Indian regulatory/product datasets and manual verification pipelines, because
  Indian market coverage will likely be uneven across global product databases.

### Product and Ingredient Data

- Open Food Facts / Open Beauty Facts: barcode lookup for food, supplement, and
  personal-care product records. Basic read APIs are public.
- PubChem PUG REST: compound properties and chemical identifiers. Good for
  normalizing ingredients into stable chemical IDs.
- openFDA: FDA food, drug, device, and enforcement datasets. Useful for recall
  and adverse-event awareness where coverage exists.
- EU CosIng: official cosmetic ingredient database; useful as an ingredient
  reference, but not a simple API-first integration.
- Clean Label Project / Consumer Reports style contamination data: likely licensing or manual data partnership.
- Indian product coverage: expect gaps. Build user submission and manual verification workflows.

### Wearables and Health Signals

- Oura API v2: sleep, readiness, activity, and ring metrics.
- WHOOP API: recovery, strain, sleep, workout, HRV, and related wearable performance data.
- Apple HealthKit: native iOS access to Health data; no simple web API key. Requires app permissions and privacy strings.
- Android Health Connect: Android permissions for sleep, exercise, HR, HRV, nutrition, hydration, skin temperature, and more.

### Skin / Image Analysis

- Haut.AI: B2B skin analysis API for beauty/skin metrics.
- Vision/OCR models: label reading, product photo interpretation, ingredient extraction.
- Use dermatologist-safe language and confidence bands.

### Scientific Retrieval

- NCBI/PubMed E-utilities: search PubMed/PMC literature. API key recommended for higher request rates.
- Semantic Scholar Academic Graph API: paper search and citation graph; API key available.
- Crossref REST API: DOI and scholarly metadata; public access with optional polite pool/API key features.
- Embeddings: store paper abstracts, ingredient notes, and internal evidence chunks for retrieval.

### LLM Reasoning Layer

Good candidates:

- Claude API: strong long-context reasoning and tool use for evidence synthesis.
- OpenAI API: structured outputs, vision, and embeddings.
- Gemini API: structured outputs and multimodal options.

MVP model recommendation:

- `gpt-4o` or current GPT-4.1/4o-class model for product-label OCR, structured
  JSON extraction, and user-facing explanations.
- `text-embedding-3-small` for low-cost retrieval first; upgrade selected
  scientific corpora to `text-embedding-3-large` if recall quality becomes a
  bottleneck.
- Claude Sonnet-class model as the second opinion model for deeper evidence
  synthesis once cost allows it.

Recommended pattern:

- Use deterministic data sources for facts.
- Use embeddings/RAG for retrieval.
- Use an LLM only for explanation, summarization, ranking, and user-friendly language.
- Always return source IDs, confidence, and "informational, not diagnosis" wording.

## Source Links Checked

- Open Food Facts API docs: https://openfoodfacts.github.io/openfoodfacts-server/api/
- PubChem PUG REST docs: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest
- openFDA API docs: https://open.fda.gov/apis/
- EU CosIng database: https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-ingredient-database_en
- Oura API v2 docs: https://cloud.ouraring.com/v2/docs
- WHOOP developer API: https://developer.whoop.com/api
- Apple HealthKit authorization: https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data
- Android Health Connect data types: https://developer.android.com/health-and-fitness/health-connect/data-types
- Haut.AI skin analysis: https://haut.ai/product/ai-skin-analysis
- NCBI developer APIs: https://www.ncbi.nlm.nih.gov/home/develop/api/
- Semantic Scholar API: https://www.semanticscholar.org/product/api
- Crossref REST API access: https://crossref.org/documentation/retrieve-metadata/rest-api/access-and-authentication/
- OpenAI Structured Outputs: https://openai.com/index/introducing-structured-outputs-in-the-api/
- OpenAI embeddings: https://openai.com/index/new-embedding-models-and-api-updates/
- Gemini structured output: https://ai.google.dev/gemini-api/docs/structured-output
- Claude structured outputs: https://platform.claude.com/docs/en/build-with-claude/structured-outputs

## First Production Backend Shape

Tables/collections:

- users
- waitlist_leads
- product_scans
- product_concerns
- user_body_signals
- wearable_daily_summaries
- skin_logs
- evidence_sources
- evidence_chunks
- generated_insights
- consent_events
- doctor_exports

Critical policies:

- explicit consent for health/wearable data,
- deletion/export flow,
- time-limited doctor share links,
- audit log for generated insights,
- no medical diagnosis claims.
