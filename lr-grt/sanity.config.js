import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {
  dashboardTool,
  sanityTutorialsWidget,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'

export default defineConfig({
  name: 'default',
  title: 'lr-grt',

  projectId: 'imbz32xt',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Base')
          .items([...S.documentTypeListItems().reverse()]),
    }),
    visionTool(),
    dashboardTool({
      widgets: [sanityTutorialsWidget(), projectInfoWidget(), projectUsersWidget()],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
