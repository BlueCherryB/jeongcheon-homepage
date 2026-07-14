const caseStudyListProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  result,
  summary,
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

export const publishedCaseStudiesQuery = `*[
  _type == "caseStudy" &&
  defined(slug.current)
] | ${caseStudyOrdering} ${caseStudyListProjection}`;

export const featuredCaseStudiesQuery = `*[
  _type == "caseStudy" &&
  defined(slug.current) &&
  featured == true
] | ${caseStudyOrdering} ${caseStudyListProjection}`;

export const publishedCaseStudyBySlugQuery = `*[
  _type == "caseStudy" &&
  slug.current == $slug
] | ${caseStudyOrdering} [0] {
  _id,
  title,
  "slug": slug.current,
  category,
  result,
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
  response,
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
