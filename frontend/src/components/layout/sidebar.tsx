"use client"
import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import useMeStore from "@/store/useMeStore";
import { User } from "@/types";
import { useEffect } from "react";

type Props = {
  userData: User;
  isLoading: boolean;
}
export default function Sidebar({userData, isLoading}: Props) {
  const {setMeData, setIsLoading} = useMeStore();

  useEffect(() => {
    if (userData || isLoading) {
      setMeData(userData);
      setIsLoading(isLoading);
    }
  }, [userData, setMeData, isLoading]);


  
  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-80`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-2 py-2">
          <div className="space-y-1">
            <DashboardNav items={navItems}/>
          </div>
        </div>
      </div>
    </nav>  
  );
}
