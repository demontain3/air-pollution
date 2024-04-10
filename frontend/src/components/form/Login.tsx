
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email field cannot be empty." })
    .email({ message: "This is not a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password cannot be longer than 50 characters." }),
});


const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: values.email,
        password: values.password,
      });

      console.log(response.data);

      toast({
        title: "Success",
        description: "Logged in successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error logging in:", error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log in. Please try again.",
        duration: 3000,
      });
    }
  }

  const { toast } = useToast();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default Login;
