import { defineField, defineType } from 'sanity'

export const statistic = defineType({
  name: 'statistic',
  title: 'Data Statistik',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Pendidikan', value: 'Pendidikan' },
          { title: 'Pekerjaan', value: 'Pekerjaan' },
          { title: 'Sarana & Prasarana', value: 'Sarpras' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label/Judul Data',
      type: 'string',
      description: 'Contoh: SD/MI, Petani, Masjid',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'count',
      title: 'Jumlah',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
