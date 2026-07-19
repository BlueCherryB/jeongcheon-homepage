import {defineArrayMember, defineField, defineType} from 'sanity'

function hasDuplicateKeywords(keywords: string[]): boolean {
  const normalizedKeywords = keywords.map((keyword) => keyword.trim().toLocaleLowerCase())

  return normalizedKeywords.some(
    (keyword, index) => keyword && normalizedKeywords.indexOf(keyword) !== index,
  )
}

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO 설정',
  type: 'object',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO 제목',
      type: 'string',
      description:
        '검색 결과와 공유 미리보기에 사용할 수 있는 선택 입력값입니다. 비워두면 문서 제목을 사용합니다.',
      validation: (Rule) =>
        Rule.max(60).warning('검색 결과 제목으로는 60자 이내가 적절합니다.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO 설명',
      type: 'text',
      rows: 3,
      description:
        '검색 결과 설명에 사용할 수 있는 선택 입력값입니다. 비워두면 요약문이나 기본 설명을 사용합니다.',
      validation: (Rule) =>
        Rule.max(160).warning('검색 결과 설명으로는 160자 이내가 적절합니다.'),
    }),
    defineField({
      name: 'keywords',
      title: '키워드',
      type: 'array',
      description:
        '검색 순위를 보장하는 값이 아니라, 내부 분류와 편집 참고용 키워드입니다.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value) => {
              if (typeof value !== 'string') {
                return true
              }

              if (!value.trim()) {
                return '빈 키워드는 입력할 수 없습니다.'
              }

              if (value !== value.trim()) {
                return '키워드 앞뒤 공백을 제거해주세요.'
              }

              return true
            }),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!Array.isArray(value)) {
            return true
          }

          const keywords = value.filter((keyword): keyword is string => typeof keyword === 'string')

          return hasDuplicateKeywords(keywords)
            ? '중복된 키워드가 있습니다. 하나만 남겨주세요.'
            : true
        }),
    }),
    defineField({
      name: 'noIndex',
      title: '검색 노출 제외',
      type: 'boolean',
      description:
        '활성화하면 향후 웹사이트에서 검색 엔진에 이 페이지를 색인하지 않도록 요청합니다.',
      initialValue: false,
    }),
  ],
})
