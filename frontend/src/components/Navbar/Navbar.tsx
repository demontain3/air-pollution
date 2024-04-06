"use client"

import React from "react"
import Link from "next/link"
import logo from "@/../public/The Wind.svg"
import { motion, useAnimation } from "framer-motion"
import { Menu, X } from "lucide-react"

import Logo from "../icons/logo"
import { Button } from "../ui/button"

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Blog",
    href: "#",
  },
  {
    name: "FAQs",
    href: "#",
  },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const menuAnimationControls = useAnimation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    menuAnimationControls.start(isMenuOpen ? "closed" : "open")
  }

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-opacity-1 sticky top-0 z-10 w-full bg-slate-200 drop-shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2"
        >
          <span>
            <Logo height={60} width={90} />
          </span>
        </motion.div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="font-semibold"
              >
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center text-sm font-semibold text-gray-800"
                >
                  {item.name}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{
                      width: "100%",
                      transition: { duration: 0.3 },
                    }}
                    className="absolute bottom-0 left-0 h-1 w-full origin-bottom scale-x-0 transform bg-black group-hover:scale-x-100"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="hidden space-x-2 lg:block">
          <Link href="/auth/signin">
          <Button
            type="button"
            variant="outline"
            className="rounded-2xl bg-green-500 px-6 text-white hover:border-green-500 hover:bg-green-500/10 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Login
          </Button>
          </Link>
          <Link href="/auth/signup">
          <Button
            variant="ghost"
            type="button"
            className="bottom-2 rounded-2xl border-2  border-primary bg-white px-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Register
          </Button>
          </Link>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            variants={menuVariants}
            className="absolute inset-x-0 top-0 z-50 origin-top-right transform bg-white transition lg:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-slate-200 pt-2 shadow-lg ring-1 ring-black ring-opacity-20">
              <div className="px-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <Logo height={60} width={90} />
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="relative flex list-none items-center justify-center font-semibold text-gray-800 hover:text-gray-900"
                      >
                        <Link
                          href={item.href}
                          className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                        >
                          {item.name}
                          <motion.div
                            initial={{ width: 0 }}
                            whileHover={{
                              width: "100%",
                              transition: { duration: 0.4 },
                            }}
                            className="absolute bottom-0 left-0 h-2 w-full bg-black"
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </nav>
                </div>
                <div className="mt-2 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    className="w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
