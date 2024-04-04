"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import Logo from "../icons/logo"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <>
      <div className="">
        <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-x-6 gap-y-8 lg:max-w-none lg:grid-cols-12">
              <div className="self-center lg:col-span-4">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
                  Vayu - The Wind
                </h1>
                <p className="mt-5 text-base font-normal leading-7 text-gray-500">
                  Environment Keeper who is the son of Lord Agni and Goddess
                </p>
                <div className="group relative mt-9 inline-flex">
                  <div className="transitiona-all absolute inset-0 rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg filter duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

                  <Link
                    href="#"
                    title=""
                    className="relative inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:py-3.5 sm:text-sm"
                    role="button"
                  >
                    Read Exclusive Blog
                  </Link>
                </div>
              </div>

              <div className="self-end lg:order-last lg:col-span-3 lg:pb-20">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  ⚡️ Latest Picks
                </p>

                <div className="mt-6 space-y-6 lg:space-y-8">
                  <div className="relative overflow-hidden">
                    <div className="flex items-start lg:items-center">
                      <Image
                        height={48}
                        width={48}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-1.png"
                        alt=""
                      />
                      <p className="ml-5 text-base font-bold leading-6 text-gray-900">
                        <Link href="#" title="">
                          How Link visual artist redefines success in graphic
                          design
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    <div className="flex items-start lg:items-center">
                      <Image
                        height={48}
                        width={48}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-2.png"
                        alt=""
                      />
                      <p className="ml-5 text-base font-bold leading-6 text-gray-900">
                        <Link href="#" title="">
                          How Link visual artist redefines success in graphic
                          design
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    <div className="flex items-start lg:items-center">
                      <Image
                        height={48}
                        width={48}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-3.png"
                        alt=""
                      />
                      <p className="ml-5 text-base font-bold leading-6 text-gray-900">
                        <Link href="#" title="">
                          How Link visual artist redefines success in graphic
                          design
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-end lg:col-span-5">
                <Image
                  height={400}
                  width={400}
                  className="mx-auto w-full"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/author.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
