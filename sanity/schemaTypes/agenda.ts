import { defineField, defineType } from 'sanity'

export const agenda = defineType({
  name: 'agenda',
  title: 'Agenda Kegiatan',
  type: 'document',
  fields: [
    defineField({
      name: 'eventName',
      title: 'Nama Kegiatan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Tanggal & Waktu',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokasi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    }),
  ],
})
