'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { MapMarkerData } from './MapComponent'

// Dynamically import Leaflet Map to prevent SSR crashing
const LeafletMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-stone-100 flex flex-col items-center justify-center border-l border-stone-300">
      <div className="w-12 h-1 bg-stone-900 mb-6 animate-pulse"></div>
      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-900 animate-pulse">
        MEMUAT DATA KARTOGRAFI...
      </p>
    </div>
  ),
})

export default function InteractiveMapWrapper({ markers }: { markers: MapMarkerData[] }) {
  // State for toggles
  const [activeCategories, setActiveCategories] = useState<string[]>(['UMKM', 'Bencana', 'Evakuasi'])
  const [showBatas, setShowBatas] = useState<boolean>(false)

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    )
  }

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 flex flex-col">
      
      {/* 1. The Masthead Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 w-full">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-none tracking-tighter text-stone-900 mb-8">
          PETA<br />
          <span className="italic text-emerald-700 block -mt-2 md:-mt-6">DIGITAL</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-stone-300 pt-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-stone-500 max-w-md leading-relaxed">
            Sistem Informasi Geografis (SIG) Desa Podosoko. Memetakan potensi UMKM, zona rawan bencana, dan infrastruktur strategis.
          </p>
        </div>
      </section>

      {/* 2. Map Interface (Control Panel + Canvas) */}
      <section className="flex-1 w-full border-t border-stone-300 flex flex-col lg:flex-row">
        
        {/* Left Control Panel */}
        <div className="w-full lg:w-96 bg-stone-50 border-b lg:border-b-0 lg:border-r border-stone-300 p-6 lg:p-10 flex flex-col">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-900 mb-8 pb-4 border-b-2 border-stone-900">
            Panel Kendali
          </h2>
          
          <div className="flex flex-col gap-4">
            
            {/* Toggle: UMKM */}
            <button 
              onClick={() => toggleCategory('UMKM')}
              className={`flex items-center justify-between p-4 border ${activeCategories.includes('UMKM') ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white text-stone-500 hover:border-stone-900'} transition-all`}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">UMKM & Potensi</span>
              <div className={`w-4 h-4 border ${activeCategories.includes('UMKM') ? 'bg-white border-white' : 'border-stone-300'}`}></div>
            </button>

            {/* Toggle: Bencana */}
            <button 
              onClick={() => toggleCategory('Bencana')}
              className={`flex items-center justify-between p-4 border ${activeCategories.includes('Bencana') ? 'border-red-600 bg-red-600 text-white' : 'border-stone-300 bg-white text-stone-500 hover:border-red-600'} transition-all`}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Rawan Bencana</span>
              <div className={`w-4 h-4 border ${activeCategories.includes('Bencana') ? 'bg-white border-white' : 'border-stone-300'}`}></div>
            </button>

            {/* Toggle: Evakuasi */}
            <button 
              onClick={() => toggleCategory('Evakuasi')}
              className={`flex items-center justify-between p-4 border ${activeCategories.includes('Evakuasi') ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300 bg-white text-stone-500 hover:border-emerald-700'} transition-all`}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Jalur Evakuasi</span>
              <div className={`w-4 h-4 border ${activeCategories.includes('Evakuasi') ? 'bg-white border-white' : 'border-stone-300'}`}></div>
            </button>

            <div className="w-full h-px bg-stone-300 my-4"></div>

            {/* Toggle: Batas Administrasi */}
            <button 
              onClick={() => setShowBatas(!showBatas)}
              className={`flex items-center justify-between p-4 border ${showBatas ? 'border-stone-900 bg-stone-100 text-stone-900' : 'border-stone-300 bg-white text-stone-500 hover:border-stone-900'} transition-all`}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Batas Administrasi</span>
              <div className={`w-4 h-4 border rounded-full ${showBatas ? 'bg-stone-900 border-stone-900' : 'border-stone-300'}`}></div>
            </button>

          </div>

          {/* GeoJSON Placeholder Message */}
          <div className="mt-auto pt-8">
            <p className="text-[9px] uppercase tracking-widest text-stone-400 leading-relaxed">
              *Catatan: Batas administrasi membutuhkan file batas-desa.geojson di folder public. Fitur ini akan aktif setelah file diunggah.
            </p>
          </div>
        </div>

        {/* Right Canvas (The Map) */}
        <div className="flex-1 h-[600px] lg:h-auto min-h-[600px] relative z-0">
          <LeafletMap markers={markers} activeCategories={activeCategories} />
        </div>

      </section>
    </main>
  )
}
