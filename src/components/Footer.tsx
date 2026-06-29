import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-stone-300 mt-auto">
      {/* Top wireframe split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-300">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 py-16 md:pr-12">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-6">
              Desa <span className="italic text-emerald-700">Podosoko</span>
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed max-w-sm">
              Website resmi Pemerintah Desa Podosoko, Kecamatan Candimulyo, Kabupaten Magelang, Jawa Tengah. Platform digital untuk transparansi informasi, pelayanan publik, dan potensi desa.
            </p>
          </div>

          {/* Navigasi */}
          <div className="py-16 md:px-12">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900 mb-8">
              Navigasi
            </h3>
            <ul className="space-y-4 text-sm text-stone-600">
              <li><Link href="/" className="hover:text-emerald-700 transition-colors">Beranda</Link></li>
              <li><Link href="/profil/tentang" className="hover:text-emerald-700 transition-colors">Profil Desa</Link></li>
              <li><Link href="/informasi/kabar" className="hover:text-emerald-700 transition-colors">Kabar Terbaru</Link></li>
              <li><Link href="/umkm" className="hover:text-emerald-700 transition-colors">Potensi UMKM</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="py-16 md:pl-12">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900 mb-8">
              Kontak
            </h3>
            <ul className="space-y-4 text-sm text-stone-600">
              <li>Jl. Raya Podosoko No. 1</li>
              <li>Candimulyo, Magelang</li>
              <li>Jawa Tengah 56191</li>
              <li className="pt-4">
                <a href="mailto:pemdes@podosoko.desa.id" className="hover:text-emerald-700 transition-colors border-b border-transparent hover:border-emerald-700 pb-1">
                  pemdes@podosoko.desa.id
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Wireframe */}
      <div className="border-t border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Pemerintah Desa Podosoko.
          </p>
          <div className="text-[10px] text-stone-400 uppercase tracking-widest mt-4 md:mt-0">
            Soft Brutalism Architecture
          </div>
        </div>
      </div>
    </footer>
  );
}
