import Script from 'next/script'

export default function MapPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-emerald-700 selection:text-white pt-24 md:pt-32 flex flex-col">
      <Script type="module" src="https://js.arcgis.com/5.1/embeddable-components/" strategy="lazyOnload" />
      
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

      {/* 2. ArcGIS Embedded Map */}
      <section className="flex-1 w-full border-t border-stone-300 flex flex-col">
        <div className="w-full h-[600px] md:h-[800px] relative z-0 bg-stone-100 flex items-center justify-center">
          {/* @ts-expect-error - Custom element arcgis-embedded-map */}
          <arcgis-embedded-map 
            style={{ height: '100%', width: '100%' }} 
            item-id="0b63b7ddc88a404986079b0163fa3daa" 
            theme="light" 
            bookmarks-enabled 
            heading-enabled 
            legend-enabled 
            information-enabled 
            share-enabled 
            time-zone-label-enabled 
            center="110.30699145458492,-7.5172542975790035"
            scale="18055.954822" 
            portal-url="https://ugmid.maps.arcgis.com">
          </arcgis-embedded-map>
        </div>
      </section>
    </main>
  )
}