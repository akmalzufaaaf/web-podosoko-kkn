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
      S.listItem()
        .title('Pembangunan (Perencanaan & Transparansi)')
        .child(
          S.documentTypeList('pembangunan')
            .title('Data Pembangunan')
        ),
      S.divider(),
      // Kabar Desa (Berita Utama & Kegiatan only)
      S.listItem()
        .title('Kabar Desa')
        .id('kabarDesa')
        .child(
          S.documentList()
            .title('Kabar Desa')
            .filter('_type == "article" && kategori != "UMKM"')
        ),
      // Etalase UMKM (UMKM only)
      S.listItem()
        .title('Etalase UMKM')
        .id('etalaseUmkm')
        .child(
          S.documentList()
            .title('Etalase UMKM')
            .filter('_type == "article" && kategori == "UMKM"')
        ),
      S.divider(),
      // Remaining dynamic collections (exclude article since we split it above)
      ...S.documentTypeListItems().filter(
        (listItem) => !['profilDesa', 'layananSOP', 'mapMarker', 'article', 'pembangunan'].includes(listItem.getId() as string)
      ),
    ])
