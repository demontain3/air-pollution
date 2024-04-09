"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { ToastAction } from "@radix-ui/react-toast"
import axios from "axios"

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
})

const Login = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { toast } = useToast()

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email: values.email,
          password: values.password
        }
      );
      console.log("hell")

      // Assuming your API returns some data upon successful login, you can handle it here
      console.log(response.data);

      // Show success message using toast
      toast({
        title: "Success",
        description: "Logged in successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        ),
        duration: 3000, // Optional: Set the duration for the toast
      });
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error logging in:", error);

      // Show error message using toast
      toast({
        title: "Error",
        description: "Failed to log in. Please try again later.",
        duration: 3000,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
  )
}

export default Login