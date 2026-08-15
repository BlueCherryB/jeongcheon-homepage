export type LegalContentDocumentType = 'caseStudy' | 'legalArticle'

export type PortableTextBlock = {
  _key: string
  _type: 'block'
  children: Array<{
    _key: string
    _type: 'span'
    marks: string[]
    text: string
  }>
  markDefs: unknown[]
  style: 'normal'
  listItem?: 'bullet' | 'number'
  level?: number
}

export type CaseStudySection = 'overview' | 'issues' | 'response' | 'outcome'

export type NormalizedCaseStudyContent = {
  documentType: 'caseStudy'
  title?: string
  sections: Record<CaseStudySection, PortableTextBlock[]>
}

export type NormalizedLegalArticleContent = {
  documentType: 'legalArticle'
  title?: string
  body: PortableTextBlock[]
}

export type NormalizedLegalContent =
  | NormalizedCaseStudyContent
  | NormalizedLegalArticleContent

export type LegalContentExport = {
  title: string
  body: string
  full: string
}
