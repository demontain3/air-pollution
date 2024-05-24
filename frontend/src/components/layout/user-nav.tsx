"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import useAuth from "@/hooks/useAuth";
import { LocalStore } from "@/store/localStore";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { clearCookie } from "@/lib/cookie";
import useMeStore from "@/store/useMeStore";
import { User } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  userData: User;
}
export function UserNav({userData}:Props) {
  const router =useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-10 border-2 border-green-400  cursor-pointer flex items-center justify-between min-w-0 space-x-3 w-10  rounded-full bg-slate-300 text-black">
          {userData && (
            <Avatar >
              {/* <Image height={32} width={32} src={img} alt="Profile picture" /> */}
              <AvatarFallback className=" ml-2.5 items-center font-mono text-xl w-full flex  justify-between ">
                {userData.email.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>
      {userData && (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {" "}
                {userData.email.split("@")[0]}{" "}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userData.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              LocalStore.remove('jwt');
              clearCookie("accessToken");
              router.replace('/auth/login');
            }}
          >
            Logout
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
