import type {StructureResolver} from 'sanity/structure'

const caseStudyTemplateIds = {
  all: 'caseStudy',
  criminal: 'caseStudy-criminal',
  civil: 'caseStudy-civil',
  family: 'caseStudy-family',
  advisory: 'caseStudy-advisory',
} as const

function canHandleCaseStudyIntent(templateId: string) {
  return (intentName: string, params: Record<string, string | undefined>) =>
    params.type === 'caseStudy' &&
    (intentName === 'edit' ||
      (intentName === 'create' && params.template === templateId))
}

function canHandleCaseStudyEdit(
  intentName: string,
  params: Record<string, string | undefined>,
) {
  return intentName === 'edit' && params.type === 'caseStudy'
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id('content')
    .title('콘텐츠')
    .items([
      S.listItem()
        .id('caseStudies')
        .title('수행 사례')
        .child(
          S.list()
            .id('caseStudyCategories')
            .title('수행사례')
            .items([
              S.listItem()
                .id('allCaseStudies')
                .title('전체')
                .schemaType('caseStudy')
                .child(
                  S.documentList()
                    .id('allCaseStudiesList')
                    .title('전체')
                    .schemaType('caseStudy')
                    .filter('_type == $type && !(_id in path("drafts.**"))')
                    .params({type: 'caseStudy'})
                    .defaultOrdering([
                      {field: 'caseType.title', direction: 'asc'},
                      {field: 'title', direction: 'asc'},
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem(caseStudyTemplateIds.all),
                    ])
                    .canHandleIntent(
                      canHandleCaseStudyIntent(caseStudyTemplateIds.all),
                    ),
                ),
              S.listItem()
                .id('criminalCaseStudies')
                .title('형사')
                .schemaType('caseStudy')
                .child(
                  S.documentList()
                    .id('criminalCaseStudiesList')
                    .title('형사')
                    .schemaType('caseStudy')
                    .filter('_type == $type && !(_id in path("drafts.**")) && category == $category')
                    .params({type: 'caseStudy', category: 'criminal'})
                    .defaultOrdering([
                      {field: 'caseType.title', direction: 'asc'},
                      {field: 'title', direction: 'asc'},
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem(caseStudyTemplateIds.criminal),
                    ])
                    .canHandleIntent(
                      canHandleCaseStudyIntent(caseStudyTemplateIds.criminal),
                    ),
                ),
              S.listItem()
                .id('civilCaseStudies')
                .title('민사')
                .schemaType('caseStudy')
                .child(
                  S.documentList()
                    .id('civilCaseStudiesList')
                    .title('민사')
                    .schemaType('caseStudy')
                    .filter('_type == $type && !(_id in path("drafts.**")) && category == $category')
                    .params({type: 'caseStudy', category: 'civil'})
                    .defaultOrdering([
                      {field: 'caseType.title', direction: 'asc'},
                      {field: 'title', direction: 'asc'},
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem(caseStudyTemplateIds.civil),
                    ])
                    .canHandleIntent(
                      canHandleCaseStudyIntent(caseStudyTemplateIds.civil),
                    ),
                ),
              S.listItem()
                .id('familyCaseStudies')
                .title('가사')
                .schemaType('caseStudy')
                .child(
                  S.documentList()
                    .id('familyCaseStudiesList')
                    .title('가사')
                    .schemaType('caseStudy')
                    .filter('_type == $type && !(_id in path("drafts.**")) && category == $category')
                    .params({type: 'caseStudy', category: 'family'})
                    .defaultOrdering([
                      {field: 'caseType.title', direction: 'asc'},
                      {field: 'title', direction: 'asc'},
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem(caseStudyTemplateIds.family),
                    ])
                    .canHandleIntent(
                      canHandleCaseStudyIntent(caseStudyTemplateIds.family),
                    ),
                ),
              S.listItem()
                .id('advisoryCaseStudies')
                .title('자문')
                .schemaType('caseStudy')
                .child(
                  S.documentList()
                    .id('advisoryCaseStudiesList')
                    .title('자문')
                    .schemaType('caseStudy')
                    .filter('_type == $type && !(_id in path("drafts.**")) && category == $category')
                    .params({type: 'caseStudy', category: 'advisory'})
                    .defaultOrdering([
                      {field: 'caseType.title', direction: 'asc'},
                      {field: 'title', direction: 'asc'},
                    ])
                    .initialValueTemplates([
                      S.initialValueTemplateItem(caseStudyTemplateIds.advisory),
                    ])
                    .canHandleIntent(
                      canHandleCaseStudyIntent(caseStudyTemplateIds.advisory),
                    ),
                ),
            ]),
        ),
      S.documentTypeListItem('caseType')
        .id('caseTypes')
        .title('사건 유형 관리')
        .child(
          S.documentTypeList('caseType')
            .id('caseTypesList')
            .title('사건 유형 관리')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
            .initialValueTemplates([S.initialValueTemplateItem('caseType')]),
        ),
      S.listItem()
        .id('featuredCaseStudies')
        .title('메인 대표 사례')
        .child(
          S.documentList()
            .id('featuredCaseStudiesList')
            .title('메인 대표 사례')
            .schemaType('caseStudy')
            .filter('_type == $type && !(_id in path("drafts.**")) && featured == true')
            .params({type: 'caseStudy'})
            .defaultOrdering([
              {field: 'sortOrder', direction: 'asc'},
              {field: 'publishedAt', direction: 'desc'},
            ])
            .initialValueTemplates([])
            .canHandleIntent(canHandleCaseStudyEdit),
        ),
      S.documentTypeListItem('legalArticle')
        .id('legalArticles')
        .title('법률 정보')
        .child(
          S.documentTypeList('legalArticle')
            .id('legalArticlesList')
            .title('법률 정보')
            .initialValueTemplates([S.initialValueTemplateItem('legalArticle')]),
        ),
    ])
