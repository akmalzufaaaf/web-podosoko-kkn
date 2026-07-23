import Link from 'next/link'
import { client } from '../../../../../sanity/lib/client'
import PerencanaanTabs from '@/components/PerencanaanTabs'

interface PembangunanDoc {
  _id: string;
  title: string;
  tahun: string;
  jenisPerencanaan?: string;
  fileUrl?: string;
  url?: string;
}

const PERENCANAAN_QUERY = `
  *[_type == "pembangunan" && kategori == "Perencanaan"] | order(tahun desc) {
    _id,
    title,
    tahun,
    jenisPerencanaan,
    "fileUrl": file.asset->url,
    url
  }
`

export const revalidate = 3600;

export default async function PerencanaanPage() {
  let docs: PembangunanDoc[] = [];

  try {
    docs = await client.fetch(PERENCANAAN_QUERY);
  } catch (error) {
    console.error("Error fetching perencanaan docs:", error);
  }

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-2 border-stone-900 pb-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
            Perencanaan Pembangunan
          </h1>
          <p className="text-sm text-stone-600">
            Arsip dokumen perencanaan pembangunan Desa Podosoko (RPJMDes, RKPDes, dan lainnya).
          </p>
        </div>

        <PerencanaanTabs docs={docs} />
      </section>
    </main>
  )
}
