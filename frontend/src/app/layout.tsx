"use client"

import { Poppins } from "next/font/google"

import "./globals.css"

import { ReactQueryProvider } from "@/lib/providers/QueryProviders"
import { Toaster } from "@/components/ui/toaster"

const font = Poppins({ weight: "500", subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReactQueryProvider>
          <div className="flex overflow-hidden">
            <main className="w-full">
              {children}
              <Toaster />
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
