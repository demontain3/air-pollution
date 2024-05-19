import Image from "next/image"
import Link from "next/link"
import { User } from "@/types"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

import { inputLead, labelLead } from "../auth-form/SignupForm"
import Logo from "../icons/logo"
import { Label } from "../ui/label"
import { MobileSidebar } from "./mobile-sidebar"
import ThemeToggle from "./ThemeToggle/theme-toggle"
import { UserNav } from "./user-nav"

type Props = {
  userData: any
}
export default function Header({ userData }: Props) {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 bg-slate-950 py-1 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-2">
        <div className="mx-6 hidden lg:block">
          <Link href="/dashboard">
            <Logo height={70} width={100} />
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="search hidden justify-end lg:block">
            <div className="relative">
              <Input
                type="search"
                id="search"
                className="peer block h-12  w-96 appearance-none rounded-t-lg border-[1px] border-green-400 bg-slate-950 px-2.5 pb-2.5 pt-5 text-sm text-gray-300 focus:border-green-600 focus:outline-none focus:ring-0 dark:border-green-600 dark:text-white dark:focus:border-green-500"
                placeholder=" "
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px #111827 inset",
                  WebkitTextFillColor: "#D1D5DB",
                }}
              />
              <Label htmlFor="search" className={labelLead}>
                Search by name or email
              </Label>
            </div>
          </div>
          <div className={cn("block lg:!hidden")}>
            <MobileSidebar />
          </div>

          <div className="flex items-center justify-between gap-2 pr-6 ">
            <UserNav userData={userData} />
          </div>
        </div>
      </nav>
    </div>
  )
}
