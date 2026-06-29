import { defineField, defineType } from 'sanity'

export const layananSOP = defineType({
  name: 'layananSOP',
  title: 'Layanan & SOP',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Layanan & SOP',
    }),
    defineField({
      name: 'jamOperasional',
      title: 'Jam Operasional',
      type: 'string',
      description: 'Contoh: Senin - Jumat, 08:00 - 15:00',
    }),
    defineField({
      name: 'daftarLayanan',
      title: 'Daftar Layanan',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'layananItem',
          title: 'Layanan',
          fields: [
            defineField({
              name: 'namaLayanan',
              title: 'Nama Layanan',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'prosedur',
              title: 'Prosedur',
              type: 'array',
              of: [{ type: 'customBlock' }],
            }),
          ],
        },
      ],
    }),
  ],
})
