"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export interface Article {
  _id: string;
  title: string;
  kategori?: string;
  publishedAt: string;
  imageUrl?: string;
  excerpt?: any;
  slug?: { current: string };
}

export function getExcerpt(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  const block = blocks.find((b) => b._type === "block" && b.style === "normal");
  if (!block || !block.children) return "";
  return block.children.map((child: any) => child.text).join("");
}

export default function AnimatedNewsGrid({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null

  // Ensure we only take the top 3 for the uniform grid
  const displayArticles = articles.slice(0, 3)

  return (
    <section className="relative overflow-hidden w-full bg-stone-50" id="kabar-terbaru">
      
      {/* Layer 2 (The Floor): The Noise Background */}
      <div className="noise-bg absolute inset-0 z-0 opacity-20 pointer-events-none"></div>
      
      {/* Layer 3 (The Content): Elevated Z-Index to protect interactivity */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Brutalist Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
              <span className="text-stone-900 block">Kabar</span>
              <span className="text-emerald-700 block italic mt-1">Terbaru</span>
            </h2>
            <p className="mt-6 text-stone-600 font-sans text-sm md:text-base border-l-2 border-stone-900 pl-4">
              Cerita, berita, dan perkembangan terkini dari Desa Podosoko.
            </p>
          </div>
          <Link href="/informasi/kabar" className="hidden md:inline-flex items-center text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors uppercase tracking-[0.2em] border-b-2 border-stone-900 hover:border-emerald-700 pb-1 mt-8 md:mt-0">
            Jelajahi <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Wireframe 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-300 border-y border-stone-300">
          {displayArticles.map((article, index) => {
            return (
              <motion.div 
                key={article._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className="group flex flex-col h-full bg-transparent px-6 lg:px-10 pt-16 pb-16 lg:pb-20"
              >
                <Link href={article.slug?.current ? `/informasi/kabar/${article.slug.current}` : '#'} className="flex flex-col h-full cursor-pointer">
                  {/* 1. Title (Top of flow) */}
                  <h3 className="text-2xl font-serif text-stone-900 line-clamp-2 mb-6 group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>

                  {/* 2. Image (Grayscale by default, full width of wireframe cell) */}
                  <div className="relative aspect-[4/3] overflow-hidden w-full bg-stone-200">
                    {article.imageUrl ? (
                      <Image 
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0}
                        className="object-cover transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium text-sm">Image Not Found</div>
                    )}
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-col flex-1">
                    
                    {/* 3. Excerpt */}
                    {article.excerpt && (
                      <p className="mt-6 text-sm text-stone-600 font-sans line-clamp-4">
                        {typeof article.excerpt === 'string' 
                          ? article.excerpt 
                          : getExcerpt(article.excerpt)}
                      </p>
                    )}

                    {/* 4. Metadata Footer */}
                    <div className="mt-auto pt-8 flex items-center gap-3">
                      {/* Brutalist taxonomy badge with Emerald Accent */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 border border-emerald-200 bg-emerald-50 px-2 py-1">
                        {article.kategori || 'Info'}
                      </span>
                      <span className="text-xs font-semibold text-stone-500 font-sans tracking-wider uppercase">
                        {new Date(article.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
        
        {/* Mobile Only "Lihat Semua" */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link href="/informasi/kabar" className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors uppercase tracking-widest border-b-2 border-stone-900 hover:border-emerald-700 pb-1">
            Jelajahi Semua Kabar <span className="ml-2 leading-none">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
