'use client'

import dynamic from 'next/dynamic'
import { MapMarkerData } from './MapComponent'

// 3. Dynamic Import (No SSR) pindah ke sini secara legal
const LeafletMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-gray-200 flex items-center justify-center">
      Memuat Peta Desa Podosoko...
    </div>
  ),
})

export default function MapWrapper({ markers }: { markers: MapMarkerData[] }) {
  return <LeafletMap markers={markers} />
}