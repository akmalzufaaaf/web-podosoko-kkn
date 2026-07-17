import { client } from '../../../../sanity/lib/client'
import InteractiveMapWrapper from '@/components/InteractiveMapWrapper'

const MAP_MARKER_QUERY = `
  *[_type == "mapMarker"] {
    _id,
    pointName,
    category,
    "lat": coordinate.lat,
    "lng": coordinate.lng,
    description
  }
`

export const revalidate = 3600

export default async function MapPage() {
  let markers = []
  
  try {
    markers = await client.fetch(MAP_MARKER_QUERY)
  } catch (error) {
    console.error("Error fetching map markers:", error)
  }

  return (
    <>
      <InteractiveMapWrapper markers={markers} />
    </>
  )
}