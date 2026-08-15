const legalArticleListProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  body,
  publishedAt,
  coverImage {
    image {
      asset,
      crop,
      hotspot
    },
    alt,
    caption
  }
}`;

const legalArticleOrdering = "order(publishedAt desc, _createdAt desc)";

export const publishedLegalArticlesQuery = `*[
  _type == "legalArticle" &&
  defined(slug.current)
] | ${legalArticleOrdering} ${legalArticleListProjection}`;

export const publishedLegalArticleBySlugQuery = `*[
  _type == "legalArticle" &&
  slug.current == $slug
] | ${legalArticleOrdering} [0] {
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  coverImage {
    image {
      asset,
      crop,
      hotspot
    },
    alt,
    caption
  },
  body,
  source {
    platform,
    url
  },
  seo {
    seoTitle,
    seoDescription,
    keywords,
    noIndex
  }
}`;

export const publishedLegalArticleSlugsQuery = `*[
  _type == "legalArticle" &&
  defined(slug.current)
] | order(slug.current asc) {
  "slug": slug.current
}`;
