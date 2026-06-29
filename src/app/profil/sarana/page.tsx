import React from 'react';
import Image from 'next/image';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';

export const revalidate = 3600;

interface SaranaItem {
  _id: string;
  title: string;
  kategori: string;
  coverImage?: any;
  description?: string;
  lokasi?: string;
}

const SARANA_QUERY = `
  *[_type == "sarana"] | order(kategori asc, title asc) {
    _id,
    title,
    kategori,
    coverImage,
    description,
    lokasi
  }
`;

export default async function SaranaPage() {
  let fasilitas: SaranaItem[] = [];

  try {
    fasilitas = await client.fetch(SARANA_QUERY);
  } catch (error) {
    console.error("Error fetching sarana:", error);
  }

  // Extract unique categories so we can group them if needed, 
  // or we can just render one giant grid. Let's group them by category for a better editorial layout.
  const categories = Array.from(new Set(fasilitas.map(item => item.kategori)));

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          SARANA<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">& PRASARANA</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-md leading-relaxed">
            Fasilitas umum, infrastruktur, sarana pendidikan, dan tempat ibadah yang ada di wilayah Desa Podosoko.
          </p>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-900 mt-6 md:mt-0">
            TOTAL FASILITAS: {fasilitas.length.toString().padStart(2, '0')}
          </p>
        </div>
      </section>

      {/* 2. Categorized Wireframe Grid */}
      <section className="max-w-7xl mx-auto">
        {fasilitas.length === 0 ? (
          <div className="w-full border-y border-stone-300 py-32 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight mb-4">
              Data <span className="italic text-emerald-700">Kosong</span>
            </h2>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
              Belum ada data fasilitas yang dimasukkan.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-24">
            {categories.map((category) => {
              const categoryItems = fasilitas.filter((item) => item.kategori === category);
              
              return (
                <div key={category} className="w-full">
                  
                  {/* Category Brutalist Header */}
                  <div className="px-4 sm:px-6 lg:px-8 mb-12 border-b-2 border-stone-900 pb-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight uppercase">
                      {category}
                    </h2>
                  </div>

                  {/* Etalase Grid for this category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-300 border-y border-stone-300">
                    {categoryItems.map((item) => (
                      <div 
                        key={item._id}
                        className="group flex flex-col h-full bg-white hover:bg-stone-50 transition-colors"
                      >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] bg-stone-200 border-b border-stone-300 overflow-hidden">
                          {item.coverImage ? (
                            <Image 
                              src={urlForImage(item.coverImage).url()} 
                              alt={item.title} 
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">No Image</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content Block */}
                        <div className="p-8 lg:p-10 flex flex-col flex-grow">
                          
                          {/* Metadata Wireframe Header */}
                          <div className="flex items-center justify-between border-b border-stone-300 pb-4 mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                              Fasilitas
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 text-right truncate max-w-[150px]">
                              {item.lokasi || "Desa Podosoko"}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-serif text-2xl text-stone-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                            {item.title}
                          </h3>

                          {/* Description */}
                          {item.description && (
                            <p className="text-sm text-stone-500 leading-relaxed mb-6">
                              {item.description}
                            </p>
                          )}
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
