import React from 'react';
import Image from 'next/image';
import { client } from '../../../../../sanity/lib/client';
import { urlForImage } from '../../../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';

// Revalidate every hour
export const revalidate = 3600;

// Custom Brutalist components for PortableText rendering
const brutalistPortableTextComponents = {
  block: {
    // Normal paragraphs get a large, editorial serif-style reading size but keeping sans for legibility
    normal: ({ children }: any) => (
      <p className="text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-8 max-w-4xl">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mt-16 mb-8 border-b-2 border-stone-900 pb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-stone-900 mt-12 mb-6">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 md:pl-10 text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-8 max-w-4xl space-y-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 md:pl-10 text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-8 max-w-4xl space-y-4">
        {children}
      </ol>
    ),
  },
};

const PROFIL_QUERY = `*[_type == "profilDesa"][0] { 
  title, 
  sejarah, 
  visi,
  misi, 
  heroImage, 
  strukturOrganisasi 
}`;

export default async function ProfilSejarahPage() {
  const profil = await client.fetch(PROFIL_QUERY);

  // Fallbacks if data is missing
  const heroImageUrl = profil?.heroImage ? urlForImage(profil.heroImage).url() : null;
  const strukturImageUrl = profil?.strukturOrganisasi ? urlForImage(profil.strukturOrganisasi).url() : null;

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          PROFIL<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">DESA</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-sm">
            Dokumen Resmi Sejarah, Visi, Misi, dan Struktur Organisasi Desa Podosoko.
          </p>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-900 mt-4 md:mt-0">
            KEC. SAWANGAN — MAGELANG
          </p>
        </div>
      </section>

      {/* 2. Hero Image Wireframe */}
      {heroImageUrl && (
        <section className="w-full border-y border-stone-300 mb-20 md:mb-32">
          <div className="relative w-full aspect-[21/9] bg-stone-200">
            <Image 
              src={heroImageUrl} 
              alt="Pemandangan Desa Podosoko" 
              fill 
              priority
              sizes="100vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </section>
      )}

      {/* 3. Sejarah Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-6">
                Sejarah <span className="italic text-emerald-700">Desa</span>
              </h2>
              <div className="w-12 h-1 bg-stone-900 mb-8"></div>
              <p className="text-sm font-medium text-stone-500 uppercase tracking-widest leading-relaxed">
                Menelusuri jejak awal mula berdirinya Desa Podosoko dan perjalanan masyarakatnya dari masa ke masa.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 prose-brutalism">
            {profil?.sejarah ? (
              <PortableText value={profil.sejarah} components={brutalistPortableTextComponents} />
            ) : (
              <p className="text-xl text-stone-400 font-medium">Data sejarah belum tersedia di database Sanity.</p>
            )}
          </div>

        </div>
      </section>

      {/* 4. Visi & Misi Ledger Grid */}
      <section className="w-full border-t border-stone-300 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-300">
            
            {/* Visi Column */}
            <div className="py-24 lg:pr-24">
              <h2 className="text-6xl md:text-8xl font-serif text-stone-900 tracking-tighter mb-12">
                Visi.
              </h2>
              <div className="text-2xl md:text-3xl font-medium leading-relaxed text-stone-800">
                {profil?.visi ? (
                  <PortableText value={profil.visi} components={brutalistPortableTextComponents} />
                ) : (
                  <p className="text-stone-400">Visi belum tersedia.</p>
                )}
              </div>
            </div>

            {/* Misi Column */}
            <div className="py-24 lg:pl-24">
              <h2 className="text-6xl md:text-8xl font-serif text-stone-900 tracking-tighter mb-12">
                Misi.
              </h2>
              <div className="text-lg md:text-xl font-medium leading-relaxed text-stone-700">
                {profil?.misi ? (
                  <PortableText value={profil.misi} components={brutalistPortableTextComponents} />
                ) : (
                  <p className="text-stone-400">Misi belum tersedia.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Struktur Organisasi Blueprint */}
      {strukturImageUrl && (
        <section className="w-full border-t border-stone-300 bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-6">
                Struktur Organisasi
              </h2>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500">
                Bagan Kepemerintahan Desa Podosoko
              </p>
            </div>
            
            <div className="w-full border border-stone-300 p-4 md:p-8 bg-stone-50">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                <Image 
                  src={strukturImageUrl}
                  alt="Struktur Organisasi Desa Podosoko"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
