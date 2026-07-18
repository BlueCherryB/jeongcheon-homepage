const caseStudyListProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  result,
  resultDetail,
  summary,
  overview,
  outcome,
  publishedAt,
  featured,
  sortOrder,
  mainImage {
    image {
      asset,
      crop,
      hotspot
    },
    alt,
    caption
  }
}`;

const caseStudyOrdering = `order(
  coalesce(sortOrder, 999999) asc,
  publishedAt desc,
  _createdAt desc
)`;

const featuredCaseStudyOrdering = `order(
  sortOrder asc,
  publishedAt desc
)`;

export const publishedCaseStudiesQuery = `*[
  _type == "caseStudy" &&
  defined(slug.current)
] | ${caseStudyOrdering} ${caseStudyListProjection}`;

export const featuredCaseStudiesQuery = `*[
  _type == "caseStudy" &&
  defined(slug.current) &&
  featured == true &&
  sortOrder >= 1 &&
  sortOrder <= 5
] | ${featuredCaseStudyOrdering} [0...5] ${caseStudyListProjection}`;

export const publishedCaseStudyBySlugQuery = `*[
  _type == "caseStudy" &&
  slug.current == $slug
] | ${caseStudyOrdering} [0] {
  _id,
  title,
  "slug": slug.current,
  category,
  result,
  resultDetail,
  tags,
  summary,
  mainImage {
    image {
      asset,
      crop,
      hotspot
    },
    alt,
    caption
  },
  overview,
  legalIssues,
  outcome,
  publishedAt,
  featured,
  sortOrder,
  seo {
    seoTitle,
    seoDescription,
    keywords,
    noIndex
  }
}`;

export const publishedCaseStudySlugsQuery = `*[
  _type == "caseStudy" &&
  defined(slug.current)
] | order(slug.current asc) {
  "slug": slug.current
}`;
