import Image from "next/image"

import { Button } from "@/components/ui/button"
import Hero from "@/components/Hero/Hero"
import { Navbar } from "@/components/Navbar"
import About from "@/components/about/About"
import Feature from "@/components/Feature"

export default function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <About />
    </>
  )
}
