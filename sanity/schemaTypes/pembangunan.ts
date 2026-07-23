import { defineField, defineType } from 'sanity'

export const pembangunan = defineType({
  name: 'pembangunan',
  title: 'Pembangunan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Dokumen',
      type: 'string',
      description: 'Misal: APBDesa 2024 atau RKP 2023',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Perencanaan', value: 'Perencanaan' },
          { title: 'Transparansi', value: 'Transparansi' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jenisPerencanaan',
      title: 'Jenis Perencanaan',
      type: 'string',
      description: 'Hanya diisi jika Kategori = Perencanaan',
      options: {
        list: [
          { title: 'Master Plan', value: 'Master Plan' },
          { title: 'RPJM', value: 'RPJM' },
          { title: 'RKP', value: 'RKP' },
        ],
        layout: 'radio',
      },
      hidden: ({ document }) => document?.kategori !== 'Perencanaan',
    }),
    defineField({
      name: 'tahun',
      title: 'Tahun',
      type: 'string',
      description: 'Misal: 2024',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File Dokumen',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.jpg,.png',
      },
      description: 'Unggah file dokumen (PDF/Gambar)',
    }),
    defineField({
      name: 'url',
      title: 'Tautan Eksternal',
      type: 'url',
      description: 'Opsional: Tautan ke Google Drive atau website lain jika tidak mengunggah file',
    }),
  ],
})
