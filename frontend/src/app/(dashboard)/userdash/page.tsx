import { useMemo } from "react"
import dynamic from "next/dynamic"
import BlogWrapper from "@/components/BlogWrapper"

// Define the initial position and zoom level
const initialPosition: [number, number] = [51.505, -0.09]; // Example coordinates (London)
const initialZoom = 13; // Example initial zoom level


export default function page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/OSMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )

  return (
    <>
      <BlogWrapper>
        <h1>Map</h1>
        <Map position={initialPosition} zoom={initialZoom}/>
      </BlogWrapper>
    </>
  )
}
