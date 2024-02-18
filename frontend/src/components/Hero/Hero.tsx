"use client";

import React from "react";
import Logo from "../icons/logo";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-white"
    >
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <Logo height={150} width={150} />
          <div className="flex max-w-max items-center space-x-2 rounded-full border-2 border-primary bg-gray-100 p-1">
            <div className="rounded-full bg-green-500 p-1 px-2">
              <p className="text-xs font-medium">We&apos; Protecting</p>
            </div>
            <p className="text-xs font-medium">Join our team &rarr;</p>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl first-letter:text-primary">
            People who care about your .env
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            modi blanditiis dolores quasi eaque explicabo!
          </p>
          <form action="" className="mt-8 flex items-start space-x-2">
            <div>
              <input
                className="flex w-full rounded-2xl border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter your email"
                id="email"
              ></input>
              <p className="mt-2 text-xs text-gray-500">
                We care about your privacy
              </p>
            </div>
            <div>
              <Button
                type="button"
                className="rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get Started
              </Button>
            </div>
          </form>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6"
        >
          <Image
            height={700}
            width={1000}
            className="aspect-[3/2] opacity-100 bg-green-500 object-cover shadow-sm shadow-green-500 lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
            src="https://plus.unsplash.com/premium_photo-1679079456783-5d862f755557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="hero photo"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
