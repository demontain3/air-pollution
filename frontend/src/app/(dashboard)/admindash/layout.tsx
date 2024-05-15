"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import axios from "axios"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import RootLayout from "@/app/layout"

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

        const res = await axios.get(`${backendUrl}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
          },
        })

        setIsLoading(false)
        if (res?.data?.id) {
          console.log(res?.data.id, "User is logged in")
          setUserData(res.data)
        } else {
          router.push("/auth/login")
        }
      } catch (e) {
        setIsLoading(false)
        router.push("/auth/login")
      }
    }

    checkIfLoggedIn()
  }, [])

  const queryClient = new QueryClient()

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header userData={userData} />
        <div className="flex h-screen ">
          <Sidebar userData={userData} isLoading={isLoading} />
          <main className="mb-10 mt-16  w-full overflow-x-hidden overflow-y-scroll md:p-4">
            {children}
          </main>
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default DashboardLayout
