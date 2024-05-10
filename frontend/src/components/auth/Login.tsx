// LoginForm.tsx
"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import useMeStore from "@/store/useMeStore"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useForm } from "react-hook-form"

import { setCookie } from "@/lib/cookie"
import {
  loginFormSchema,
  LoginFormType,
} from "@/lib/validators/LoginValidators"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const Login: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { setIsLoggedIn, isLoggedIn } = useMeStore()

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmitLogin = async (formData: LoginFormType) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        formData
      )
      toast({
        variant: "default",
        title: "User logged In Successfully.",
      })
      setIsLoggedIn(true)
      const decoded: { exp: number } = jwtDecode(response.data)
      const exp = decoded.exp
      setCookie("accessToken", response.data, exp)
      LocalStore.setAccessToken(response.data)
      router.push("/admindash")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `${error?.response?.data?.error} with Status ${
          error?.response?.data?.statusCode ?? "Unknown"
        }`,
        description: error?.response?.data?.message ?? "An error occurred.",
      })
    }
  }

  return (
    <div className="w-full h-full">
      <div className="text-center">
        <Image
          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
          alt=""
          width={120}
          height={40}
          className="mx-auto h-12 w-auto"
        />
        <h1 className="mt-8 text-3xl font-bold text-slate-200">Login</h1>
        <p className="mt-4 text-sm font-medium text-gray-300">
          Login to your account
        </p>
      </div>

      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmitLogin)}
          className="mt-4 space-y-4"
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    className="block w-full rounded-lg border h-12 border-gray-300 px-4 py-3 placeholder-gray-500 sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password (min. 8 characters)"
                    className="block w-full rounded-lg h-12 border border-gray-300 px-4 py-3 placeholder-gray-500 sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="inline-flex w-full h-12 items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/signup" passHref className="font-bold hover:underline hover:underline-offset-2">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
