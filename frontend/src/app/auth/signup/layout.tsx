import type { Metadata } from "next";
import { Inter,  } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Signup - Air Quality Info System",
  description: "Vayu is the IOT based platform for the company to monitor the air quality of the environment.",
};

export default function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
