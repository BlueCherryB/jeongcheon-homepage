# CMS Content Model

This document defines the planned Sanity content model for the Jeongcheon Law Office website. It focuses first on Case Studies while leaving room for Articles, FAQ, Practice Areas, Attorney, Site Settings, and Contact Information.

## Case Study Document

Recommended Sanity document type:

```text
caseStudy
```

Recommended fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | yes | Case title shown in cards, board, detail page, metadata. |
| `slug` | slug | yes | Must preserve existing `/cases/[slug]` URLs. |
| `category` | string or reference | yes | Initial enum: `criminal`, `civil`, `family`. Reference can be introduced later if practice areas become CMS-managed. |
| `summary` | text | yes | Short summary for preview cards, board, metadata fallback. |
| `result` | string | yes | Short visible result label, for example "무혐의" or "승소". |
| `resultDetail` | string | yes | Supporting result detail. |
| `mainImage` | image object | no initially | Should include asset, alt, optional caption, hotspot, crop. |
| `overview` | rich text | yes | Case overview section. |
| `issues` | rich text | yes | Main legal issues. |
| `response` | rich text | yes | Jeongcheon's response. Current local field is `strategy`. |
| `outcome` | rich text | yes | Case result section. Current local field is `outcome`. |
| `keywords` | array of strings | no | Used for metadata and internal search later. |
| `relatedPracticeAreas` | array of references or strings | no | Initially can map from existing `relatedPracticeIds`. |
| `relatedCases` | array of references | no | Maps from existing `relatedCaseSlugs`. |
| `seo` | SEO object | no | SEO title, description, keywords, OG image. |
| `publishedAt` | datetime | yes when visible | Public publication date. |
| `isVisible` | boolean | yes | Website visibility toggle. |
| `isFeatured` | boolean | no | Homepage feature status. |
| `isArchived` | boolean | no | Keeps page visible but not actively promoted. |
| `displayOrder` | number | no | Optional manual ordering for featured/curated lists. |

Sanity system fields:

- `_createdAt`
- `_updatedAt`
- `_id`
- `_rev`

These should stay in raw Sanity types and should not leak into most UI code.

## Portable Text Recommendation

Use Portable Text for long-form sections:

- `overview`
- `issues`
- `response`
- `outcome`

Do not introduce a runtime `string[]` fallback for these long-form fields during the Sanity implementation. The current local data uses arrays of strings, but the CMS-backed application model should normalize Portable Text into a deliberate rich-content representation.

Recommendation:

- Use Portable Text from the beginning for case overview, main legal issues, Jeongcheon's response, and case result.
- Keep the allowed Portable Text feature set intentionally small.

Trade-offs:

- Plain strings are easy to validate and render but become limiting when legal content needs formatting.
- Portable Text is more flexible and editor-friendly but requires a renderer and a mapping strategy.
- The first CMS integration should map Portable Text to a restricted application rich-content type and render only approved block styles.

## Reusable Portable Text Object

Conceptual schema object name:

```text
blockContent
```

Initial allowed styles:

- `normal`
- `h2`
- `h3`

Initial allowed lists:

- `bullet`
- `number`

Initial allowed marks:

- `strong`
- `link`

Initial link validation should allow:

- `https://`
- `http://`
- `mailto:`
- relative internal paths beginning with `/`

Do not add advanced blocks initially:

- Inline images.
- Tables.
- Video embeds.
- Custom callout blocks.
- Arbitrary HTML.
- Code blocks.

Implemented in Task #022:

- `studio/schemaTypes/objects/blockContent.ts`
- `studio/schemaTypes/objects/seoFields.ts`
- `studio/schemaTypes/objects/contentImage.ts`

These are registered from `studio/schemaTypes/index.ts`. No document types are registered yet.

## Validation Rules

Recommended validation:

- `title`: required, sensible max length such as 80-120 characters.
- `slug`: required, unique, lowercase URL-safe.
- `category`: required and limited to approved categories.
- `summary`: required, max length such as 240-320 characters.
- `result`: required, short.
- `resultDetail`: required, short.
- `publishedAt`: required when `isVisible` is true.
- `mainImage.alt`: required when `mainImage` exists.
- `seo.description`: max around 155-170 Korean characters where practical.
- `displayOrder`: integer, optional.
- `relatedCases`: should not include the current document.

## Publication Behavior

Sanity draft/publish status:

- Draft: editable unpublished version in Sanity.
- Published: document has a published version in Sanity.

Website visibility:

- `isVisible = true`: eligible for website pages and lists.
- `isVisible = false`: hidden from public lists and detail routes even if published.

Homepage feature status:

- `isFeatured = true`: eligible for homepage preview.
- Still requires `isVisible = true` and not archived.

Archived status:

- `isArchived = true`: can remain accessible by direct URL if `isVisible = true`, but should be excluded from homepage and active promotional lists.
- Use this for older content that remains useful for SEO or reference but is no longer promoted.
- The exact archived detail-page behavior is deferred to a later implementation task.

Do not add complex editorial workflows initially. Sanity's built-in draft/publish state plus a small set of booleans is enough.

Draft documents must not appear on the public website. Published documents with `isVisible = false` must not appear publicly. `isFeatured = true` only affects homepage or featured listings and does not override draft, visibility, or archived filters.

## Reusable Schema Objects

Recommended shared objects:

### SEO Object

```ts
type SeoFields = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: CmsImage;
  noIndex?: boolean;
};
```

### Image Object

```ts
type CmsImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};
```

### Publication Fields

```ts
type PublicationFields = {
  publishedAt: string;
  isVisible: boolean;
  isFeatured?: boolean;
  isArchived?: boolean;
  displayOrder?: number;
};
```

### Slug Field

- Required.
- Unique per document type.
- Preserves existing route stability.

## Application-Facing TypeScript Interfaces

The application should use domain types that are independent from raw Sanity documents.

```ts
export type CaseCategoryId = "criminal" | "civil" | "family";

export type CaseStudySummary = {
  slug: string;
  categoryId: CaseCategoryId;
  categoryLabel: string;
  title: string;
  summary: string;
  publishedAt: string;
  displayDate: string;
  result: string;
  resultDetail: string;
  keywords: string[];
  mainImage?: CmsImage;
  featured?: boolean;
};

export type CaseStudyDetail = CaseStudySummary & {
  overview: RichContent;
  issues: RichContent;
  response: RichContent;
  outcome: RichContent;
  relatedPracticeIds: string[];
  relatedCaseSlugs: string[];
  seo: SeoMetadata;
};

export type SeoMetadata = {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  image?: CmsImage;
  noIndex?: boolean;
};
```

Raw Sanity fields end at the query and mapper layer. The UI should not use `_id`, `_rev`, raw image references, GROQ result fragments, or Portable Text blocks unless a deliberately shared rich-text renderer is introduced.

## Content Privacy Rule

Sanity must contain only content approved for public website publication.

Do not store client names, personally identifiable client information, resident registration numbers, client phone numbers, private evidence, internal case files, unredacted court documents, confidential legal strategy, or attorney-client privileged material.

Case-study content must be anonymized and reviewed before publication.

## Planned Future Content Types

### Articles

Fields:

- title
- slug
- category
- excerpt
- body
- author
- publishedAt
- mainImage
- seo
- visibility fields

### FAQ

Fields:

- question
- answer
- category
- displayOrder
- isVisible
- seo if a standalone FAQ page is introduced

### Practice Areas

Fields:

- title
- slug
- summary
- body
- icon
- relatedCases
- seo
- displayOrder
- isVisible

### Attorney

Fields:

- name
- role
- biography
- credentials
- education
- careers
- portrait
- relatedCases
- seo

### Site Settings

Fields:

- site title
- default SEO
- social image
- navigation labels
- footer text
- legal policy links

### Contact Information

Fields:

- phone
- email
- address
- map URL
- consultation labels
- business hours if needed later

Avoid turning all of these into one generic schema. Keep each schema understandable for future maintainers.
