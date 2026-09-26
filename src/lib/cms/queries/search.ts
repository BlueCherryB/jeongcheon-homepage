const searchableContentFilter = `
  _type in ["caseStudy", "legalArticle"] &&
  defined(slug.current) &&
  (
    title match $searchPattern ||
    searchKeywords[] match $searchPattern ||
    category match $searchPattern ||
    category in $categoryValues ||
    (
      _type == "caseStudy" &&
      (
        tags[] match $searchPattern ||
        result match $searchPattern ||
        resultDetail match $searchPattern ||
        pt::text(overview) match $searchPattern ||
        pt::text(legalIssues) match $searchPattern ||
        pt::text(response) match $searchPattern ||
        pt::text(outcome) match $searchPattern
      )
    ) ||
    (
      _type == "legalArticle" &&
      (
        excerpt match $searchPattern ||
        pt::text(body) match $searchPattern
      )
    )
  )
`;

const searchableContentScore = `
  boost(title match $searchPattern, 12),
  boost(searchKeywords[] match $searchPattern, 10),
  boost(category match $searchPattern || category in $categoryValues, 6),
  boost(tags[] match $searchPattern, 7),
  boost(result match $searchPattern, 5),
  boost(resultDetail match $searchPattern, 4),
  boost(excerpt match $searchPattern, 4),
  boost(pt::text(overview) match $searchPattern, 3),
  boost(pt::text(legalIssues) match $searchPattern, 3),
  boost(pt::text(response) match $searchPattern, 2),
  boost(pt::text(outcome) match $searchPattern, 2),
  boost(pt::text(body) match $searchPattern, 2)
`;

export const publishedContentSearchQuery = `{
  "totalCount": count(*[${searchableContentFilter}]),
  "results": *[${searchableContentFilter}]
    | score(${searchableContentScore})
    | order(_score desc, coalesce(publishedAt, _createdAt) desc)
    [$start...$end] {
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      "excerpt": select(
        _type == "caseStudy" => coalesce(
          summary,
          pt::text(overview[0...1]),
          pt::text(outcome[0...1])
        ),
        coalesce(excerpt, pt::text(body[0...1]))
      ),
      "publishedAt": coalesce(publishedAt, _createdAt)
    }
}`;
