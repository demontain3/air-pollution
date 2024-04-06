"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import Logo from "../icons/logo"

const Navbarcn = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-slate-200 py-2 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="#">
                <div
                  className="block text-primary dark:text-teal-300"
                  aria-label="Home"
                >
                  <Logo height={80} width={100} />
                </div>
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex rounded-md p-2 text-black transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100 lg:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6 cursor-pointer" />
              ) : (
                <Menu className="h-6 w-6 cursor-pointer" />
              )}
            </button>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="text-md flex items-center gap-6">
                  <li>
                    <Link href="#">
                      <div className="text-black transition hover:text-black/75 dark:text-white dark:hover:text-white/75">
                        About
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <div className="text-black transition hover:text-black/75 dark:text-white dark:hover:text-white/75">
                        Careers
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <div className="text-black transition hover:text-black/75 dark:text-white dark:hover:text-white/75">
                        History
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <div className="text-black transition hover:text-black/75 dark:text-white dark:hover:text-white/75">
                        Services
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <div className="text-black transition hover:text-black/75 dark:text-white dark:hover:text-white/75">
                        Projects
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <div className="text-black transition hover:text-black/75 dark:text-white dark:hover:text-white/75">
                        Blog
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link href="/login">
                    <div className="rounded-full bg-primary px-7 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500">
                      Login
                    </div>
                  </Link>
                  <div className="hidden sm:flex">
                    <Link href="/register">
                      <div className="rounded-full border-[1px] border-primary bg-gray-100 px-7 py-2.5 text-sm font-medium text-primary dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                        Register
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          className={`rounded-md border border-gray-200 bg-white pb-6 pt-4 shadow-md lg:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ transition: "height 0.3s ease" }}
        >
          <div className="flow-root">
            <div className="-my-2 flex flex-col space-y-1 px-6">
              <Link href="#">
                <div className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  About
                </div>
              </Link>
              <Link href="#">
                <div className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  About
                </div>
              </Link>
              <Link href="#">
                <div className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  About
                </div>
              </Link>
              <Link href="#">
                <div className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  About
                </div>
              </Link>
              <Link href="#">
                <div className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  Blog
                </div>
              </Link>
              <Link href="#">
                <div className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-red-600 focus:text-red-600">
                  Calculator
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-6 px-6">
            <div className="flex items-center justify-around gap-4">
              <Link href="/login">
                <div className="w-full rounded-full bg-primary px-20 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500">
                  Login
                </div>
              </Link>
              <Link href="/register">
                <div className="w-full rounded-full border-[1px] border-primary bg-white px-16 py-2.5 text-sm font-medium text-primary dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                  Register
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbarcn
