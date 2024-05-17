// import { cookies } from "next/headers"
// import { NextRequest, NextResponse } from "next/server"
// import axios from "axios"
// import { jwtDecode } from "jwt-decode"

// interface MyCookies {
//   accessToken?: {
//     name: string
//     value: string
//   }
// }

// interface User {
//   id: string
// }

// interface NextRequestWithUser extends NextRequest {
//   user?: User
// }

// export async function middleware(request: NextRequest) {
//   const cookiesStore = cookies()
//   const accessTokencookies = cookiesStore.get("accessToken")
//   const currentPath = new URL(request.url).pathname
//   const accessToken = accessTokencookies?.value

//   const token = accessToken
//   let decodedToken: { userId?: string } | undefined
//   try {
//     if (token) {
//       decodedToken = jwtDecode(token)
//     }
//   } catch (e) {
//     // Invalid token, redirect to login
//     return NextResponse.redirect(new URL("/", request.url))
//   }
//   if (decodedToken?.userId) {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       ;(request as any).user = res.data
//     } catch (e) {
//       // Error fetching user data, redirect to login
//       return NextResponse.redirect(new URL("/", request.url))
//     }
//   }
//   if ((request as NextRequestWithUser).user && currentPath === "/") {
//     // User is logged in and trying to access login or signup, redirect to dashboard
//     return NextResponse.redirect(new URL("/admindash", request.url))
//   }
// }

// export const config = {
//   matcher: [
//     "/admindash",
//     "/userdash",
//     "/",
//     "/auth/login",
//     "/admindash/:page*",
//     "/admindash/:page*",
//   ],
// }

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface MyCookies {
  accessToken?: {
    name: string
    value: string
  }
}

interface User {
  id: string
}

interface NextRequestWithUser extends NextRequest {
  user?: User
}



export async function middleware(request: NextRequest) {
  console.log("okay")

  const cookiesStore = cookies()
  const accessTokencookies = cookiesStore.get("accessToken")
  const currentPath = new URL(request.url).pathname
  const accessToken = accessTokencookies?.value
  const token = accessToken
  let decodedToken: { userId?: string } | undefined
  try {
    if (token) {
      decodedToken = jwtDecode(token)
    }
  } catch (e) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }


  if (decodedToken?.userId) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      ;(request as any).user = res.data
    } catch (e) {
      // Error fetching user data, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }
  if (
    (request as NextRequestWithUser).user &&
    (currentPath === "/auth/login" || currentPath === "/auth/signup")
  ) {
    // User is logged in and trying to access login or signup, redirect to dashboard
    return NextResponse.redirect(new URL("/admindash", request.url))
  }
  if (
    !decodedToken?.userId &&
    currentPath !== "/auth/login" &&
    currentPath !== "/auth/signup"
  ) {
    console.log("six")
    // User is not logged in and trying to access a page other than login or signup, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

export const config = {
  matcher: [
    "/admindash",
    "/userdash",
    "/auth/login",
    "/auth/signup",
    "/",
    "/admindash/:page*",
    "/userdash/:page*",
  ],
}
