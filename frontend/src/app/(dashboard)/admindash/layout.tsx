import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import axios from "axios"

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"


console.log("hello world")

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
      }
    )

    isLoading = false

    if (res?.data?.id) {
      return { data: res.data, isLoading }
    } else {
      redirect("/auth/login")
      return { data: null, isLoading }
    }
  } catch (e) {
    isLoading = false
    redirect("/auth/login")
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

// "use client"

// import React, { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import axios from "axios"

// import Header from "@/components/layout/header"
// import Sidebar from "@/components/layout/sidebar"

// function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [userData, setUserData] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const checkIfLoggedIn = async () => {
//       setIsLoading(true)
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
//             },
//           }
//         )

//         setIsLoading(false)
//         if (res?.data?.id) {
//           console.log(res?.data.id, "User is logged in")
//           setUserData(res.data)
//           router.push("/admindash")

//         } else {
//           router.push("/auth/login")
//         }
//       } catch (e) {
//         setIsLoading(false)
//         router.push("/login")
//       }
//     }
//     checkIfLoggedIn()
//   }, [])

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

// export default DashboardLayout
