# CMS Migration Plan

This document plans the migration from local TypeScript case-study data to Sanity. It does not perform the migration.

## Existing Data Audit

Current source:

- `src/data/cases.ts`

Current consumers:

- `src/lib/cases.ts`
- `src/components/home/CasesSection.tsx`
- `src/components/home/CaseStudyCard.tsx`
- `src/app/cases/page.tsx`
- `src/app/cases/[slug]/page.tsx`
- `src/components/cases/CaseStudyList.tsx`
- `src/components/cases/CaseDetailHero.tsx`
- `src/components/cases/CaseDetailSection.tsx`
- `src/app/attorney/page.tsx` through representative case lookup

Current routes to preserve:

- `/cases`
- `/cases/[slug]`

Existing data quality notes:

- Slugs already exist and should become canonical CMS slugs.
- Dates are stored as both `publishedAt` and `displayDate`; Sanity should store one date and the application should derive display formatting.
- Detail sections are arrays of strings locally. CMS-backed long-form sections should migrate to Portable Text without a runtime `string[]` fallback.
- Case detail currently has no real case image.
- Related practice IDs are strings and may later become references.
- Related case links are slugs and should become references when migrated.

## Field Mapping

| Local field | Sanity field | Notes |
| --- | --- | --- |
| `slug` | `slug.current` | Preserve exactly. |
| `categoryId` | `category` | Keep enum initially. |
| `categoryLabel` | derived | Derive from category in app or store read-only label only if editors need it. |
| `title` | `title` | Preserve. |
| `summary` | `summary` | Preserve; validate length. |
| `publishedAt` | `publishedAt` | Store ISO datetime/date. |
| `displayDate` | derived | Remove from CMS; format in app. |
| `result` | `result` | Preserve. |
| `resultDetail` | `resultDetail` | Preserve. |
| `overview` | `overview` | Convert string array to Portable Text paragraphs. |
| `issues` | `issues` | Convert to Portable Text. |
| `strategy` | `response` | Rename to clearer CMS field. |
| `outcome` | `outcome` | Convert string array to Portable Text paragraphs. |
| `keywords` | `keywords` or `seo.keywords` | Keep content keywords; allow SEO override later. |
| `relatedPracticeIds` | `relatedPracticeAreas` | Keep strings first; references later. |
| `relatedCaseSlugs` | `relatedCases` | Prefer references after all cases exist. |
| `featured` | `isFeatured` | Preserve boolean. |
| none | `isVisible` | Default true for migrated records. |
| none | `isArchived` | Default false. |
| none | `displayOrder` | Optional manual ordering. |

## Migration Order

1. Freeze existing slugs before migration.
2. Create Sanity project and datasets.
3. Create shared schema objects.
4. Create `caseStudy` schema.
5. Validate local data shape and slug uniqueness.
6. Import case studies without related-case references first.
7. Resolve related-case references in a second pass.
8. Add images later if approved assets exist.
9. Build query and mapper layer.
10. Migrate homepage preview to content layer.
11. Migrate case board to content layer.
12. Migrate case detail pages to content layer.
13. Compare local and CMS-rendered pages.
14. Remove direct local data imports only after parity is confirmed.

## Rich Text Conversion

String arrays should convert predictably:

- Each string in `overview`, `issues`, `strategy`, and `outcome` becomes a Portable Text paragraph or list item as appropriate.
- Avoid automatic heading inference.
- Avoid adding unsupported legal claims or marketing language during migration.
- Do not introduce a runtime `string[]` fallback for CMS long-form fields.

## Image Migration

Initial CMS migration can proceed without case images because the current case pages do not depend on them.

When images are introduced:

- Upload approved images to Sanity assets.
- Add required alt text.
- Use hotspot/crop for hero image composition.
- Map Sanity images to normalized `CmsImage` objects.
- Configure Next.js remote images for the Sanity CDN.

## Validation Checklist

Before switching production pages to Sanity:

- Every existing slug exists in Sanity.
- No duplicate slugs.
- `/cases/[slug]` URLs remain stable.
- Category filters return equivalent results.
- Homepage featured cases match approved selection.
- Pagination count is correct.
- Related cases resolve correctly.
- Metadata title and description match or intentionally improve existing output.
- JSON-LD remains conservative and valid.
- Empty states are acceptable.
- Build and lint pass.

## Duplicate Prevention

- Enforce unique slugs in Sanity.
- During import, match by slug instead of title.
- Run import scripts idempotently.
- Keep a migration report listing created, updated, skipped, and failed records.

## Rollback Plan

Keep local data until the Sanity-backed pages are validated.

Rollback options:

- Feature switch in the content layer to read local data temporarily.
- Revert route imports to `src/data/cases.ts`.
- Preserve local data file through the first production release after migration.

Do not delete `src/data/cases.ts` in the same task that first introduces Sanity queries.

## Temporary Fallback Strategy

During migration, `src/lib/content/cases.ts` can expose the future query contract while internally reading local data. Later tasks can replace the internals with Sanity queries without changing UI props.

This allows a safe staged migration:

```text
UI -> content functions -> local data
UI -> content functions -> Sanity
```

## URL Preservation

Existing public paths must remain unchanged:

- `/cases`
- `/cases/example-slug-1`
- All other current slugs in `src/data/cases.ts`

Never generate new slugs from titles during import if an existing slug is available.

## Suggested Future Implementation Tasks

### Task #020 - Sanity Project Planning and Environment Names

Scope:

- Decide Sanity project name, dataset names, API version, and environment variable names.
- No code changes except documentation updates if needed.

Expected files or areas:

- `docs/cms-architecture.md`
- project setup notes outside application code

Validation:

- No dependencies added.
- No runtime behavior changed.

### Task #021 - Sanity Studio Initialization

Scope:

- Confirm the working branch.
- Initialize Sanity Studio inside `studio/`.
- Connect or create the `Jeongcheon Law Office` Sanity project.
- Use the `production` dataset.
- Use TypeScript.
- Use the clean/minimal Studio template.
- Confirm local Studio startup.
- Confirm generated files.
- Confirm no Next.js route or runtime code was changed.
- Document all interactive CLI selections.

Expected files or areas:

- `studio/`

Validation:

- Studio runs locally.
- Generated files are documented.
- No `src/app/studio` route exists.
- No Next.js runtime code changed.
- Website routes still build.

Out of scope:

- Full Case Study schema implementation.
- Existing case-data migration.
- Next.js Sanity client implementation.
- GROQ query implementation.
- Homepage or route migration.
- Preview mode.
- Webhooks.
- Deployment.

Task #021 status:

- Completed.
- Studio initialized at `studio/`.
- Sanity project display name: `Jeongcheon Law Office`.
- Sanity project ID: `20zyfjea`.
- Dataset: `production`.
- Dataset visibility: `public`.
- Authentication provider: GitHub.
- No website CMS integration was implemented.
- No Case Study schema was implemented.
- No preview mode, webhook, or deployment was implemented.

### Task #022 - Shared Sanity Schema Objects

Scope:

- Add reusable Studio schema objects for `blockContent`, `seoFields`, and `contentImage`.
- Do not add document types.
- Do not add the `caseStudy` schema yet.
- Do not integrate Sanity with the Next.js website.

Expected files or areas:

- `studio/schemaTypes/objects/blockContent.ts`
- `studio/schemaTypes/objects/seoFields.ts`
- `studio/schemaTypes/objects/contentImage.ts`
- `studio/schemaTypes/index.ts`
- CMS documentation updates.

Validation:

- Studio schema compiles.
- No website runtime changes.
- Studio dev startup succeeds.
- Root lint and build continue to pass.

Task #022 status:

- Completed.
- `blockContent` supports only `normal`, `h2`, `h3`, `bullet`, `number`, `strong`, and a safe link annotation.
- Link validation allows `https://`, `http://`, `mailto:`, and `/` internal paths.
- Unsafe or malformed values such as `javascript:`, `data:`, `ftp:`, bare domains, and relative paths without `/` are rejected.
- `seoFields` includes optional `seoTitle`, `seoDescription`, `keywords`, and `noIndex`.
- `seoTitle` is limited to 60 characters.
- `seoDescription` is limited to 160 characters.
- `keywords` reject blank, whitespace-padded, and duplicate values.
- `noIndex` defaults to `false`.
- `contentImage` wraps a required Sanity image with `hotspot: true`, required alt text, optional caption, and a Studio preview.
- No document type was created.
- No Case Study schema was created.
- No root dependency, token, environment file, or Next.js runtime code was added.

Task #023 readiness:

- Shared schema objects are registered and available for the future `caseStudy` document schema.
- The next task can focus on the `caseStudy` document fields, publication fields, references, and validation rules.

### Task #023 - Case Study Schema

Scope:

- Add `caseStudy` schema with validations.

Expected files or areas:

- Sanity schema files.

Validation:

- Editors can create a valid draft case study.
- Required fields behave as expected.

### Task #024 - Environment Configuration

Scope:

- Add documented env variables to local examples.
- Do not commit secrets.

Expected files or areas:

- `.env.example` if the project chooses to add one.
- documentation.

Validation:

- No secrets committed.
- Build still passes.

### Task #025 - Sanity Client and Query Layer

Scope:

- Add Sanity client and low-level case queries.

Expected files or areas:

- `src/lib/cms/sanity-client.ts`
- `src/lib/cms/queries/cases.ts`

Validation:

- Strict TypeScript passes.
- UI components do not import Sanity directly.

### Task #026 - Domain Types and Mapping

Scope:

- Add application-facing case-study types and mapper functions.

Expected files or areas:

- `src/types/content/case.ts`
- `src/types/content/image.ts`
- `src/types/content/seo.ts`
- `src/lib/content/case-mappers.ts`

Validation:

- Raw Sanity fields stay out of UI props.

### Task #027 - Content API with Local Fallback

Scope:

- Create `src/lib/content/cases.ts` with query contracts.
- Initially preserve behavior using local data fallback if needed.

Expected files or areas:

- `src/lib/content/cases.ts`
- limited route imports

Validation:

- Existing pages render identically.
- Lint/build pass.

### Task #028 - Homepage Case Preview Migration

Scope:

- Make homepage case preview use `getFeaturedCaseStudies()`.

Expected files or areas:

- `src/components/home/CasesSection.tsx`
- `src/app/page.tsx` if async data needs to be passed from the page

Validation:

- Same visual layout.
- Empty featured list has a graceful fallback.

### Task #029 - Case Board Migration

Scope:

- Make `/cases` use `getCaseStudies()`.

Expected files or areas:

- `src/app/cases/page.tsx`
- `src/lib/content/cases.ts`

Validation:

- Category filtering, pagination, and latest sorting still work.

### Task #030 - Case Detail Migration

Scope:

- Make `/cases/[slug]` use `getCaseStudyBySlug()` and `getCaseStudySlugs()`.

Expected files or areas:

- `src/app/cases/[slug]/page.tsx`
- `src/lib/content/cases.ts`

Validation:

- Existing slugs still generate.
- Missing slugs call `notFound()`.

### Task #031 - Image Handling

Scope:

- Add Sanity image URL builder and Next.js remote image configuration.

Expected files or areas:

- `src/lib/cms/sanity-image.ts`
- `next.config.ts`
- relevant case image components

Validation:

- Images render with alt text.
- No layout shift or broken remote image config.

### Task #032 - SEO and JSON-LD Migration

Scope:

- Centralize metadata and structured data helpers for case studies.

Expected files or areas:

- `src/lib/content/seo.ts`
- `src/lib/content/structured-data.ts`
- `src/app/cases/[slug]/page.tsx`

Validation:

- Metadata remains equivalent or intentionally improved.
- JSON-LD validates conceptually and stays conservative.

### Task #033 - Existing Data Migration

Scope:

- Import local case studies into Sanity.
- Preserve slugs.
- Resolve related case references.

Expected files or areas:

- migration script location to be decided.
- Sanity dataset.

Validation:

- Import report generated.
- No duplicate slugs.
- CMS data count matches local data count.

### Task #034 - Preview Workflow

Scope:

- Add draft preview only after published CMS pages are stable.

Expected files or areas:

- preview route or Next.js draft mode integration.
- server-only token configuration.

Validation:

- Preview requires secret/token.
- Public users cannot access drafts.

### Task #035 - Deployment Validation

Scope:

- Validate Vercel Hobby deployment.
- Document Cloudflare portability notes.

Expected files or areas:

- deployment documentation.

Validation:

- Production build passes.
- Environment variables are configured without secrets exposure.

### Task #036 - Articles and FAQ Preparation

Scope:

- Reuse schema objects for Articles and FAQ.
- Do not migrate UI until content contracts are approved.

Expected files or areas:

- Sanity schemas.
- content model docs.

Validation:

- Schema remains understandable and not over-abstracted.
