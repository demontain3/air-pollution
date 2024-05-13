import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import axios from "axios"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import RootLayout from "@/app/layout"

async function checkIfLoggedIn() {
  let isLoading = true

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const res = await axios.get(
      `${backendUrl}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      }
    )

    isLoading = false

    if (res?.data?.id) {
      return { data: res.data, isLoading }
    } else {
      redirect("/login")
      return { data: null, isLoading }
    }
  } catch (e) {
    isLoading = false
    redirect("/login")
    return { data: null, isLoading }
  }
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: userData, isLoading } = await checkIfLoggedIn()
  return (
    <div>
      <Header userData={userData} />
      <div className="flex h-screen ">
        <Sidebar userData={userData} isLoading={isLoading} />
        <main className="mb-10 mt-16  w-full overflow-x-hidden overflow-y-scroll md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
