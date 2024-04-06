import Image from "next/image"

import { Button } from "@/components/ui/button"
import Hero from "@/components/Hero/Hero"
import { Navbar } from "@/components/Navbar/Navbar"
import About from "@/components/about/About"
import Feature from "@/components/Feature"
import Pricing from "@/components/pricing/Pricingcn"
import Movingcard from "@/components/card/Movingcard"
import TrustedBy from "@/components/trustedby/Trustedby"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Feature />
      <Pricing />
      <Movingcard />
    </>
  )
}
