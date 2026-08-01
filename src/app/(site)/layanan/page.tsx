import React from 'react';
import { client } from '../../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

interface LayananItem {
  namaLayanan: string;
  prosedur: any;
}

interface LayananSOP {
  jamOperasional: string;
  daftarLayanan: LayananItem[];
}

const LAYANAN_QUERY = `
  *[_type == "layananSOP"][0] {
    jamOperasional,
    daftarLayanan
  }
`;

// Brutalist components for PortableText rendering
const brutalistPortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-6">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 border-b-2 border-stone-900 pb-2 tracking-tight">
        {children}
      </h2>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 md:pl-8 text-lg font-medium leading-relaxed text-stone-700 mb-6 space-y-3">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 md:pl-8 text-lg font-medium leading-relaxed text-stone-700 mb-6 space-y-3">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-2 marker:text-stone-900">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="pl-2 marker:text-stone-900 font-bold">{children}</li>
    ),
  },
};

export default async function LayananPage() {
  let layananData: LayananSOP | null = null;

  try {
    layananData = await client.fetch(LAYANAN_QUERY);
  } catch (error) {
    console.error("Error fetching layanan:", error);
  }

  const jamOperasional = layananData?.jamOperasional || "Senin - Jumat, 08:00 - 15:00";
  const daftarLayanan = layananData?.daftarLayanan || [];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          LAYANAN<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">& S.O.P</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-md leading-relaxed">
            Standar Operasional Prosedur pelayanan publik Pemerintah Desa Podosoko. Persiapkan dokumen Anda sebelum berkunjung.
          </p>
          <div className="mt-6 md:mt-0 md:text-right">
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-1">
              JAM OPERASIONAL
            </p>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-900">
              {jamOperasional}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Layanan Wireframe Ledger */}
      <section className="w-full border-t border-stone-300 bg-stone-50">
        {daftarLayanan.length === 0 ? (
          <div className="w-full py-32 flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto border-x border-stone-300">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight mb-4">
              Layanan <span className="italic text-emerald-700">Kosong</span>
            </h2>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
              Belum ada prosedur layanan yang diunggah.
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col divide-y divide-stone-300 border-x border-stone-300 bg-white">
              
              {daftarLayanan.map((item, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-300 group hover:bg-stone-50 transition-colors duration-500"
                >
                  
                  {/* Left Column: Service Name */}
                  <div className="lg:col-span-5 p-8 lg:p-16 flex flex-col">
                    <div className="mb-6">
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400 border border-stone-300 px-3 py-1">
                        S.O.P — {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                      {item.namaLayanan}
                    </h2>
                  </div>

                  {/* Right Column: Procedure Steps */}
                  <div className="lg:col-span-7 p-8 lg:p-16 prose-brutalism bg-white group-hover:bg-transparent transition-colors duration-500">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-900 mb-8 pb-4 border-b-2 border-stone-900">
                      Persyaratan & Prosedur
                    </h3>
                    
                    {item.prosedur ? (
                      <PortableText value={item.prosedur} components={brutalistPortableTextComponents} />
                    ) : (
                      <p className="text-lg text-stone-400 font-medium italic">
                        Prosedur belum tersedia.
                      </p>
                    )}
                  </div>

                </div>
              ))}

            </div>
          </div>
        )}
      </section>

    </main>
  );
}
