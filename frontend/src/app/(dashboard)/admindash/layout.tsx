// import React from "react"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
// import axios from "axios"

// import Header from "@/components/layout/header"
// import Sidebar from "@/components/layout/sidebar"

// console.log("hello world")

// // async function checkIfLoggedIn() {
// //   let isLoading = true

// //   try {
// //     const res = await axios.get(
// //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
// //       {
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
// //         },
// //       }
// //     )

// //     isLoading = false

// //     if (res?.data?.id) {
// //       return { data: res.data, isLoading }
// //     } else {
// //       redirect("/auth/login")
// //       return { data: null, isLoading }
// //     }
// //   } catch (e) {
// //     isLoading = false
// //     redirect("/auth/login")
// //     return { data: null, isLoading }
// //   }
// // }

// const userData = {
//   name: "Suman Sharma",
//   email: "whysumancode@gmail.com",
// }

// const isLoading: boolean = false

// export default async function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   // const { data: userData, isLoading } = await checkIfLoggedIn()
//   return (
//     <div>
//       <Header userData={userData} />
//       <div className="flex h-screen ">
//         <Sidebar userData={userData} isLoading={isLoading} />
//         <main className="mb-10 mt-16  w-full overflow-x-hidden overflow-y-scroll md:p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }
import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import axios, { AxiosResponse } from "axios"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import RootLayout from "@/app/layout"

async function checkIfLoggedIn() {
  let isLoading = true
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
        withCredentials: true,
      }
    )

    // console.log((res as AxiosResponse<any, any>).data.data.users.roles, "res")

    isLoading = false

    if (res?.data) {
      return { data: res.data, isLoading }
    }
    else if (res?.data?.roles === "User") {
      redirect("/userdash")
    }
    else {
      redirect("/auth/login")
      return { data: null, isLoading }
    }
  } catch (e: any) {
    console.log(e, "error")
    isLoading = false
    redirect("/auth/login")
    return { data: null, isLoading }
  }
}

// const userData = {
//   name: "Suman Sharma",
//   email: "whysumancode@gmail.com",
// }

// const isLoading: boolean = false

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: userData, isLoading } = await checkIfLoggedIn()
  return (
    <div>
      <Header userData={userData} />
      <div className="flex h-screen  bg-slate-950">
        <Sidebar userData={userData} isLoading={isLoading} />
        <main className="mb-10 mt-16  w-full overflow-x-hidden overflow-y-scroll md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
