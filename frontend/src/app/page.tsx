import Image from "next/image";
import {  Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
    </>
  );
}
