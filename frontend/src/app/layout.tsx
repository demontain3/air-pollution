import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import Footer from "@/components/footer/Footer"
import Navbar from "@/components/Navbar/Navbarcn"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vayu - Air Quality Info System",
  description:
    "Vayu is the IOT based platform for the company to monitor the air quality of the environment.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
