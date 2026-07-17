import type {StructureResolver} from 'sanity/structure'

const caseStudyType = 'caseStudy'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('content')
    .title('콘텐츠')
    .items([
      S.documentTypeListItem(caseStudyType)
        .id('caseStudies')
        .title('수행사례')
        .child(
          S.documentTypeList(caseStudyType)
            .id('publishedCaseStudies')
            .title('수행사례')
            .filter('_type == $type && !(_id in path("drafts.**"))')
            .params({type: caseStudyType})
            .initialValueTemplates([S.initialValueTemplateItem(caseStudyType)]),
        ),
      S.listItem()
        .id('draftCaseStudies')
        .title('작성 중인 글')
        .schemaType(caseStudyType)
        .child(
          S.documentList()
            .id('draftCaseStudiesList')
            .title('작성 중인 글')
            .schemaType(caseStudyType)
            .filter('_type == $type && _id in path("drafts.**")')
            .params({type: caseStudyType}),
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== caseStudyType),
    ])
