import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '20zyfjea',
    dataset: 'production'
  },
  studioHost: 'jeongcheon-law-office',
  deployment: {
    appId: 'a9mcgiv6vht577izlwi0g1cq',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
