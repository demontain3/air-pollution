import { BackgroundBeams } from "@/components/background-beams";
import Header from "@/components/layout/header";
import UserSidebar from "@/components/layout/userSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <UserSidebar />
        <main className="w-full pt-16">{children}
        </main>
      </div>
    </>
  );
}