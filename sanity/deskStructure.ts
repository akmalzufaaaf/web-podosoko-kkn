import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Sistem Informasi Desa')
    .items([
      // Grouping Singletons under a Folder
      S.listItem()
        .title('Informasi Desa (Tetap)')
        .child(
          S.list()
            .title('Informasi Desa')
            .items([
              // Singleton: Profil Desa
              S.listItem()
                .title('Profil Desa')
                .id('profilDesa')
                .child(
                  S.document()
                    .schemaType('profilDesa')
                    .documentId('profilDesa')
                ),
              // Singleton: Layanan & SOP
              S.listItem()
                .title('Layanan & SOP')
                .id('layananSOP')
                .child(
                  S.document()
                    .schemaType('layananSOP')
                    .documentId('layananSOP')
                ),
            ])
        ),
      S.divider(),
      // Dynamic Collections
      ...S.documentTypeListItems().filter(
        (listItem) => !['profilDesa', 'layananSOP'].includes(listItem.getId() as string)
      ),
    ])
