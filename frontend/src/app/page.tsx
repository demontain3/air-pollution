import Image from "next/image"

import { Button } from "@/components/ui/button"
import About from "@/components/about/About"
import Movingcard from "@/components/card/Movingcard"
import Feature from "@/components/Feature"
import Footer from "@/components/footer/Footer"
import Hero from "@/components/Hero/Hero"
import Lambpage from "@/components/Lamp/Lambpage"
import Navbarcn from "@/components/Navbar/Navbarcn"
import Ourwork from "@/components/Ourwork/Ourwork"
import Pricing from "@/components/pricing/Pricingcn"
import TrustedBy from "@/components/trustedby/Trustedby"

export default function Home() {
  return (
    <div className=" bg-gray-950">
      <Navbarcn />

      <div className="hidden md:block">
        <Lambpage />
      </div>
      <Hero />
      <Feature />
      {/* <TrustedBy /> */}
      {/* <About /> */}
      {/* <Ourwork /> */}
      <Pricing />
      <Movingcard />
      <Footer />
    </div>
  )
}
