import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client } from '../../../../../../sanity/lib/client';
import { urlForImage } from '../../../../../../sanity/lib/image';

// Revalidate every hour
export const revalidate = 3600;

const ARTICLE_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    kategori,
    author,
    body
  }
`;

// Brutalist components for PortableText
const brutalistPortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-8 max-w-3xl">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mt-16 mb-8 border-b-2 border-stone-900 pb-4 tracking-tight max-w-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-stone-900 mt-12 mb-6 max-w-3xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-stone-900 pl-6 my-10 italic text-2xl font-serif text-stone-800 max-w-3xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 md:pl-10 text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-8 max-w-3xl space-y-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 md:pl-10 text-lg md:text-xl font-medium leading-relaxed text-stone-700 mb-8 max-w-3xl space-y-4">
        {children}
      </ol>
    ),
  },
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // In Next.js 15, params might be a promise. Next 14/13 it's an object. 
  // We'll await it just in case to be compatible with newer Next versions.
  const resolvedParams = await Promise.resolve(params);
  
  const article = await client.fetch(ARTICLE_QUERY, { slug: resolvedParams.slug });

  if (!article) {
    notFound();
  }

  const imageUrl = article.coverImage ? urlForImage(article.coverImage).url() : null;
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-32">
      
      {/* 1. Article Masthead */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <Link 
          href="/informasi/kabar" 
          className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors mb-12"
        >
          ← KEMBALI KE ARSIP
        </Link>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight text-stone-900 mb-12 max-w-5xl">
          {article.title}
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t-2 border-stone-900 pt-6">
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-2">Penulis</p>
              <p className="text-sm font-bold tracking-widest uppercase text-stone-900">
                {article.author || "ADMIN DESA"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-2">Kategori</p>
              <p className="text-sm font-bold tracking-widest uppercase text-emerald-700">
                {article.kategori || "BERITA"}
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 md:text-right">Diterbitkan Pada</p>
            <p className="text-sm font-bold tracking-widest uppercase text-stone-900 md:text-right">
              {publishedDate}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hero Image Wireframe */}
      {imageUrl && (
        <section className="w-full border-y border-stone-300 mb-16 md:mb-24">
          <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-stone-200">
            <Image 
              src={imageUrl} 
              alt={article.title} 
              fill 
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* 3. Article Content (Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Metadata / Share / Navigation */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <div className="w-12 h-1 bg-stone-900 mb-8"></div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">
                Bagikan Artikel
              </p>
              <div className="flex flex-col gap-4">
                <button className="text-left text-xs font-bold tracking-widest uppercase text-stone-900 hover:text-emerald-700 transition-colors">
                  Salin Tautan
                </button>
                <button className="text-left text-xs font-bold tracking-widest uppercase text-stone-900 hover:text-emerald-700 transition-colors">
                  Cetak Dokumen
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: PortableText Body */}
          <div className="lg:col-span-9 prose-brutalism">
            {article.body ? (
              <PortableText value={article.body} components={brutalistPortableTextComponents} />
            ) : (
              <p className="text-xl text-stone-400 font-medium">Konten artikel belum tersedia.</p>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
