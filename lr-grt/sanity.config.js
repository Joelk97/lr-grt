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
          .title('Hauptseiten')
          .items([
            S.listItem()
              .title('Home page')
              .child(
                S.document()
                  .title('Inhalt Home')
                  .schemaType('homePage')
                  .id('9174b477-de0b-4b8f-9601-8839cd7dccf7')
              ),
            S.listItem()
              .title('Verein page')
              .child(
                S.list()
                  .title('Verein page')
                  .items([
                    S.listItem()
                      .title('Inhalt Verein')
                      .child(
                        S.document()
                          .title('Inhalt Verein')
                          .schemaType('vereinPage')
                          .id('c7aa830d-73d3-4991-9c2a-18af7940c6b6')
                      ),

                    S.listItem()
                      .title('Mitglieder')
                      .child(
                        S.documentList()
                          .title('Mitglieder')
                          .filter("_type == 'mitglieder'")
                          .defaultOrdering([{field: 'name', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('Kantonale Sektionen')
                      .child(
                        S.list()
                          .title('Kantonale Sektionen')
                          .items([
                            S.listItem()
                              .title('Einführung')
                              .child(
                                S.document()
                                  .title('Einführung')
                                  .schemaType('introCantSect')
                                  .id('77cc6064-73fc-4643-abd5-e8c294c369e6')
                              ),
                            S.listItem()
                              .title('Sektionen')
                              .child(
                                S.documentList()
                                  .title('Sektionen')
                                  .filter("_type == 'cantonalSections'")
                              ),
                          ])
                      ),
                  ])
              ),
            S.listItem()
              .title('Media page')
              .child(
                S.list()
                  .title('Media page')
                  .items([
                    S.listItem()
                      .title('Inhalt Media')
                      .child(
                        S.document()
                          .title('Inhalt Media')
                          .schemaType('mediaPage')
                          .id('ac5c3860-8446-491e-90a3-07596716ac51')
                      ),
                    S.listItem()
                      .title('Alle Artikel')
                      .child(S.documentList().title('Artikel').filter("_type == 'artikelMedia'")),
                    S.listItem()
                      .title('News')
                      .child(
                        S.documentList()
                          .title('News')
                          .filter(
                            "_type == 'artikelMedia' && category._ref == 'c8aab493-3eb0-4a05-a176-a2be877b9289'"
                          )
                          .defaultOrdering([{field: 'dateTime', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Medienmitteilungen')
                      .child(
                        S.documentList()
                          .title('Medienmitteilungen')
                          .filter(
                            "_type == 'artikelMedia' && category._ref=='43723136-be01-4b20-8ba5-4fcdf73cf2cd'"
                          )
                          .defaultOrdering([{field: 'dateTime', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Verfasser')
                      .child(S.documentList().title('Verfasser').filter("_type == 'author'")),
                  ])
              ),
            S.listItem()
              .title('Info page')
              .child(
                S.list()
                  .title('Info page')
                  .items([
                    S.listItem()
                      .title('Inhalt Info')
                      .child(
                        S.document()
                          .title('Inhalt Info')
                          .schemaType('infoPage')
                          .id('51fabaa4-9dd3-4c4c-841c-b8170ba421f2')
                      ),
                    S.listItem()
                      .title('Situation Wolf')
                      .child(
                        S.documentList()
                          .title('Situation Wolf')
                          .filter("_type == 'situationWolf'")
                          .defaultOrdering([{field: 'dateTime', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Politik')
                      .child(
                        S.list()
                          .title('Politik')
                          .items([
                            S.listItem()
                              .title('Kategorien Politik')
                              .child(
                                S.documentList()
                                  .title('Kategorien Politik')
                                  .filter("_type == 'catPolitics'")
                              ),
                            S.listItem()
                              .title('Politik Artikel')
                              .child(
                                S.documentList()
                                  .title('Politik Artikel')
                                  .filter("_type == 'politik'")
                                  .defaultOrdering([{field: 'dateTime', direction: 'desc'}])
                              ),
                          ])
                      ),
                  ])
              ),
            S.listItem()
              .title('Downloads')
              .child(
                S.document()
                  .title('Downloads')
                  .schemaType('downloadSect')
                  .id('99460a3c-a748-4f86-a312-429027aa3e8f')
              ),
          ]),
      /*.items([...S.documentTypeListItems().reverse()]),*/
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
