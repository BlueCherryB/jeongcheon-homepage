import {defineArrayMember, defineField, defineType} from 'sanity'

const caseCategoryTitles: Record<string, string> = {
  criminal: '형사',
  civil: '민사',
  family: '이혼·가사',
}

const caseCategoryOptions = [
  {title: caseCategoryTitles.criminal, value: 'criminal'},
  {title: caseCategoryTitles.civil, value: 'civil'},
  {title: caseCategoryTitles.family, value: 'family'},
]

const sanityApiVersion = '2025-02-19'
const slugPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/
const sequentialSlugPattern = /^case_(\d+)$/

type InitialValueContext = {
  getClient: (options: {apiVersion: string}) => {
    fetch: <T>(query: string, params?: Record<string, unknown>) => Promise<T>
  }
}

type ValidationContext = InitialValueContext & {
  document?: {
    _id?: string
    featured?: boolean
    sortOrder?: number
  }
}

function hasDuplicateTags(tags: string[]): boolean {
  const normalizedTags = tags.map((tag) => tag.trim().toLocaleLowerCase())

  return normalizedTags.some((tag, index) => tag && normalizedTags.indexOf(tag) !== index)
}

function isValidCaseSlug(value: unknown): boolean {
  if (!value || typeof value !== 'object' || !('current' in value)) {
    return false
  }

  const slug = value.current

  return typeof slug === 'string' && slugPattern.test(slug)
}

async function getNextCaseStudySlug(context: InitialValueContext): Promise<string> {
  const client = context.getClient({apiVersion: sanityApiVersion})
  const slugs = await client.fetch<string[]>(
    `*[_type == "caseStudy" && defined(slug.current)].slug.current`,
  )
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

async function isUniqueCaseSlug(
  value: unknown,
  context: ValidationContext,
): Promise<true | string> {
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

async function validateFeaturedSortOrder(
  value: unknown,
  context: ValidationContext,
): Promise<true | string> {
  const document = context.document

  if (document?.featured !== true) {
    return true
  }

  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 5) {
    return '대표 사례로 노출하려면 1부터 5 사이의 메인 노출 순서를 입력해주세요.'
  }

  const documentId = document._id?.replace(/^drafts\./, '')

  if (!documentId) {
    return true
  }

  const client = context.getClient({apiVersion: sanityApiVersion})
  const duplicateCount = await client.fetch<number>(
    `count(*[
      _type == "caseStudy" &&
      featured == true &&
      sortOrder == $sortOrder &&
      !(_id in [$publishedId, $draftId])
    ])`,
    {
      sortOrder: value,
      publishedId: documentId,
      draftId: `drafts.${documentId}`,
    },
  )

  return duplicateCount > 0
    ? '같은 메인 노출 순서를 사용하는 대표 사례가 있습니다.'
    : true
}

function validateSortOrder(value: unknown, context: unknown): Promise<true | string> {
  return validateFeaturedSortOrder(value, context as ValidationContext)
}

export const caseStudy = defineType({
  name: 'caseStudy',
  title: '수행사례',
  type: 'document',
  __experimental_formPreviewTitle: false,
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
      validation: (Rule) => Rule.max(120).error('제목은 120자 이내로 입력해주세요.'),
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
        Rule.custom((value) =>
          !value || isValidCaseSlug(value)
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
    }),
    defineField({
      name: 'result',
      title: '사건 결과',
      type: 'string',
      group: 'basic',
      description: '목록과 상세 화면에서 강조할 사건 결과입니다. 예: 무혐의, 승소, 조정 성립',
      validation: (Rule) => Rule.max(120).error('사건 결과는 120자 이내로 입력해주세요.'),
    }),
    defineField({
      name: 'resultDetail',
      title: '세부 결과',
      type: 'string',
      group: 'basic',
      description: '결과 배지 아래에 작게 표시할 추가 결과를 입력합니다. 예: 위자료 3천만원, 집행유예, 벌금 감경',
      validation: (Rule) => Rule.max(120).error('세부 결과는 120자 이내로 입력해주세요.'),
    }),
    defineField({
      name: 'tags',
      title: '사건 태그',
      type: 'array',
      group: 'basic',
      description: '사기, 폭행, 형사합의 등 사건 키워드를 입력합니다.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) =>
            Rule.max(15).error('사건 태그는 15자 이내로 입력해주세요.').custom((value) => {
              if (typeof value !== 'string') {
                return true
              }

              if (!value.trim()) {
                return '빈 사건 태그는 입력할 수 없습니다.'
              }

              if (value !== value.trim()) {
                return '사건 태그의 앞뒤 공백을 제거해주세요.'
              }

              return true
            }),
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.max(5)
          .error('사건 태그는 최대 5개까지 입력할 수 있습니다.')
          .custom((value) => {
            if (!Array.isArray(value)) {
              return true
            }

            const tags = value.filter((tag): tag is string => typeof tag === 'string')

            return hasDuplicateTags(tags)
              ? '중복된 사건 태그가 있습니다. 하나만 남겨주세요.'
              : true
          }),
    }),
    defineField({
      name: 'mainImage',
      title: '대표 이미지',
      type: 'object',
      group: 'basic',
      description: '홈페이지, 수행사례 목록, 상세 페이지에 사용할 수 있는 이미지입니다.',
      fields: [
        defineField({
          name: 'image',
          title: '이미지',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      preview: {
        select: {
          media: 'image',
        },
        prepare({media}) {
          return {
            media,
            title: '판결문 이미지',
          }
        },
      },
    }),
    defineField({
      name: 'overview',
      title: '사건 개요',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'legalIssues',
      title: '주요 법적 쟁점',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'outcome',
      title: '사건 결과 상세',
      type: 'blockContent',
      group: 'content',
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
      title: '메인 대표 사례로 노출',
      type: 'boolean',
      group: 'settings',
      description: '향후 홈페이지나 강조 영역에 표시할 때 사용할 편집 설정입니다.',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: '메인 노출 순서',
      type: 'number',
      group: 'settings',
      description:
        '대표 사례로 노출할 때 1부터 5 사이의 순서를 입력합니다.',
      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .max(5)
          .custom(validateSortOrder)
          .error('메인 노출 순서는 1부터 5 사이의 정수로 입력해주세요.'),
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
      featured: 'featured',
      sortOrder: 'sortOrder',
      media: 'mainImage.image',
    },
    prepare({title, category, result, publishedAt, featured, sortOrder, media}) {
      const categoryTitle = category ? caseCategoryTitles[category] || '분야 미지정' : '분야 미지정'
      const subtitleItems = [categoryTitle, result, publishedAt?.slice(0, 10)].filter(Boolean)
      const previewTitle =
        featured && typeof sortOrder === 'number'
          ? `[대표 ${sortOrder}] ${title || '제목 없음'}`
          : title || '제목 없음'

      return {
        title: previewTitle,
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
