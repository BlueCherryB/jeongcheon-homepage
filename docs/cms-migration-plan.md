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

Task #023 status:

- Completed.
- `caseStudy` document schema implemented at `studio/schemaTypes/documents/caseStudy.ts`.
- Registered document type: `caseStudy`.
- Required fields: `title`, `slug`, `category`, `result`, `summary`.
- Optional fields: `mainImage`, `overview`, `legalIssues`, `response`, `outcome`, `publishedAt`, `featured`, `sortOrder`, `seo`.
- Category values: `criminal`, `civil`, `family`.
- Korean editor labels are used for category options and primary fields.
- `mainImage` reuses `contentImage`.
- `overview`, `legalIssues`, `response`, and `outcome` reuse `blockContent`.
- `seo` reuses `seoFields`.
- `featured` defaults to `false`.
- `sortOrder` is optional and validates as a non-negative integer.
- Studio preview converts category values to Korean labels and uses `mainImage.image` as media.
- Studio orderings added for newest published first, manual order, and title ascending.
- Task #022 link validation was tightened to parse `http://` and `https://` values with `URL` and reject malformed hostnames.
- Website integration remains deferred.
- No local case data, route, component, token, environment file, or root dependency was added.

Task #024 readiness:

- The Case Study schema is available for future environment/query-layer work.
- Next task can focus on environment configuration without changing the website runtime.

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

Task #024 status:

- Completed.
- Environment variable names established:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `SANITY_API_READ_TOKEN`
- Public variables: the three `NEXT_PUBLIC_SANITY_*` values.
- Server-only variable: `SANITY_API_READ_TOKEN`.
- Fixed Sanity API version: `2025-02-19`.
- Example environment file added at `.env.example`.
- Root `.gitignore` keeps real `.env*` files ignored while allowing `.env.example`.
- Studio `.gitignore` also ignores real `.env*` files while allowing a future `studio/.env.example` if needed.
- Runtime public configuration module added at `src/lib/cms/env.ts`.
- The module exports `sanityProjectId`, `sanityDataset`, and `sanityApiVersion`.
- Public configuration validation rejects missing, whitespace-only, malformed project ID, malformed dataset, and invalid API version values.
- `SANITY_API_READ_TOKEN` is documented but not required or read in code yet.
- Published-content reads remain planned as public dataset reads without a token.
- Future preview and draft reads remain server-only and may use `SANITY_API_READ_TOKEN`.
- The same variable names are documented for local `.env.local`, Vercel, and Cloudflare settings.
- Content fetching, GROQ queries, Sanity client creation, mappers, preview mode, UI changes, route changes, and local data replacement remain deferred.
- No dependency, lockfile, token, or real environment file was added.

Task #025 readiness:

- The next task can introduce the Sanity client and low-level query layer using `src/lib/cms/env.ts`.
- Published-read configuration is ready, but no current website route imports it yet.

### Task #025 - Sanity Client and Query Layer

Scope:

- Add Sanity client and low-level case queries.

Expected files or areas:

- `src/lib/cms/client.ts`
- `src/lib/cms/queries/caseStudies.ts`
- `src/lib/cms/caseStudies.ts`
- `src/lib/cms/types/caseStudy.ts`

Validation:

- Strict TypeScript passes.
- UI components do not import Sanity directly.

Task #025 status:

- Completed.
- Root dependency added: `@sanity/client`.
- Published-only client implemented at `src/lib/cms/client.ts`.
- The client reuses `src/lib/cms/env.ts`, uses `useCdn: true`, uses `perspective: "published"`, and does not use a token.
- Raw CMS Case Study response types implemented at `src/lib/cms/types/caseStudy.ts`.
- Query definitions implemented at `src/lib/cms/queries/caseStudies.ts`.
- Low-level fetch functions implemented at `src/lib/cms/caseStudies.ts`.
- Queries implemented:
  - `publishedCaseStudiesQuery`
  - `featuredCaseStudiesQuery`
  - `publishedCaseStudyBySlugQuery`
  - `publishedCaseStudySlugsQuery`
- Slug lookup uses the `$slug` GROQ parameter.
- Slug input validation rejects empty, whitespace-only, uppercase, slash-containing, Korean, leading/trailing hyphen, and repeated-hyphen values by throwing `TypeError`.
- A valid slug with no matching document returns `null`.
- Empty list results are accepted and returned as empty arrays.
- Portable Text fields are fetched as raw values and not rendered.
- Raw image fields are fetched without URL generation.
- Smoke verification succeeded against the `production` dataset with public variables and no token.
- No current route, page, component, mapper, renderer, preview mode, webhook, revalidation logic, image URL builder, or local-data replacement was added.

Task #026 readiness:

- The next task can add application-facing domain types and mappers while keeping UI components isolated from raw Sanity results.

### Task #026 - Domain Types and Mapping

Scope:

- Add application-facing case-study types and mapper functions.

Expected files or areas:

- `src/types/content/caseStudy.ts`
- `src/lib/content/caseStudyMappers.ts`
- `src/lib/content/caseStudies.ts`

Validation:

- Raw Sanity fields stay out of UI props.

Task #026 status:

- Completed.
- Application-facing Case Study types were added at `src/types/content/caseStudy.ts`.
- Mapper functions were added at `src/lib/content/caseStudyMappers.ts`.
- Application-level Case Study read functions were added at `src/lib/content/caseStudies.ts`.
- Required usable fields are `_id`, `title`, `slug`, `category`, `result`, and `summary`.
- Sanity `legalIssues` maps to application `issues`.
- Category values remain `criminal`, `civil`, and `family`, with Korean labels derived in the mapper.
- Optional `featured` defaults to `false`.
- Missing Portable Text sections, SEO keywords, and SEO `noIndex` are normalized to empty arrays or `false`.
- Single-record mapping throws `CaseStudyMappingError` for unusable data.
- Collection mapping skips invalid records while preserving valid records.
- Raw CMS types remain under `src/lib/cms/types/`.
- No route, component, local data, Studio schema, image URL builder, Portable Text renderer, dependency, or runtime page integration was added.

Task #027 readiness:

- The next task can decide when and how existing pages should consume `src/lib/content/caseStudies.ts`.
- UI migration should continue to avoid importing raw Sanity types.

### Task #027 - Content API with Local Fallback

Scope:

- Add local fallback support to `src/lib/content/caseStudies.ts`.
- Adapt existing local Case Study data to application-facing types.
- Preserve current content while Sanity has no Case Study documents.

Expected files or areas:

- `src/lib/content/localCaseStudies.ts`
- `src/lib/content/caseStudies.ts`

Validation:

- Existing pages render identically.
- Lint/build pass.

Task #027 status:

- Completed.
- `src/lib/content/localCaseStudies.ts` converts existing local Case Study records into application-facing Case Study list/detail objects.
- Local `strategy` maps to application `response`.
- String-array detail sections are converted to simple Portable Text blocks at the adapter boundary.
- `src/lib/content/caseStudies.ts` now tries Sanity first and falls back to local data when Sanity is empty, missing a requested detail, or unavailable.
- Valid Sanity content takes priority over local content.
- `getCaseStudySlugs()` combines Sanity and local slugs, keeps Sanity slugs first, and removes duplicates.
- Local data remains a temporary migration fallback and was not duplicated or rewritten.
- No route, page, component, Studio schema, dependency, preview mode, image URL builder, Portable Text renderer, or local content value was changed.

Task #028 readiness:

- Homepage migration can call `getFeaturedCaseStudies()` from the content API.
- The local fallback protects the current homepage from an empty Sanity dataset during that migration.

### Task #028 - Homepage Case Preview Migration

Scope:

- Make homepage case preview use `getFeaturedCaseStudies()`.

Expected files or areas:

- `src/components/home/CasesSection.tsx`
- `src/app/page.tsx` if async data needs to be passed from the page

Validation:

- Same visual layout.
- Empty featured list has a graceful fallback.

Task #028 status:

- Completed.
- `src/app/page.tsx` now fetches `getFeaturedCaseStudies()` in the homepage server component.
- The homepage limits the preview list to five Case Studies to preserve the previous visible item count.
- `src/components/home/CasesSection.tsx` receives Case Study preview data through props.
- `src/components/home/CaseStudyCard.tsx` now accepts a small display-oriented Case Study item shape instead of importing the local `CaseStudy` type.
- Local fallback still protects the homepage when Sanity is empty or unavailable.
- `/cases`, `/cases/[slug]`, pagination, filters, local data, Studio schemas, and CMS query internals were not migrated.

Task #029 readiness:

- The next task can migrate the `/cases` board to `getCaseStudies()` while preserving filter and pagination behavior.

### Task #029 - Case Board Migration

Scope:

- Make `/cases` use `getCaseStudies()`.

Expected files or areas:

- `src/app/cases/page.tsx`
- `src/lib/cases.ts`
- `src/components/cases/CaseStudyList.tsx`

Validation:

- Category filtering, pagination, and latest sorting still work.

Task #029 status:

- Completed.
- `/cases` now fetches `getCaseStudies()` from the application content API in the server page.
- Category filtering, latest sorting, query parsing, and pagination use application-facing Case Study list items.
- `CaseStudyList` accepts the same display item shape used by `CaseStudyCard`.
- `CaseCategoryFilter` reads category filter labels from `src/lib/cases.ts`, not from local case data.
- Local fallback remains active when Sanity is empty or unavailable.
- `/cases/[slug]`, local data values, Studio schemas, CMS query internals, preview mode, image URL builder, and Portable Text rendering were not migrated.

Task #030 readiness:

- The next task can migrate `/cases/[slug]` to `getCaseStudyBySlug()` and `getCaseStudySlugs()`.
- Detail rendering will need a Portable Text display strategy or an interim conversion policy for existing detail sections.

### Task #030 - Case Detail Migration

Scope:

- Make `/cases/[slug]` use `getCaseStudyBySlug()` and `getCaseStudySlugs()`.

Expected files or areas:

- `src/app/cases/[slug]/page.tsx`
- `src/lib/content/cases.ts`

Validation:

- Existing slugs still generate.
- Missing slugs call `notFound()`.

Task #030 status:

- `/cases/[slug]` now uses `getCaseStudySlugs()` for static params.
- `/cases/[slug]` now uses `getCaseStudyBySlug()` from the application content API for detail rendering and metadata.
- Missing detail records call `notFound()`.
- Detail rendering uses application fields: `overview`, `issues`, `response`, and `outcome`.
- The old local `strategy` field is not used by the migrated detail route.
- Related cases are resolved from `relatedCaseSlugs` against `getCaseStudies()` results, preserving slug order while skipping missing, duplicate, and current records.
- A minimal Portable Text renderer was added for detail paragraphs and issue lists.
- Article JSON-LD is still generated from normalized application content.
- Local fallback remains active for existing slugs while Sanity is empty or unavailable.
- `/cases` board filtering and pagination remain on application-facing list types.
- Local data, Studio schemas, CMS query internals, preview mode, image URL builder, and revalidation were not changed.

Task #031 readiness:

- Detail pages can now receive CMS-backed image data once Sanity image URL generation and Next.js remote image configuration are approved.

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

Task #031 status:

- Case Study cards and detail heroes now render CMS `mainImage` when available.
- Local fallback Case Studies still render without images.
- Missing, malformed, or incomplete image data falls back to the existing non-image presentation.
- Sanity crop values are translated into CDN `rect` parameters where possible.
- Sanity hotspot values are translated into CSS `object-position` values.
- `next.config.ts` allows `https://cdn.sanity.io/images/**` for optimized `next/image` rendering.
- No image URL builder dependency, preview mode, draft mode, token, webhook, revalidation, Studio deployment, or schema change was added.

Task #032 readiness:

- The next task can centralize SEO and structured data helpers without changing the image rendering contract.

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
