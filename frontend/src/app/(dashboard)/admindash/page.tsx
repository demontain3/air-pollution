"use client"

import { cardData } from "@/constants/data"
import useMeStore from "@/store/useMeStore"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LineChartComponent from "@/components/LineChart"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import AQIindex from "@/components/AQIindex"
import BarChart from "@/components/BarChart"

export default function Page() {
  const { meData } = useMeStore()
  const userData = meData

  return (
    <ScrollArea className="h-full bg-gray-950 text-slate-300">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  className="border-none bg-gray-800 shadow-green-500 drop-shadow-md"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">
                      {card.title}
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox={card.iconViewBox}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d={card.iconPath} />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      {card.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 border-none bg-black shadow-green-500 drop-shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-300">Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview /> */}
                  <BarChart/>
                </CardContent>
              </Card>
              <Card className="col-span-4 border-none bg-black shadow-green-500 drop-shadow-md md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-slate-300">Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-slate-300">
                  {/* <RecentSales /> */}
                  <AQIindex/>

                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <Card className="items-center flex justify-center w-full border-none bg-black shadow-green-500 drop-shadow-md md:col-span-3">
          <LineChartComponent />

        </Card>
      </div>
    </ScrollArea>
  )
}
