import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Kabar Desa (Blog)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Gambar Utama (Cover)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Isi Berita',
      type: 'array',
      of: [
        { type: 'customBlock' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori Artikel',
      type: 'string',
      options: {
        list: [
          { title: 'Berita Utama', value: 'Berita Utama' },
          { title: 'UMKM & Potensi', value: 'UMKM' },
          { title: 'Kegiatan Warga', value: 'Kegiatan' },
        ],
        layout: 'radio', // Memaksa UI Sanity pakai radio button, mencegah human error
      },
      validation: (Rule) => Rule.required().error('Kategori wajib diisi!'),
    }),
  ],
})
