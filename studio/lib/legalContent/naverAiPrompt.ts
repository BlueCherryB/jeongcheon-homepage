import type {
  CaseStudySection,
  NormalizedCaseStudyContent,
  NormalizedLegalContent,
  PortableTextBlock,
} from './types'

type NaverAiPromptInput = {
  content: NormalizedLegalContent
  fallbackTitle: string
  category?: string
  rawSource?: string
}

const caseStudySectionTitles: Record<CaseStudySection, string> = {
  overview: '사건의 개요',
  issues: '주요 쟁점',
  response: '변호인의 대응·조력',
  outcome: '사건의 결과',
}

const categoryLabels: Record<string, string> = {
  criminal: '형사',
  civil: '민사',
  family: '가사',
  general: '기타',
}

function getBlockText(block: PortableTextBlock): string {
  return block.children
    .map((child) => child.text)
    .join('')
    .trim()
}

function blocksToText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      const text = getBlockText(block)

      if (!text) {
        return ''
      }

      if (block.listItem === 'bullet') {
        return `- ${text}`
      }

      return text
    })
    .filter(Boolean)
    .join('\n')
}

function getCaseStudyFacts(content: NormalizedCaseStudyContent): string[] {
  const sections = (Object.keys(caseStudySectionTitles) as CaseStudySection[])
    .map(
      (section) =>
        [caseStudySectionTitles[section], blocksToText(content.sections[section])] as const,
    )
    .filter(([, text]) => Boolean(text))
    .map(([heading, text]) => `### ${heading}\n${text}`)

  if (content.result.result) {
    sections.push(`### 사건 결과\n${content.result.result}`)
  }

  if (content.result.resultDetail) {
    sections.push(`### 세부 결과\n${content.result.resultDetail}`)
  }

  return sections
}

function getNormalizedFacts(content: NormalizedLegalContent): string[] {
  if (content.documentType === 'caseStudy') {
    return getCaseStudyFacts(content)
  }

  const body = blocksToText(content.body)

  return body ? [`### 본문\n${body}`] : []
}

export function formatNaverAiExpansionPrompt({
  content,
  fallbackTitle,
  category,
  rawSource,
}: NaverAiPromptInput): string {
  const title = content.title ?? fallbackTitle
  const contentType = content.documentType === 'caseStudy' ? '수행 사례' : '법률 정보'
  const facts = getNormalizedFacts(content)
  const source = rawSource?.trim()

  return [
    '당신은 대한민국 법률사무소의 네이버 블로그 콘텐츠를 편집하는 전문 에디터입니다.',
    '아래 제공 사실만을 바탕으로, 홈페이지용 요약문과 의미 있게 다른 네이버 블로그용 글을 작성해 주세요.',
    '',
    '[콘텐츠 정보]',
    `- 콘텐츠 유형: ${contentType}`,
    ...(title ? [`- 제목: ${title}`] : []),
    ...(category ? [`- 분야: ${categoryLabels[category] ?? category}`] : []),
    '',
    '[정규화된 사실]',
    ...(facts.length > 0 ? facts : ['- 정리된 본문이 없습니다.']),
    ...(source ? ['', '[원문]', source] : []),
    '',
    '[작성 지침]',
    '- 제공된 원문의 사실관계, 증거, 법원 판단, 법조문, 판례, 사건번호, 날짜, 결과를 절대 추가·변경·추측하지 마세요.',
    '- 사건별 사실과 일반적인 법률 설명을 명확히 구분하세요.',
    '- 실제 검색자가 궁금해할 질문을 중심으로 내용을 확장하되, 제공 사실로 뒷받침되지 않는 부분은 일반론으로도 단정하지 마세요.',
    '- 전문적이면서도 읽기 쉬운 한국어로 쓰고, 과장된 광고 표현과 키워드 나열을 피하세요.',
    '- 홈페이지 문장을 단순히 늘리지 말고, 독자의 이해에 도움이 되는 맥락·설명·점검 항목을 새롭게 구성하세요.',
    '- 원문이 뒷받침하는 경우 약 1,500~2,000자의 분량을 목표로 하되, 분량보다 내용의 충실성을 우선하세요.',
    '- 근거가 없는 항목은 억지로 채우지 말고 생략하세요.',
    '',
    '[출력 형식]',
    '블로그 제목',
    '- 네이버 검색 이용자가 이해하기 쉬운 제목 1개',
    '',
    '본문',
    '- 읽기 쉬운 소제목을 사용해 작성',
    '- 끝부분에 독자가 확인할 수 있는 실무적 체크포인트 또는 유의사항을 포함',
    '',
    '추천 태그',
    '- 사실과 주제에 맞는 태그만 5~8개 제안',
  ].join('\n')
}
