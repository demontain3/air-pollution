import React from "react"

import BarChartComponent from "@/components/AreaFillComponents"
import PureComponent from "@/components/AreaFillComponents"
import LineChartComponent from "@/components/LineChart"

const GovtPage = () => {
  return (
    <section className="bg-black 2xl:bg-gray-50 2xl:py-24">
      <div className="mx-auto max-w-7xl bg-black px-4 sm:px-6 lg:px-8 2xl:rounded-xl">
        <div className="py-10 sm:py-16 lg:py-24 2xl:pl-24">
          <div className="grid grid-cols-1 items-center gap-y-8 lg:grid-cols-2 lg:gap-x-8 2xl:gap-x-20">
            <div className="lg:order-2 2xl:-mr-24">
              <img
                className="w-full rounded-xl shadow-xl"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/6/dashboard-screenshot.png"
                alt=""
              />
            </div>

            <div className="lg:order-1">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-snug">
                Are you ready to <br className="hidden xl:block" />
                join Celebration?
              </h2>

              <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-4 sm:mt-10 sm:grid-cols-2 xl:gap-x-16 xl:gap-y-6">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-medium text-white">
                    {" "}
                    120+ Coded Blocks{" "}
                  </span>
                </li>

                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-medium text-white">
                    {" "}
                    Free Icons Included{" "}
                  </span>
                </li>

                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-medium text-white">
                    {" "}
                    Made with TailwindCSS{" "}
                  </span>
                </li>

                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-medium text-white">
                    {" "}
                    Dark & Light Mode{" "}
                  </span>
                </li>

                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-medium text-white">
                    {" "}
                    Edit & Customize Easily{" "}
                  </span>
                </li>

                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-medium text-white">
                    {" "}
                    Get Free Support{" "}
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col items-start sm:flex-row sm:items-center sm:space-x-4 lg:mt-12">
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700"
                  role="button"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Now
                </a>

                <a
                  href="#"
                  title=""
                  className="mt-5 inline-flex items-center justify-center rounded-md border border-white bg-transparent px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black sm:mt-0"
                  role="button"
                >
                  {" "}
                  Explore UI Blocks{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GovtPage
