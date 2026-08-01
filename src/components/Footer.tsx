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
              Website resmi Pemerintah Desa Podosoko, Kecamatan Sawangan, Kabupaten Magelang, Jawa Tengah. Platform digital untuk transparansi informasi, pelayanan publik, dan potensi desa.
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
            <ul className="space-y-2 text-sm text-stone-600">
              <li>Alamat : Bulu lor, Podosoko, Sawangan, Magelang, Jawa Tengah 56511</li>
              <li className="pt-2">
                <a href="tel:+6285228889169" className="hover:text-emerald-700 transition-colors border-b border-transparent hover:border-emerald-700 pb-1">
                  +62 852-2888-9169
                </a>
              </li>
              <li className="pt-2 flex items-center gap-4">
                <a href="https://www.facebook.com/share/1J9bvfqZvj/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-blue-600 transition-colors" aria-label="Facebook Desa Podosoko">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://wa.me/6285228889169" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-green-600 transition-colors" aria-label="WhatsApp Desa Podosoko">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
            KKN-PPM UGM SAWANGAN 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
