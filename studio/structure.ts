import type {StructureResolver} from 'sanity/structure'

const caseStudyType = 'caseStudy'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('콘텐츠')
    .items([
      S.documentTypeListItem(caseStudyType)
        .title('수행사례')
        .child(
          S.documentTypeList(caseStudyType)
            .title('수행사례')
            .filter('_type == $type && !(_id in path("drafts.**"))')
            .params({type: caseStudyType})
            .initialValueTemplates([S.initialValueTemplateItem(caseStudyType)]),
        ),
      S.listItem()
        .title('작성 중인 글')
        .schemaType(caseStudyType)
        .child(
          S.documentList()
            .title('작성 중인 글')
            .schemaType(caseStudyType)
            .filter('_type == $type && _id in path("drafts.**")')
            .params({type: caseStudyType}),
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== caseStudyType),
    ])
