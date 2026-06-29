import { defineField, defineType } from 'sanity'

export const profilDesa = defineType({
  name: 'profilDesa',
  title: 'Profil Desa',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Profil Desa',
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Utama (Hero Website)',
      type: 'image',
      description: 'Gambar ini akan ditampilkan di bagian paling atas halaman utama website.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sejarah',
      title: 'Sejarah Desa',
      type: 'array',
      of: [{ type: 'customBlock' }],
    }),
    defineField({
      name: 'visi',
      title: 'Visi Desa',
      type: 'array',
      of: [{ type: 'customBlock' }],
    }),
    defineField({
      name: 'misi',
      title: 'Misi Desa',
      type: 'array',
      of: [{ type: 'customBlock' }],
    }),
    defineField({
      name: 'strukturOrganisasi',
      title: 'Bagan Struktur Organisasi',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutImages',
      title: 'Gambar Tentang Desa (Bento Box)',
      description: 'Upload maksimal 3 gambar untuk ditampilkan di bagian Tentang Desa.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
})
