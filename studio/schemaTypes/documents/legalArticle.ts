import {defineField, defineType} from 'sanity'

const legalArticleCategoryTitles: Record<string, string> = {
  criminal: '형사',
  civil: '민사',
  family: '가사',
  general: '기타',
}

const legalArticleCategoryOptions = [
  {title: legalArticleCategoryTitles.criminal, value: 'criminal'},
  {title: legalArticleCategoryTitles.civil, value: 'civil'},
  {title: legalArticleCategoryTitles.family, value: 'family'},
  {title: legalArticleCategoryTitles.general, value: 'general'},
]

const sanityApiVersion = '2025-02-19'
const slugPattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/
const sequentialSlugPattern = /^legal_(\d+)$/

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

function isValidLegalArticleSlug(value: unknown): boolean {
  if (!value || typeof value !== 'object' || !('current' in value)) {
    return false
  }

  return typeof value.current === 'string' && slugPattern.test(value.current)
}

async function getNextLegalArticleSlug(context: InitialValueContext): Promise<string> {
  const client = context.getClient({apiVersion: sanityApiVersion})
  const slugs = await client.fetch<string[]>(
    `*[_type == "legalArticle" && defined(slug.current)].slug.current`,
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

  return `legal_${String(nextNumber).padStart(3, '0')}`
}

async function isUniqueLegalArticleSlug(
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
      _type == "legalArticle" &&
      slug.current == $slug &&
      !(_id in [$publishedId, $draftId])
    ][0]._id`,
    {
      slug,
      publishedId: documentId,
      draftId: `drafts.${documentId}`,
    },
  )

  return duplicateId ? '이미 사용 중인 법률 정보 주소입니다.' : true
}

function validateUniqueLegalArticleSlug(value: unknown, context: unknown): Promise<true | string> {
  return isUniqueLegalArticleSlug(value, context as ValidationContext)
}

export const legalArticle = defineType({
  name: 'legalArticle',
  title: '법률 정보',
  type: 'document',
  initialValue: async (_params, context) => ({
    slug: {
      _type: 'slug',
      current: await getNextLegalArticleSlug(context),
    },
  }),
  groups: [
    {name: 'basic', title: '기본 정보', default: true},
    {name: 'content', title: '본문'},
    {name: 'processing', title: '원문 관리'},
    {name: 'source', title: '출처'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: '주소',
      type: 'slug',
      group: 'basic',
      description: '문서 생성 시 자동으로 부여되는 상세 페이지 URL입니다.',
      hidden: true,
      readOnly: true,
      validation: (Rule) =>
        Rule.custom((value) =>
          !value || isValidLegalArticleSlug(value)
            ? true
            : '주소에는 영문 소문자, 숫자, 하이픈, 밑줄만 사용할 수 있습니다.',
        )
          .custom(validateUniqueLegalArticleSlug)
          .error('올바른 주소를 입력해 주세요.'),
    }),
    defineField({
      name: 'category',
      title: '분야',
      type: 'string',
      group: 'basic',
      options: {list: legalArticleCategoryOptions, layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '요약',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: '선택 입력입니다. 비워 두면 본문 첫 내용을 목록과 기본 SEO 설명으로 사용합니다.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'coverImage',
      title: '표지 이미지',
      type: 'contentImage',
      group: 'basic',
      description: '선택 입력입니다. 이미지 없이도 법률 정보를 게시할 수 있습니다.',
    }),
    defineField({
      name: 'rawSource',
      title: '원문 내용',
      type: 'text',
      rows: 18,
      group: 'processing',
      description:
        '한글 문서 등에서 복사한 원문을 그대로 붙여 넣습니다. 원문 자동 정리 기능은 이 내용을 바탕으로 본문을 채우며, 원문은 다시 정리할 수 있도록 보존됩니다.',
    }),
    defineField({
      name: 'body',
      title: '본문',
      type: 'blockContent',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: '출처',
      type: 'object',
      group: 'source',
      fields: [
        defineField({
          name: 'platform',
          title: '출처 플랫폼',
          type: 'string',
          description: '예: 국가법령정보센터, 대법원',
          validation: (Rule) => Rule.max(80),
        }),
        defineField({
          name: 'url',
          title: '출처 주소',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
      ],
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
      media: 'coverImage.image',
    },
    prepare({title, category, media}) {
      const categoryTitle = category ? legalArticleCategoryTitles[category] ?? '분야 미정' : '분야 미정'

      return {
        title: title ?? '제목 없음',
        subtitle: categoryTitle,
        media,
      }
    },
  },
})
