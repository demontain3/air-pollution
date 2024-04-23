import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/app/globals.css"

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Login - Air Quality Info System",
  description:
    "Vayu is the IOT based platform for the company to monitor the air quality of the environment.",
}

// Create a client
const queryClient = new QueryClient()

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
