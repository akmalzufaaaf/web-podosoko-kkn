import Link from 'next/link'
import { client } from '../../../../../sanity/lib/client'

interface PembangunanDoc {
  _id: string;
  title: string;
  tahun: string;
  fileUrl?: string;
  url?: string;
}

const TRANSPARANSI_QUERY = `
  *[_type == "pembangunan" && kategori == "Transparansi"] | order(tahun desc) {
    _id,
    title,
    tahun,
    "fileUrl": file.asset->url,
    url
  }
`

export const revalidate = 3600;

export default async function TransparansiPage() {
  let docs: PembangunanDoc[] = [];

  try {
    docs = await client.fetch(TRANSPARANSI_QUERY);
  } catch (error) {
    console.error("Error fetching transparansi docs:", error);
  }

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-2 border-stone-900 pb-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
            Transparansi Anggaran
          </h1>
          <p className="text-sm text-stone-600">
            Arsip transparansi anggaran, realisasi, dan APBDes Desa Podosoko.
          </p>
        </div>

        <div className="prose prose-stone max-w-none">
          {docs.length === 0 ? (
            <p className="italic text-stone-500">Belum ada dokumen yang dipublikasikan.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-3">
              {docs.map((doc) => {
                const link = doc.fileUrl || doc.url || "#";
                return (
                  <li key={doc._id} className="text-stone-700 marker:text-stone-400">
                    <span className="font-medium">{doc.tahun}</span> : {doc.title} |{' '}
                    <a 
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 hover:underline font-medium"
                    >
                      Unduh disini
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
