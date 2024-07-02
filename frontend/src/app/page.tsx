import Image from "next/image"

import { Button } from "@/components/ui/button"
import About from "@/components/about/About"
import { BackgroundBeams } from "@/components/background-beams"
import Movingcard from "@/components/card/Movingcard"
import Contact from "@/components/contact/Contact"
import Feature from "@/components/Feature"
import Feature6 from "@/components/feature/Feature6"
import StickyFeature from "@/components/feature/StickyFeature"
import Footer from "@/components/footer/Footer"
import GithubGlobe from "@/components/githubglobe/GithubGlobe"
import Hero from "@/components/Hero/Hero"
import HyperHero from "@/components/Hero/HyperHero"
import Lambpage from "@/components/Lamp/Lambpage"
import Navbarcn from "@/components/Navbar/Navbarcn"
import Ourwork from "@/components/Ourwork/Ourwork"
import Pricing from "@/components/pricing/Pricingcn"
import Testimonials from "@/components/testimonials/Testimonials"
import TrustedBy from "@/components/trustedby/Trustedby"

export default function Home() {
  return (
    <div className=" gap-y-40 bg-gray-950">
      <Navbarcn />

      <div className="relative hidden md:block">
        <Lambpage />
        <HyperHero />
      </div>
      {/* <Hero /> */}

      <Feature6 />
      {/* <Feature /> */}
      {/* <TrustedBy /> */}
      {/* <About /> */}
      {/* <Ourwork /> */}
      <Pricing />
      {/* <Movingcard /> */}
      <div className="relative">
        <Testimonials />
        <BackgroundBeams />
      </div>

      <Contact />
      {/* <GithubGlobe /> */}
      <Footer />
    </div>
  )
}
