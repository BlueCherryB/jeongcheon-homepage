import type {
  CaseStudySection,
  LegalContentDocumentType,
  NormalizedCaseStudyContent,
  NormalizedLegalArticleContent,
  NormalizedLegalContent,
  PortableTextBlock,
} from './types'

type ParsedSections = Record<CaseStudySection, string[]>

const sectionMatchers: Array<[CaseStudySection, RegExp]> = [
  ['overview', /^(사건의?\s*개요|사안의?\s*개요|사건\s*개요)$/],
  ['issues', /^(주요\s*쟁점|법적\s*쟁점|쟁점)$/],
  [
    'response',
    /^(변호인(?:의)?\s*(?:대응|조력|대응\s*및\s*조력)|변호사(?:의)?\s*(?:대응|조력|대응\s*및\s*조력)|대응(?:\s*내용|\s*\/\s*조력)?)$/,
  ],
  ['outcome', /^(사건의?\s*(?:결과|결론)|처리\s*결과|결과|결론)$/],
]

const resultTaxonomies: Array<[string, RegExp]> = [
  ['무혐의', /(?:무혐의|혐의\s*없음|불송치)/],
  ['무죄', /무죄/],
  ['승소', /(?:전부|일부)?\s*승소/],
  ['조정성립', /조정\s*성립/],
  ['화해권고', /화해\s*권고/],
  ['인용', /(?:전부|일부)?\s*인용|청구\s*인용/],
  ['기각', /(?:전부|일부)?\s*기각|청구\s*기각/],
  ['감경', /감경/],
  ['불기소', /불기소/],
  ['집행유예', /집행\s*유예/],
  ['기소의견', /기소\s*의견/],
]

function createEmptySections(): ParsedSections {
  return {
    overview: [],
    issues: [],
    response: [],
    outcome: [],
  }
}

function normalizeLine(line: string): string {
  return line
    .replace(/\u00a0/g, ' ')
    .replace(/^\s*(?:#{1,6}|[\d]+[.)]|[○●◦•▪◆◇oO]\s+)\s*/, '')
    .replace(/[：:]+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSectionFromHeading(line: string): CaseStudySection | undefined {
  const heading = normalizeLine(line)

  return sectionMatchers.find(([, matcher]) => matcher.test(heading))?.[0]
}

function getTextLines(rawSource: string): string[] {
  return rawSource
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trim())
}

function getExplicitTitle(lines: string[]): {title?: string; startIndex: number} {
  const titleIndex = lines.findIndex((line) => /^(?:제목|사건명|글\s*제목)\s*[:：]/.test(line))

  if (titleIndex === -1) {
    return {startIndex: 0}
  }

  const [, title = ''] = lines[titleIndex].split(/[:：]/, 2)
  const normalizedTitle = title.trim() || lines.slice(titleIndex + 1).find(Boolean) || ''

  return {
    title: normalizedTitle || undefined,
    startIndex: title.trim() ? titleIndex + 1 : titleIndex + 2,
  }
}

function createBlock(
  keyPrefix: string,
  index: number,
  text: string,
  listItem?: 'bullet' | 'number',
): PortableTextBlock {
  const key = `${keyPrefix}-${index}`

  return {
    _key: key,
    _type: 'block',
    children: [
      {
        _key: `${key}-span`,
        _type: 'span',
        marks: [],
        text,
      },
    ],
    markDefs: [],
    style: 'normal',
    ...(listItem ? {listItem, level: 1} : {}),
  }
}

function getListItem(line: string): 'bullet' | 'number' | undefined {
  if (/^(?:[-*•·]|[▪◦])\s+/.test(line)) {
    return 'bullet'
  }

  return /^\d+[.)]\s+/.test(line) ? 'number' : undefined
}

function removeListPrefix(line: string): string {
  return line.replace(/^(?:(?:[-*•·]|[▪◦])|\d+[.)])\s+/, '').trim()
}

function toPortableTextBlocks(lines: string[], keyPrefix: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = []
  let paragraphLines: string[] = []

  const pushParagraph = () => {
    const text = paragraphLines.join(' ').replace(/\s+/g, ' ').trim()

    if (text) {
      blocks.push(createBlock(keyPrefix, blocks.length, text))
    }

    paragraphLines = []
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      pushParagraph()
      return
    }

    const listItem = getListItem(trimmedLine)

    if (listItem) {
      pushParagraph()
      const text = removeListPrefix(trimmedLine)

      if (text) {
        blocks.push(createBlock(keyPrefix, blocks.length, text, listItem))
      }

      return
    }

    paragraphLines.push(trimmedLine)
  })

  pushParagraph()

  return blocks
}

function getParsedResult(lines: string[]): NormalizedCaseStudyContent['result'] {
  const explicitResult = lines.find((line) => /^결과\s*[:：]\s*\S+/.test(line))
  const explicitDetail = lines.find((line) => /^(?:세부\s*결과|결과\s*상세)\s*[:：]\s*\S+/.test(line))
  const candidate = normalizeLine(explicitResult ?? lines.find(Boolean) ?? '')
    .replace(/^결과\s*[:：]\s*/, '')
    .trim()
  const detail = normalizeLine(explicitDetail ?? '')
    .replace(/^(?:세부\s*결과|결과\s*상세)\s*[:：]\s*/, '')
    .trim()
  const matchedResults = resultTaxonomies.filter(([, matcher]) => matcher.test(candidate))

  if (candidate.length > 60 || matchedResults.length !== 1) {
    return detail ? {resultDetail: detail} : {}
  }

  const result = matchedResults[0][0]

  return {
    result,
    resultDetail: detail || (candidate === result ? undefined : candidate),
  }
}

function inferCaseStudyTitle(lines: string[]): {title?: string; contentLines: string[]} {
  const firstHeadingIndex = lines.findIndex((line) => Boolean(getSectionFromHeading(line)))
  const preface = (firstHeadingIndex === -1 ? [] : lines.slice(0, firstHeadingIndex)).filter(Boolean)
  const bracketedTitle = preface.find((line) => /^\[[^\]]+\]$/.test(line))

  if (bracketedTitle) {
    return {
      title: bracketedTitle.slice(1, -1).trim(),
      contentLines: lines.slice(firstHeadingIndex),
    }
  }

  if (preface.length !== 1 || preface[0].length > 120) {
    return {contentLines: lines}
  }

  return {
    title: preface[0],
    contentLines: lines.slice(firstHeadingIndex),
  }
}

export function normalizeCaseStudySource(rawSource: string): NormalizedCaseStudyContent {
  const sourceLines = getTextLines(rawSource)
  const explicitTitle = getExplicitTitle(sourceLines)
  const lines = sourceLines.slice(explicitTitle.startIndex)
  const inferredTitle = explicitTitle.title ? undefined : inferCaseStudyTitle(lines)
  const contentLines = inferredTitle?.contentLines ?? lines
  const sections = createEmptySections()
  let activeSection: CaseStudySection = 'overview'

  contentLines.forEach((line) => {
    const section = getSectionFromHeading(line)

    if (section) {
      activeSection = section
      return
    }

    sections[activeSection].push(line)
  })

  return {
    documentType: 'caseStudy',
    title: explicitTitle.title ?? inferredTitle?.title,
    sections: {
      overview: toPortableTextBlocks(sections.overview, 'processor-overview'),
      issues: toPortableTextBlocks(sections.issues, 'processor-issues'),
      response: toPortableTextBlocks(sections.response, 'processor-response'),
      outcome: toPortableTextBlocks(sections.outcome, 'processor-outcome'),
    },
    result: getParsedResult(sections.outcome),
  }
}

export function normalizeLegalArticleSource(rawSource: string): NormalizedLegalArticleContent {
  const sourceLines = getTextLines(rawSource)
  const explicitTitle = getExplicitTitle(sourceLines)

  return {
    documentType: 'legalArticle',
    title: explicitTitle.title,
    body: toPortableTextBlocks(sourceLines.slice(explicitTitle.startIndex), 'processor-body'),
  }
}

export function normalizeLegalContent(
  documentType: LegalContentDocumentType,
  rawSource: string,
): NormalizedLegalContent {
  return documentType === 'caseStudy'
    ? normalizeCaseStudySource(rawSource)
    : normalizeLegalArticleSource(rawSource)
}
