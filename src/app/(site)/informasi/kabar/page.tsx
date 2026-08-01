import Image from 'next/image'
import Link from 'next/link'
import { client } from '../../../../../sanity/lib/client'
import { urlForImage } from '../../../../../sanity/lib/image'

interface Article {
  _id: string;
  title: string;
  kategori?: string;
  publishedAt: string;
  coverImage?: any;
  slug?: { current: string };
  body?: any;
}

const ARTICLES_QUERY = `
  *[_type == "article" && kategori != "UMKM"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    kategori,
    body
  }
`

export const revalidate = 3600;

export function getExcerpt(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  const block = blocks.find((b) => b._type === "block" && b.style === "normal");
  if (!block || !block.children) return "";
  const text = block.children.map((child: any) => child.text).join("");
  return text.length > 120 ? text.substring(0, 120) + "..." : text;
}

export default async function KabarPage() {
  let articles: Article[] = [];

  try {
    articles = await client.fetch(ARTICLES_QUERY);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 pb-16">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          KABAR<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">TERBARU</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-md leading-relaxed">
            Arsip berita, pengumuman resmi, dan kegiatan terkini dari Pemerintah Desa Podosoko.
          </p>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-900 mt-6 md:mt-0">
            TOTAL ARSIP: {articles.length.toString().padStart(2, '0')}
          </p>
        </div>
      </section>

      {/* 2. Kabar Wireframe Grid */}
      <section className="max-w-7xl mx-auto">
        {articles.length === 0 ? (
          <div className="w-full border-y border-stone-300 py-32 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight mb-4">
              Arsip <span className="italic text-emerald-700">Kosong</span>
            </h2>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
              Belum ada berita yang dipublikasikan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-300 border-y border-stone-300">
            {articles.map((article) => {
              const excerpt = getExcerpt(article.body);
              
              return (
                <Link 
                  href={article.slug?.current ? `/informasi/kabar/${article.slug.current}` : '#'} 
                  key={article._id}
                  className="group flex flex-col h-full bg-white hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-stone-200 border-b border-stone-300 overflow-hidden">
                    {article.coverImage ? (
                      <Image 
                        src={urlForImage(article.coverImage).url()} 
                        alt={article.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-all duration-700" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100">
                        <svg className="w-10 h-10 text-stone-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-300">{article.kategori || 'Berita'}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Block */}
                  <div className="p-8 lg:p-10 flex flex-col flex-grow">
                    
                    {/* Metadata Wireframe Header */}
                    <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                        {article.kategori || "BERITA"}
                      </span>
                      <time className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                        {new Date(article.publishedAt).toLocaleDateString('en-GB', { 
                          day: '2-digit', month: 'short', year: 'numeric' 
                        }).replace(/ /g, ' ').toUpperCase()}
                      </time>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-serif text-2xl lg:text-3xl text-stone-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    {excerpt && (
                      <p className="text-sm text-stone-500 leading-relaxed mb-8">
                        {excerpt}
                      </p>
                    )}
                    
                    {/* Footer Arrow */}
                    <div className="mt-auto pt-4 flex items-center border-t border-stone-200">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 group-hover:text-emerald-700 transition-colors">
                        Baca Selengkapnya <span className="ml-2 font-serif text-lg leading-none">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  )
}
