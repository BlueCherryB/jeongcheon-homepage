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
      S.listItem()
        .id('featuredCaseStudies')
        .title('메인 대표 사례')
        .schemaType('caseStudy')
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
            ]),
        ),
    ])
