import React from "react"
import dynamic from "next/dynamic"

const OSMap = dynamic(() => import("@/components/Map/OSMap"), {
  ssr: false,
})

const page = () => {
  const customLocation = {
    loaded: true,
    error: false,
    coordinates: {
      lat: -4.043477,
      lng: 39.668205,
    },
  }

  return (
    <div className="text-slate-300">
      <OSMap location={customLocation} />
    </div>
  )
}

export default page
