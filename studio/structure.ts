import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('content')
    .title('콘텐츠')
    .items([
      S.documentTypeListItem('caseStudy')
        .id('caseStudies')
        .title('수행사례')
        .child(
          S.documentTypeList('caseStudy')
            .id('publishedCaseStudies')
            .title('수행사례')
            .filter('_type == $type && !(_id in path("drafts.**"))')
            .params({type: 'caseStudy'})
            .initialValueTemplates([S.initialValueTemplateItem('caseStudy')]),
        ),
    ])
