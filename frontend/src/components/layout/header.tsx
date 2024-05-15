import { cn } from "@/lib/utils";
import Logo from "@/../public/The Wind.svg";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
type Props = {
  userData: any;
}
export default function Header({userData}: Props) {

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-2">
        <div className="mx-6 hidden lg:block">
          <Link href="/dashboard">
            <Image height={40} width={40} src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="search hidden lg:block">
          <Input
            type="search"
            placeholder="Search..."
            className="mr-52 border border-gray-300 relative right-80"
          />
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center justify-between gap-2 pr-6">
          <UserNav userData={userData}/>
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}
