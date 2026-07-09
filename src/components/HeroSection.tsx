'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection({ title, imageUrl }: { title?: string, imageUrl: string }) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Image with Scale Animation */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image 
          src={imageUrl}
          alt={title || "Hero Image"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark Gradient Overlay to ensure pristine white typography pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-stone-900/30"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-serif text-white mb-8 tracking-tight leading-[1.05] drop-shadow-2xl"
        >
          Podosoko
        </motion.h1>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-stone-200 font-sans font-light max-w-3xl leading-relaxed mb-16 drop-shadow-md"
        >
          Mewujudkan desa mandiri, transparan, dan berdaya saing melalui digitalisasi informasi.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#tentang-desa"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-stone-950 font-sans font-bold tracking-[0.15em] uppercase text-sm rounded-full hover:bg-stone-200 transition-colors duration-300 shadow-2xl"
          >
            Jelajahi Desa
          </a>
        </motion.div>
      </div>
    </section>
  )
}
