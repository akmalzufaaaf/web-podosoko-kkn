'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export type MapMarkerData = {
  _id: string
  pointName: string
  category: string
  lat: number
  lng: number
  description: string
}

// Brutalist Custom Icon Generator
const getCategoryIcon = (category: string) => {
  let bgColor = 'bg-stone-900' // Default Black
  let textColor = 'text-white'
  let label = 'U' // UMKM

  if (category === 'UMKM') {
    bgColor = 'bg-stone-900'
    label = 'U'
  } else if (category === 'Bencana') {
    bgColor = 'bg-red-600'
    label = 'B'
  } else if (category === 'Evakuasi') {
    bgColor = 'bg-emerald-700'
    label = 'E'
  }

  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `
      <div class="${bgColor} ${textColor} w-10 h-10 flex flex-col items-center justify-center border-2 border-white shadow-xl">
        <span class="font-serif font-bold text-lg leading-none">${label}</span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20], 
    popupAnchor: [0, -20]
  })
}

interface MapProps {
  markers: MapMarkerData[];
  activeCategories: string[];
}

export default function MapComponent({ markers, activeCategories }: MapProps) {
  // Center roughly on Candimulyo, Magelang or dynamic based on data
  const defaultCenter: [number, number] = markers.length > 0 
    ? [markers[0].lat, markers[0].lng] 
    : [-7.5500, 110.8500]

  // Filter markers based on active toggles
  const visibleMarkers = markers.filter(m => activeCategories.includes(m.category))

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={14} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={false} // We can hide default zoom or keep it. Let's keep it but reposition if needed.
    >
      {/* Grayscale Map Tiles to fit Brutalism */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {visibleMarkers.map((marker) => (
        <Marker 
          key={marker._id} 
          position={[marker.lat, marker.lng]}
          icon={getCategoryIcon(marker.category)}
        >
          <Popup className="brutalist-popup">
            <div className="font-sans p-1">
              <span className="text-[9px] font-bold tracking-widest uppercase border border-stone-900 px-1 py-0.5 mb-2 inline-block">
                {marker.category}
              </span>
              <strong className="text-stone-900 text-sm block mb-2 font-serif leading-tight">
                {marker.pointName}
              </strong>
              <p className="text-stone-600 text-xs m-0 leading-relaxed border-t border-stone-200 pt-2">
                {marker.description || "Tidak ada deskripsi."}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}