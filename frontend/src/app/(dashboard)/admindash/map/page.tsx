"use client"

import React from "react"
import dynamic from "next/dynamic"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const OSMap = dynamic(() => import("@/components/Map/OSMap"), {
  ssr: false,
})

const page = () => {
  // const customLocation = {
  //   loaded: true,
  //   error: false,
  //   coordinates: {
  //     lat: -4.043477,
  //     lng: 39.668205,
  //   },
  // }

  const router = useRouter()

  return (
    <div className="text-slate-300">
       <div className="flex flex-row items-center gap-2 text-3xl font-extrabold text-primary my-6">
          <ChevronLeft
            size={28}
            strokeWidth={3}
            onClick={() => router.back()}
            className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-400"
          />
          <h1>Routes</h1>
        </div>

      <OSMap  />
    </div>
  )
}

export default page
