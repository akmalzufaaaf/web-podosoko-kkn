"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function AboutSection({ images = [] }: { images?: string[] }) {
  // Use CMS images if available, otherwise fall back to the local public images we just copied
  const img1 = images[0] || '/about-1.jpg'
  const img2 = images[1] || '/about-2.jpg'
  const img3 = images[2] || '/about-3.jpg'

  return (
    <section id="tentang-desa" className="w-full bg-stone-50">
      <div className="max-w-[85rem] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* Column 1: Typography & Story */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Eyebrow Label */}
            <div className="mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700">
                Tentang Desa
              </span>
            </div>
            
            {/* Massive Headline */}
            <h2 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
              <span className="text-stone-900 block">Mengenal</span>
              <span className="text-stone-400 block italic mt-1">Podosoko</span>
            </h2>
            
            {/* Body Copy */}
            <div className="space-y-6">
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                Terletak di jantung Kabupaten Magelang, Desa Podosoko merupakan perwujudan harmoni antara tradisi dan inovasi. Dengan lanskap alam yang memukau dan kekayaan budaya yang mengakar kuat, kami terus bergerak maju membangun komunitas yang inklusif dan berkelanjutan.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                Visi kami bukan sekadar menjaga warisan leluhur, melainkan memberdayakan setiap lapisan masyarakat—dari petani hingga pelaku UMKM—untuk menciptakan ekosistem desa yang tangguh di era digital.
              </p>
            </div>
            
            {/* Subtle Link CTA */}
            <div className="mt-10">
              <Link href="/profil/tentang" className="group inline-flex items-center text-sm font-semibold text-stone-900 hover:text-emerald-700 transition-colors uppercase tracking-widest">
                Baca Sejarah Lengkap 
                <span className="ml-3 block transition-transform duration-300 group-hover:translate-x-2 text-emerald-600">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Structural Bento Box (Mosaic) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="grid grid-cols-2 gap-4 lg:gap-6 relative"
          >
            {/* Left Column of Mosaic (Pushed down slightly for staggered effect) */}
            <div className="flex flex-col gap-4 lg:gap-6 mt-12 lg:mt-24">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl shadow-stone-200/50 group">
                <Image 
                  src={img1}
                  alt="Lanskap Podosoko"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Right Column of Mosaic */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 group">
                <Image 
                  src={img2}
                  alt="Pertanian Desa"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 group">
                <Image 
                  src={img3}
                  alt="Masyarakat Desa"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
