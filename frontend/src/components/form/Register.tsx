import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { formSchema } from "@/lib/definition"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Router from "next/router"

const Register = () => {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        //   variant: "default",
        //   title: "Please check your email to verify your account.",
        //   description: "Registered successfully",
        // })
        setIsSubmitting(true)
        // You might want to redirect the user after successful registration
        // router.push("/login")
      } else {
        const data = await response.json()
        throw new Error(data.message || "Failed to register")
      }
    } catch (error) {
      console.error("Error registering:", error)

      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description:
      // })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {isSubmitting && (
        <div className="mx-auto flex w-64 justify-between">
          <input
            type="text"
            maxLength={1}
            className="h-14 w-14 rounded border-2 border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            maxLength={1}
            className="h-14 w-14 rounded border-2 border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            maxLength={1}
            className="h-14 w-14 rounded border-2 border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            maxLength={1}
            className="h-14 w-14 rounded border-2 border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}
    </>
  )
}

export default Register
