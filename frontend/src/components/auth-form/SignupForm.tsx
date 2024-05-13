// SignupForm.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useForm } from "react-hook-form"

import {
  signupFormSchema,
  SignupFormType,
} from "@/lib/validators/signupValidators"
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

export default function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "Suman",
      lastName: "Sharma",
      email: "",
      password: "",
      // organizationId: NaN,
    },
  })

  // Create an instance of UseMutationOptions with appropriate types
  const mutationOptions: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    SignupFormType,
    unknown
  > = {
    // Specify the mutation function
    mutationFn: async (formData: SignupFormType) => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await axios.post(`${backendUrl}/users/signup`, {
          ...formData,
        })
        return response
      } catch (error) {
        throw error
      }
    },
    // Define success behavior
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Signup Successful.",
      })
      router.push("/auth/login")
    },
    // Define error handling
    onError: (error) => {
      console.log(error?.response?.data)
      toast({
        variant: "destructive",
        title: `${error?.response?.data?.error} with Status ${error?.response?.data?.statusCode ?? "Unknown"}`,
        description: error?.response?.data?.message ?? "An error occurred.",
      })
    },
  }

  // Use the mutation hook with the defined options
  const mutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    SignupFormType,
    unknown
  > = useMutation(mutationOptions)

  // Define your onSubmit function as before
  const onSubmitSignup = async (data: SignupFormType) => {
    mutation.mutate(data)
  }

  return (
    <div className="28 w-96 items-center rounded-lg border border-slate-300 bg-white p-5 drop-shadow-2xl">
      <div className="text-center">
        <Image
          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
          alt=""
          width={120}
          height={40}
          className="mx-auto h-12 w-auto"
        />
        <h1 className="mt-8 text-3xl font-bold text-gray-900">Signup</h1>
        <p className="mt-4 text-sm font-medium text-gray-500">
          Vayu Is A Creative Agency that builds custom CRM solutions and
          Websites.
        </p>
      </div>

      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmitSignup)}
          className="mt-4 space-y-4"
        >
          <FormField
            control={signupForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 sm:text-sm "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 sm:text-sm "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 sm:text-sm "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password (min. 8 characters)"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 sm:text-sm "
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
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200"
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-900">
          Already have an account?{" "}
          <Link href="/login" passHref className="font-bold hover:underline">
            Login now
          </Link>
        </p>
      </div>
    </div>
  )
}
