import React from "react"
import { metaObject } from "@/config/site.config";
// import RequestOtp from "@/components/auth-form/RequestOtp";

export const metadata = {
  ...metaObject('Request for your otp.'),
};

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      {/* <RequestOtp /> */}
    </div>
  )
}

export default page
