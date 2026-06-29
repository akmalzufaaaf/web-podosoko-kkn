import { defineField, defineType } from 'sanity'

export const sarana = defineType({
  name: 'sarana',
  title: 'Sarana & Prasarana',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Fasilitas / Infrastruktur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Fasilitas Umum', value: 'Fasilitas Umum' },
          { title: 'Kesehatan', value: 'Kesehatan' },
          { title: 'Pendidikan', value: 'Pendidikan' },
          { title: 'Ibadah', value: 'Ibadah' },
          { title: 'Infrastruktur Desa', value: 'Infrastruktur Desa' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto Fasilitas',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'lokasi',
      title: 'Lokasi (Dusun / Jalan)',
      type: 'string',
    }),
  ],
})
