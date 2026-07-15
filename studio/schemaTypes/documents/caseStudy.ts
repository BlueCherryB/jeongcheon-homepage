import {defineField, defineType} from 'sanity'
import {RequiredField} from '../../components/RequiredField'

const caseCategoryTitles: Record<string, string> = {
  criminal: '형사',
  civil: '민사',
  family: '이혼·가사',
}

const caseCategoryValues = ['criminal', 'civil', 'family'] as const

const caseCategoryOptions = [
  {title: caseCategoryTitles.criminal, value: 'criminal'},
  {title: caseCategoryTitles.civil, value: 'civil'},
  {title: caseCategoryTitles.family, value: 'family'},
]

const sanityApiVersion = '2025-02-19'
const slugPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/
const sequentialSlugPattern = /^case_(\d+)$/
const requiredField = {field: RequiredField}

type InitialValueContext = {
  getClient: (options: {apiVersion: string}) => {
    fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
  }
}

type ValidationContext = InitialValueContext & {
  document?: {
    _id?: string
  }
}

function isFilledString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidCaseSlug(value: unknown): boolean {
  if (!value || typeof value !== 'object' || !('current' in value)) {
    return false
  }

  const slug = value.current

  return typeof slug === 'string' && slugPattern.test(slug)
}

function isValidCaseCategory(value: unknown): boolean {
  return caseCategoryValues.includes(value as (typeof caseCategoryValues)[number])
}

function hasPortableTextContent(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0
}

async function getNextCaseStudySlug(context: InitialValueContext): Promise<string> {
  const client = context.getClient({apiVersion: sanityApiVersion})
  const slugs = await client.fetch<string[]>(`*[_type == "caseStudy" && defined(slug.current)].slug.current`)
  const nextNumber =
    slugs.reduce((maxNumber, slug) => {
      const match = sequentialSlugPattern.exec(slug)

      if (!match) {
        return maxNumber
      }

      const number = Number(match[1])

      return Number.isInteger(number) && number > maxNumber ? number : maxNumber
    }, 0) + 1

  return `case_${String(nextNumber).padStart(3, '0')}`
}

async function isUniqueCaseSlug(value: unknown, context: ValidationContext): Promise<true | string> {
  if (!value || typeof value !== 'object' || !('current' in value)) {
    return true
  }

  const slug = value.current

  if (typeof slug !== 'string' || !slugPattern.test(slug)) {
    return true
  }

  const documentId = context.document?._id?.replace(/^drafts\./, '')

  if (!documentId) {
    return true
  }

  const client = context.getClient({apiVersion: sanityApiVersion})
  const duplicateId = await client.fetch<string | null>(
    `*[
      _type == "caseStudy" &&
      slug.current == $slug &&
      !(_id in [$publishedId, $draftId])
    ][0]._id`,
    {
      slug,
      publishedId: documentId,
      draftId: `drafts.${documentId}`,
    },
  )

  return duplicateId ? '이미 사용 중인 수행사례 주소입니다.' : true
}

function validateUniqueCaseSlug(value: unknown, context: unknown): Promise<true | string> {
  return isUniqueCaseSlug(value, context as ValidationContext)
}

export const caseStudy = defineType({
  name: 'caseStudy',
  title: '수행사례',
  type: 'document',
  initialValue: async (_params, context) => ({
    slug: {
      _type: 'slug',
      current: await getNextCaseStudySlug(context),
    },
  }),
  groups: [
    {name: 'basic', title: '기본 정보', default: true},
    {name: 'content', title: '본문'},
    {name: 'settings', title: '게시 설정'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      group: 'basic',
      description: '수행사례 목록과 상세 페이지에 표시되는 제목입니다.',
      components: requiredField,
      validation: (Rule) =>
        Rule.required()
          .custom((value) => isFilledString(value) || '제목을 입력해주세요.')
          .max(120)
          .error('제목은 120자 이내로 입력해주세요.'),
    }),
    defineField({
      name: 'slug',
      title: '주소',
      type: 'slug',
      group: 'basic',
      description: '새 문서 생성 시 자동 부여되는 상세 페이지 URL입니다. 예: /cases/case_001',
      hidden: true,
      readOnly: true,
      validation: (Rule) =>
        Rule.required()
          .custom((value) =>
            isValidCaseSlug(value)
              ? true
              : '주소는 소문자 영문, 숫자, 하이픈, 언더스코어만 사용할 수 있으며 기호로 시작하거나 끝날 수 없습니다.',
          )
          .custom(validateUniqueCaseSlug)
          .error('올바른 주소를 입력해주세요.'),
    }),
    defineField({
      name: 'category',
      title: '사건 분야',
      type: 'string',
      group: 'basic',
      options: {
        list: caseCategoryOptions,
        layout: 'radio',
      },
      components: requiredField,
      validation: (Rule) =>
        Rule.required()
          .custom((value) => isValidCaseCategory(value) || '사건 분야를 올바르게 선택해주세요.')
          .error('사건 분야를 올바르게 선택해주세요.'),
    }),
    defineField({
      name: 'result',
      title: '사건 결과',
      type: 'string',
      group: 'basic',
      description: '목록과 상세 화면에서 강조할 사건 결과입니다. 예: 무혐의, 승소, 조정 성립',
      components: requiredField,
      validation: (Rule) =>
        Rule.required()
          .custom((value) => isFilledString(value) || '사건 결과를 입력해주세요.')
          .max(120)
          .error('사건 결과는 120자 이내로 입력해주세요.'),
    }),
    defineField({
      name: 'mainImage',
      title: '대표 이미지',
      type: 'contentImage',
      group: 'basic',
      description: '홈페이지, 수행사례 목록, 상세 페이지에 사용할 수 있는 이미지입니다.',
      components: requiredField,
      validation: (Rule) => Rule.required().error('대표 이미지를 선택해주세요.'),
    }),
    defineField({
      name: 'overview',
      title: '사건 개요',
      type: 'blockContent',
      group: 'content',
      components: requiredField,
      validation: (Rule) =>
        Rule.required()
          .custom((value) => hasPortableTextContent(value) || '사건 개요를 입력해주세요.')
          .error('사건 개요를 입력해주세요.'),
    }),
    defineField({
      name: 'legalIssues',
      title: '주요 법적 쟁점',
      type: 'blockContent',
      group: 'content',
      components: requiredField,
      validation: (Rule) =>
        Rule.required()
          .custom((value) => hasPortableTextContent(value) || '주요 법적 쟁점을 입력해주세요.')
          .error('주요 법적 쟁점을 입력해주세요.'),
    }),
    defineField({
      name: 'outcome',
      title: '사건 결과 상세',
      type: 'blockContent',
      group: 'content',
      components: requiredField,
      validation: (Rule) =>
        Rule.required()
          .custom((value) => hasPortableTextContent(value) || '사건 결과 상세를 입력해주세요.')
          .error('사건 결과 상세를 입력해주세요.'),
    }),
    defineField({
      name: 'publishedAt',
      title: '게시일',
      type: 'datetime',
      group: 'settings',
      description: '웹사이트 연동 후 공개 목록과 상세 페이지의 정렬 기준일로 사용할 날짜입니다.',
    }),
    defineField({
      name: 'featured',
      title: '주요 사례로 표시',
      type: 'boolean',
      group: 'settings',
      description: '향후 홈페이지나 강조 영역에 표시할 때 사용할 편집 설정입니다.',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: '노출 순서',
      type: 'number',
      group: 'settings',
      description: '수동 정렬을 사용할 때 낮은 숫자가 먼저 표시됩니다. 비워두면 날짜 기준 정렬을 사용합니다.',
      validation: (Rule) =>
        Rule.integer()
          .min(0)
          .error('노출 순서는 0 이상의 정수로 입력해주세요.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO 설정',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      result: 'result',
      publishedAt: 'publishedAt',
      media: 'mainImage.image',
    },
    prepare({title, category, result, publishedAt, media}) {
      const categoryTitle = category ? caseCategoryTitles[category] || '분야 미지정' : '분야 미지정'
      const subtitleItems = [categoryTitle, result, publishedAt?.slice(0, 10)].filter(Boolean)

      return {
        title: title || '제목 없음',
        subtitle: subtitleItems.join(' · '),
        media,
      }
    },
  },
  orderings: [
    {
      name: 'publishedAtDesc',
      title: '게시일 최신순',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      name: 'sortOrderAsc',
      title: '수동 노출 순서',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
    {
      name: 'titleAsc',
      title: '제목순',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
