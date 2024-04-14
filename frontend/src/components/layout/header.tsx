import Link from "next/link"

import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle"

import Logo from "../icons/logo"
import { MobileSidebar } from "./mobile-sidebar"
import { UserNav } from "./user-nav"

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <div
          className="mx-6 hidden lg:block
        "
        >
          <Link href="/">
            <Logo height={80} width={80} />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}
