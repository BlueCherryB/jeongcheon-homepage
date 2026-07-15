# CMS Architecture for Sanity Integration

This document defines the target CMS architecture for integrating Sanity into the Jeongcheon Law Office website. It is intentionally a planning document: no Sanity package, Studio, environment variable, route, or runtime behavior is introduced by this task.

## Current State

The website currently uses local TypeScript content for case studies.

Relevant files:

- `src/data/cases.ts`: canonical local case-study data and related TypeScript types.
- `src/lib/cases.ts`: case filtering, sorting, pagination helpers, slug lookup, related-case lookup.
- `src/components/home/CasesSection.tsx`: homepage case preview section, now receiving featured case studies from the application content API.
- `src/components/home/CaseStudyCard.tsx`: shared preview and board card UI, typed against the small display fields it renders.
- `src/app/cases/page.tsx`: case board page, now reads list data from the application content API and uses `src/lib/cases.ts` filtering and pagination helpers.
- `src/components/cases/CaseStudyList.tsx`: board list wrapper around `CaseStudyCard`.
- `src/app/cases/[slug]/page.tsx`: detail page, static params, per-page metadata, related cases, and Article JSON-LD now read from the application content API.
- `src/components/cases/CaseDetailHero.tsx`: detail-page hero typed against application-facing detail content.
- `src/components/cases/CaseDetailSection.tsx`: repeated detail content sections.
- `src/components/cases/PortableTextContent.tsx`: minimal Portable Text renderer for case detail paragraphs and list-style issue blocks.
- `src/app/layout.tsx`: root metadata fallback.
- `src/app/attorney/page.tsx`: existing Person JSON-LD pattern and metadata pattern.

Current case-study fields:

- `slug`
- `categoryId`
- `categoryLabel`
- `title`
- `summary`
- `publishedAt`
- `displayDate`
- `result`
- `resultDetail`
- `overview`
- `issues`
- `strategy`
- `outcome`
- `keywords`
- `relatedPracticeIds`
- `relatedCaseSlugs`
- `featured`

Current SEO and structured data:

- `/cases` has static metadata in `src/app/cases/page.tsx`.
- `/cases/[slug]` has `generateMetadata` using title, summary, keywords, category, and published date.
- `/cases/[slug]` renders Article JSON-LD inline.
- `/attorney` renders Person JSON-LD inline.
- Sitemap generation is mentioned in `docs/architecture.md`, but no sitemap file is currently implemented.

Current image handling:

- Case board/detail currently do not use actual case images. `CaseDetailHero` includes a decorative placeholder block.
- Other pages use public images and `next/image`.
- `next.config.ts` does not yet allow remote Sanity image domains.

Current coupling:

- UI components import `CaseStudy` directly from `src/data/cases.ts`.
- Pages import local data directly in some places, especially `src/app/cases/[slug]/page.tsx`.
- Metadata and JSON-LD logic are close to page files rather than centralized.

## Target Architecture

Sanity should be treated as the content authoring system, not as a UI dependency. UI components should receive application-facing domain objects and should not import Sanity clients, GROQ strings, raw Sanity documents, or Sanity image references.

## Finalized Initial Sanity Decisions

- Sanity Studio will live in this repository as an independent app at `studio/`.
- The root project remains the Next.js website.
- Do not embed Studio inside the App Router.
- Do not create `src/app/studio`.
- Do not introduce Turborepo, Nx, pnpm workspaces, or npm workspaces for the initial setup.
- The planned Sanity display name is `Jeongcheon Law Office`.
- The generated Sanity project ID must not be invented. Use `<SANITY_PROJECT_ID>` in examples.
- Use one initial dataset: `production`.
- Use a public dataset for published website content.
- Published website reads should not require a token initially.
- Future preview may use a server-only read token for draft access.

Planned repository boundary:

```text
jeongcheon-homepage/
  src/       Next.js website source
  public/    website public assets
  docs/      architecture and migration documentation
  studio/    independent Sanity Studio app, created in Task #021
  package.json
```

The `studio/` directory should have its own `package.json`, development command, build command, schemas, and desk structure. The website should contain CMS query and mapping layers, but not the Studio UI.

Recommended data flow:

```text
environment variables
  -> src/lib/cms/env.ts
  -> src/lib/cms/client.ts
  -> src/lib/cms/queries/caseStudies.ts
  -> src/lib/cms/caseStudies.ts
  -> src/lib/content/caseStudyMappers.ts
  -> src/lib/content/caseStudies.ts
  -> src/types/content/caseStudy.ts
  -> future app routes and server components
  -> future UI components
```

Recommended separation:

- Sanity CMS: stores raw documents and assets.
- Content query layer: owns Sanity client setup and GROQ queries.
- Application data model: stable TypeScript objects used by routes and components.
- UI components: render props only; no CMS knowledge.
- SEO and structured data: use normalized domain types through shared helpers.

## Recommended Directory Structure

Initial implementation should be small and case-study focused:

```text
src/
  lib/
    cms/
      sanity-client.ts
      sanity-image.ts
      queries/
        cases.ts
    content/
      cases.ts
      case-mappers.ts
      seo.ts
      structured-data.ts
  types/
    content/
      case.ts
      seo.ts
      image.ts
```

Responsibilities:

- `src/lib/cms/sanity-client.ts`: creates the Sanity client using environment variables. Server-only unless a future preview client is explicitly needed.
- `src/lib/cms/sanity-image.ts`: converts Sanity image assets into URLs with width, quality, crop, and hotspot support.
- `src/lib/cms/queries/cases.ts`: stores GROQ queries and raw query result types for case studies.
- `src/lib/content/cases.ts`: application-level case-study functions such as `getCaseStudies()` and `getCaseStudyBySlug()`.
- `src/lib/content/case-mappers.ts`: maps raw Sanity documents into domain types.
- `src/lib/content/seo.ts`: central helpers for Next.js Metadata generation from CMS/domain SEO fields.
- `src/lib/content/structured-data.ts`: central JSON-LD builders.
- `src/types/content/case.ts`: application-facing case-study types.
- `src/types/content/seo.ts`: shared SEO fields.
- `src/types/content/image.ts`: normalized image fields.

Avoid adding all folders at once if they are empty. Create them when each task needs them. The `studio/` directory was created by Task #021.

Implemented low-level CMS read layer in Task #025:

- `src/lib/cms/client.ts`: creates the published-only Sanity client.
- `src/lib/cms/queries/caseStudies.ts`: stores static GROQ query strings for Case Studies.
- `src/lib/cms/caseStudies.ts`: exposes low-level raw CMS fetch functions.
- `src/lib/cms/types/caseStudy.ts`: stores raw projected CMS response types.

The Task #025 client uses `@sanity/client` directly with `useCdn: true`, `perspective: "published"`, and no token. The slug detail query uses GROQ parameters instead of string interpolation. No current page or component imports this layer yet.

Implemented application content boundary in Task #026:

- `src/types/content/caseStudy.ts`: defines application-facing Case Study list/detail, image, SEO, Portable Text, and category types.
- `src/lib/content/caseStudyMappers.ts`: maps raw Sanity query results into application-facing Case Study objects.
- `src/lib/content/caseStudies.ts`: exposes application-level read functions that wrap the low-level CMS fetch layer.

The mapper is the only place where raw CMS field names should be translated into website content names. In particular, the Sanity field `legalIssues` maps to the application field `issues`. Single-record mappers throw a descriptive `CaseStudyMappingError` for unusable records. Collection mappers skip records with mapping errors so one malformed CMS document does not break an entire listing.

Current pages, components, and local data remain unchanged. They should not import raw Sanity response types directly.

Implemented local fallback in Task #027:

- `src/lib/content/localCaseStudies.ts`: adapts existing local Case Study data to the application content types.
- `src/lib/content/caseStudies.ts`: reads Sanity first, then falls back to local content when Sanity is empty, missing a detail record, or unavailable.

Sanity content takes priority when valid CMS records exist. Slug lists combine Sanity and local slugs, with Sanity slugs first and duplicates removed. The local adapter is temporary migration support and does not replace the existing local data source.

Implemented homepage preview integration in Task #028:

- `src/app/page.tsx`: fetches `getFeaturedCaseStudies()` in the server component and limits the homepage preview to five items.
- `src/components/home/CasesSection.tsx`: renders case studies passed from the page instead of reading local homepage data.

The local fallback still protects the homepage while the Sanity dataset is empty. At this stage, the `/cases` board and `/cases/[slug]` detail pages still used local data and were planned for later tasks.

Implemented case board integration in Task #029:

- `src/app/cases/page.tsx`: fetches `getCaseStudies()` in the server page before applying category filtering and pagination.
- `src/lib/cases.ts`: filtering, latest sorting, category parsing, and pagination helpers accept application-facing Case Study list items.
- `src/components/cases/CaseStudyList.tsx`: renders application-facing display items through the shared `CaseStudyCard`.

The local fallback still protects the board while the Sanity dataset is empty. The `/cases/[slug]` detail pages still use local data and are planned for Task #030.

Implemented case detail integration in Task #030:

- `src/app/cases/[slug]/page.tsx`: uses `getCaseStudySlugs()` for static params and `getCaseStudyBySlug()` for detail records.
- `src/components/cases/CaseDetailContent.tsx`: renders normalized application detail fields.
- `src/components/cases/PortableTextContent.tsx`: safely renders supported Portable Text blocks without adding a dependency.
- `src/lib/cases.ts`: adds related-case lookup for application list items while preserving existing local helpers used elsewhere.

The detail route now renders `overview`, `issues`, `response`, and `outcome` from application-facing content. Local fallback still protects current slugs while Sanity is empty or unavailable. Raw Sanity types remain isolated from route and UI code.

## Query Layer Design

Future page and section code should depend on application-level functions:

```ts
getFeaturedCaseStudies(limit?: number): Promise<CaseStudySummary[]>
getCaseStudies(input?: CaseStudyListInput): Promise<CaseStudyListResult>
getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null>
getCaseStudySlugs(): Promise<string[]>
getRelatedCaseStudies(slugs: string[]): Promise<CaseStudySummary[]>
```

Rules:

- Apply website visibility filters in the content layer, not in UI components.
- Sort by `displayOrder` first when present, then `publishedAt` descending.
- Return `null` for a missing detail page item and let the route call `notFound()`.
- Return empty arrays for empty lists.
- Preserve existing slugs and URLs.
- Keep pagination and category parsing in application code, but base them on normalized domain values.

## Rendering and Caching Strategy

Recommended initial strategy:

- Homepage case preview: static rendering with time-based revalidation.
- Case board: server-rendered route or statically rendered route with time-based revalidation, depending on how Next.js 16 handles search params during implementation.
- Case detail pages: static generation from `getCaseStudySlugs()` with time-based revalidation.

Suggested revalidation window:

- 1 hour to 6 hours for initial CMS integration.
- A law-office site is expected to publish infrequently, so immediate webhook invalidation is not required at first.

Avoid for the initial implementation:

- Vercel-only storage, databases, queues, or cron jobs.
- Webhook-based on-demand revalidation.
- Preview mode.

Optional future improvements:

- Draft preview using a server-only Sanity token.
- On-demand revalidation through a portable API endpoint or platform-specific adapter.
- A separate development dataset only if schema experimentation or isolated content testing becomes necessary.

## Image Strategy

Sanity image assets should remain raw only in the CMS/query layer. UI components should receive normalized image data:

```ts
type CmsImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  blurDataURL?: string;
};
```

Guidelines:

- Store `alt` text as a required content field for meaningful images.
- Store captions as optional.
- Support Sanity hotspot and crop through the URL builder.
- Generate image URLs with explicit width and quality.
- Use `next/image` in UI components.
- Add Sanity's image CDN host to `next.config.ts` only when image integration starts.
- Keep the design portable for Vercel and Cloudflare by using standard HTTPS image URLs.

## SEO and Structured Data

CMS content should feed centralized SEO helpers:

- Page title
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter metadata
- JSON-LD
- Sitemap entries

Recommended helpers:

- `buildCaseStudyMetadata(caseStudy)`
- `buildCaseStudyArticleJsonLd(caseStudy)`
- `buildBreadcrumbJsonLd(items)`
- `buildSitemapEntries()`

Case-study structured data should stay conservative. Use Article-style structured data for case summaries. Do not invent unsupported legal claims, ratings, guarantees, or outcome promises.

## Security and Environment Variables

Task #024 establishes the provider-neutral environment contract for future website integration. The current website does not import this configuration yet, so existing pages and builds do not require Sanity variables until the Sanity client/query layer is introduced.

Committed example file:

- `.env.example`

Future website public variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: public Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET`: public dataset name.
- `NEXT_PUBLIC_SANITY_API_VERSION`: fixed Sanity API version.

Future website server-only variable:

- `SANITY_API_READ_TOKEN`: optional read token reserved for preview and draft reads.

Fixed API version:

- `2025-02-19`

The API version is date-based and intentionally fixed. Do not use `latest`, `today`, or a runtime-generated date because those values can change query behavior without a code review.

Runtime configuration module:

- `src/lib/cms/env.ts`

This module validates and exports only browser-safe public values. It does not read or export `SANITY_API_READ_TOKEN`, so the token cannot accidentally enter a public configuration object.

Public published-content policy:

- Should not need a token for published public content if Sanity dataset visibility allows CDN reads.
- Should read only published documents.
- Should use the Sanity CDN where appropriate.
- Should use the minimum read capability needed.
- Should not expose write tokens.

Future preview and draft policy:

- Preview reads must run server-side only.
- Preview reads may use `SANITY_API_READ_TOKEN`.
- Preview reads should disable CDN caching when draft visibility is required.
- The token must never be committed, logged, or prefixed with `NEXT_PUBLIC_`.
- Prefer a read-only viewer token with the minimum required permissions.

CORS:

- Allow local development origin.
- Allow production site origin.
- Do not broadly allow arbitrary origins unless Sanity configuration requires it for public CDN reads.

Datasets:

- Start with `production` only.
- Add a `development` dataset later only if schema experimentation or isolated content testing becomes necessary.
- Do not hard-code dataset names in UI components.

Studio:

- Studio authentication should be handled by Sanity.
- Website deployment should not require Studio credentials.
- Studio remains configured through `studio/sanity.config.ts` and `studio/sanity.cli.ts` with project ID `20zyfjea` and dataset `production`.
- Do not add `SANITY_STUDIO_*` variables unless a later Studio deployment task requires them.

Deployment providers:

- Local development should use `.env.local`, which is ignored by Git.
- Vercel should receive the same variables through project environment settings.
- Cloudflare should receive the same variables through build/runtime environment settings.
- Do not add provider-specific environment names for the initial integration.

## Cloudflare Portability

Keep the integration portable by:

- Using standard Next.js server APIs where possible.
- Avoiding Vercel-only Blob, KV, databases, cron, and queue products.
- Avoiding reliance on Vercel-only revalidation as the first strategy.
- Using Sanity's standard HTTPS API/CDN.
- Keeping environment variable names platform-neutral.

## Content Privacy Rule

Sanity must contain only content approved for public website publication.

Do not store:

- Client names unless explicitly approved for publication.
- Personally identifiable client information.
- Resident registration numbers.
- Client phone numbers.
- Private evidence.
- Internal case files.
- Unredacted court documents.
- Confidential legal strategy.
- Attorney-client privileged material.

Case-study content must be anonymized and reviewed before publication.
