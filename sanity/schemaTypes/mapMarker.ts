import { defineField, defineType } from 'sanity'

export const mapMarker = defineType({
  name: 'mapMarker',
  title: 'Peta (Titik Lokasi)',
  type: 'document',
  fields: [
    defineField({
      name: 'pointName',
      title: 'Nama Titik',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coordinate',
      title: 'Koordinat Lokasi',
      type: 'geopoint',
      description: 'Gunakan peta untuk menentukan titik koordinat, tidak perlu ketik manual.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'UMKM', value: 'UMKM' },
          { title: 'Bencana', value: 'Bencana' },
          { title: 'Evakuasi', value: 'Evakuasi' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Foto Lokasi (Opsional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
