import type {
  LegalContentExport,
  NormalizedCaseStudyContent,
  NormalizedLegalContent,
  PortableTextBlock,
} from './types'

const sectionTitles = {
  overview: '사건의 개요',
  issues: '주요 쟁점',
  response: '변호인의 대응·조력',
  outcome: '사건의 결과',
} as const

function getBlockText(block: PortableTextBlock): string {
  return block.children.map((child) => child.text).join('').trim()
}

function blocksToText(blocks: PortableTextBlock[]): string {
  let number = 0

  return blocks
    .map((block) => {
      const text = getBlockText(block)

      if (!text) {
        return ''
      }

      if (block.listItem === 'bullet') {
        number = 0
        return `- ${text}`
      }

      if (block.listItem === 'number') {
        number += 1
        return `${number}. ${text}`
      }

      number = 0
      return text
    })
    .filter(Boolean)
    .join('\n\n')
}

function getCaseStudySections(content: NormalizedCaseStudyContent): Array<[string, string]> {
  return (Object.keys(sectionTitles) as Array<keyof typeof sectionTitles>)
    .map((key) => [sectionTitles[key], blocksToText(content.sections[key])] as [string, string])
    .filter(([, text]) => Boolean(text))
}

function getBody(content: NormalizedLegalContent, headingPrefix: string): string {
  if (content.documentType === 'legalArticle') {
    return blocksToText(content.body)
  }

  return getCaseStudySections(content)
    .map(([heading, text]) => `${headingPrefix}${heading}\n\n${text}`)
    .join('\n\n')
}

function createExport(title: string, body: string): LegalContentExport {
  return {
    title,
    body,
    full: [title, body].filter(Boolean).join('\n\n'),
  }
}

export function formatHomepageContent(
  content: NormalizedLegalContent,
  fallbackTitle: string,
): LegalContentExport {
  return createExport(content.title ?? fallbackTitle, getBody(content, ''))
}

export function formatNaverBlogContent(
  content: NormalizedLegalContent,
  fallbackTitle: string,
): LegalContentExport {
  const title = content.title ?? fallbackTitle
  const body =
    content.documentType === 'legalArticle'
      ? getBody(content, '')
      : getBody(content, '## ')

  return createExport(title, body)
}

export function formatLawTalkContent(
  content: NormalizedLegalContent,
  fallbackTitle: string,
): LegalContentExport {
  const title = content.title ?? fallbackTitle
  const body =
    content.documentType === 'legalArticle'
      ? blocksToText(content.body)
      : getCaseStudySections(content)
          .map(([heading, text]) => `[${heading}]\n\n${text}`)
          .join('\n\n')

  return createExport(title, body)
}
