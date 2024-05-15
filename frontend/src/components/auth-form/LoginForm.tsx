"use client";



import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { jwtDecode } from "jwt-decode";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  loginFormSchema,
  LoginFormType,
} from "@/lib/validators/LoginValidators";
import Image from "next/image";
import { LocalStore } from "@/store/localStore";
import useMeStore from "@/store/useMeStore";
import { setCookie } from "@/lib/cookie";
import {toast } from "sonner"

const Login: React.FC = () => {
  const router = useRouter();

  const { setIsLoggedIn, isLoggedIn } = useMeStore();

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    LoginFormType,
    unknown
  > = {
    mutationFn: async (formData: LoginFormType) => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.post(
          `${backendUrl}/auth/login`,
          formData
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast("User Logged IN SuccessFully", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
      setIsLoggedIn(true);
      const decoded: { exp: number } = jwtDecode(data.data!);
      const exp = decoded.exp;
      setCookie("accessToken", data.data, exp);
      LocalStore.setAccessToken(data.data);
      router.push("/admindash");
    },
    onError: (error) => {
      toast("Failed to logged in", {
        description: `${error?.response?.data?.error} with Status ${
          error?.response?.data?.statusCode ?? "Unknown"
        }`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },
  };

  const mutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    LoginFormType,
    unknown
  > = useMutation(loginMutation);

  const onSubmitLogin = async (data: LoginFormType) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-slate-950 w-96 p-10 items-center 28 drop-shadow-2xl border-slate-300 border rounded-lg">
        <div className="text-center">
          <Image
            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
            alt=""
            width={120}
            height={40}
            className="w-auto h-12 mx-auto"
          />
          <h1 className="mt-8 text-3xl font-bold text-gray-300">Login</h1>
          <p className="mt-4 text-sm font-medium text-gray-500">
            Vayu Is A Creative Agency that builds custom CRM solutions and
            Websites.
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
                      className="border block w-full px-4 py-3 h-12 placeholder-gray-500 border-gray-300 rounded-sm sm:text-sm"
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
                      className="border block w-full h-12 px-4 py-3 placeholder-gray-500 border-gray-300 rounded-sm sm:text-sm"
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
              className="inline-flex items-center h-12 justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-primary border border-transparent rounded-md"
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" passHref className="font-bold hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

