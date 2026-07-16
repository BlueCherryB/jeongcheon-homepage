import {defineConfig, defineLocaleResourceBundle} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import './styles/studio.css'

const studioTextOverrides = defineLocaleResourceBundle({
  locale: 'en-US',
  namespace: 'studio',
  resources: {
    'inputs.portable-text.empty-placeholder': '',
  },
})

export default defineConfig({
  name: 'default',
  title: 'Jeongcheon Law Office',

  projectId: '20zyfjea',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  i18n: {
    bundles: [studioTextOverrides],
  },

  schema: {
    types: schemaTypes,
  },
})
