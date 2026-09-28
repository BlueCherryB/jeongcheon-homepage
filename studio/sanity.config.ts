import {defineConfig, defineLocaleResourceBundle} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {LegalContentProcessorAction} from './components/LegalContentProcessorAction'
import './styles/studio.css'

const studioTextOverrides = defineLocaleResourceBundle({
  locale: 'en-US',
  namespace: 'studio',
  resources: {
    'inputs.portable-text.empty-placeholder': '',
  },
})

const caseStudyCategoryTemplates = [
  {
    id: 'caseStudy-criminal',
    title: '형사 수행사례',
    schemaType: 'caseStudy',
    value: {category: 'criminal'},
  },
  {
    id: 'caseStudy-civil',
    title: '민사 수행사례',
    schemaType: 'caseStudy',
    value: {category: 'civil'},
  },
  {
    id: 'caseStudy-family',
    title: '가사 수행사례',
    schemaType: 'caseStudy',
    value: {category: 'family'},
  },
  {
    id: 'caseStudy-advisory',
    title: '자문 수행사례',
    schemaType: 'caseStudy',
    value: {category: 'advisory'},
  },
]

export default defineConfig({
  name: 'default',
  title: 'Jeongcheon Law Office',

  projectId: '20zyfjea',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  i18n: {
    bundles: [studioTextOverrides],
  },

  schema: {
    types: schemaTypes,
    templates: (previousTemplates) => [
      ...previousTemplates,
      ...caseStudyCategoryTemplates,
    ],
  },

  document: {
    actions: (previousActions, context) =>
      context.schemaType === 'caseStudy' || context.schemaType === 'legalArticle'
        ? [...previousActions, LegalContentProcessorAction]
        : previousActions,
  },
})
