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
                    .initialValueTemplates([S.initialValueTemplateItem('caseStudy')]),
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
                    .initialValueTemplates([S.initialValueTemplateItem('caseStudy')]),
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
                    .initialValueTemplates([S.initialValueTemplateItem('caseStudy')]),
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
                    .initialValueTemplates([S.initialValueTemplateItem('caseStudy')]),
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
