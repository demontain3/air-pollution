"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { LocalStore } from "@/store/localStore"
import { Customer, Lead, Range, Segment } from "@/types"
import axios from "axios"
import { saveAs } from "file-saver"
import {
  ChevronLeft,
  ExternalLink,
  Import,
  Plus,
  PlusIcon,
  Search,
  X,
} from "lucide-react"

import { fetchFromApi } from "@/lib/fetchFromApi"
import useDataFetcher from "@/hooks/useDataFetcher"
import useDebounce from "@/hooks/useDebounce"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
// import CustomerCreatePage from "@/components/customer/customerCreatePage/CustomerCreatePage"
import PaginationComponent from "@/components/Pagination"
import CustomerCreatePage from "@/components/users/UserCreatePage"
import UserCreatePage from "@/components/users/UserCreatePage"

import { columns } from "./columns"
import { DataTable } from "./data-table"

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Debounce search term
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [appliedFilters, setAppliedFilters] = useState<Range[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null)
  const { toast } = useToast()

  const filters: Range[] = [] // Define your filters here if needed
  const { data, refetch } = useDataFetcher<Customer>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?order[createdAt]=DESC`,
    // filters: appliedFilters,
    filters: debouncedSearchTerm
      ? [
          {
            property: debouncedSearchTerm.includes("@") ? "email" : "name",
            lower: debouncedSearchTerm,
            upper: debouncedSearchTerm + "z",
          },
        ]
      : [],
    page: currentPage,
    pageSize,
    rangeFields: ["name", "email", "address"], // Pass rangeFields here
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    refetch() // Refetch data when debounced search term changes
  }, [debouncedSearchTerm, currentPage, pageSize])

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)

    // Clear filters if search term is empty
    if (searchTerm === "") {
      console.log(debouncedSearchTerm)
      setAppliedFilters([])
    }
  }

  const refetchData = () => {
    refetch() // Refetch data after successful deletion
  }

  const exportCustomer = async () => {
    let usersUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`

    try {
      const response = await fetchFromApi<Customer>({
        url: usersUrl,
        who: "users",
        filters: [
          ...filters,
          ...(debouncedSearchTerm
            ? [
                {
                  property: debouncedSearchTerm.includes("@")
                    ? "email"
                    : "name",
                  lower: debouncedSearchTerm,
                  upper: debouncedSearchTerm + "z",
                },
              ]
            : []),
          ...appliedFilters,
        ],
        rangeFields: ["name", "email", "phone", "createdAt"],
        type: "export",
        whereFilters: [], // Add the missing whereFilters property
      })

      if (response instanceof Blob) {
        saveAs(response, "Users.xlsx")
      } else {
        console.error("Expected Blob, got ApiData<Customer>")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    if (selectedBucket) {
      formData.append("bucket", selectedBucket)
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/import/csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${LocalStore.getAccessToken()}`,
          },
        }
      )
      if (response.status >= 200 && response.status < 300) {
        refetch()
        toast({
          variant: "default",
          description: "File uploaded successfully",
          title: "Success",
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.message ||
          "An error occurred while uploading the customer.",
      })
    }
  }


  return (
    <div className="bgslate-950 mt-10 flex flex-col gap-8 text-slate-300">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 text-3xl font-extrabold text-primary ">
          <ChevronLeft
            size={28}
            strokeWidth={3}
            onClick={() => router.back()}
            className="cursor-pointer text-primary transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-400"
          />
          <h1>Customer</h1>
        </div>
        <div className="flex flex-row gap-3">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Customer"
              className="h-12 w-96 border border-slate-300 pr-10"
            />
            <Search
              width={15}
              height={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-slate-300"
            />
          </div>

          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="flex h-12 flex-row gap-2 border border-slate-300 text-slate-300 hover:no-underline"
                  variant="link"
                >
                  <Import size={20} strokeWidth={2} />
                  Import
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-primary bg-slate-950">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex justify-between">
                    <div className="mb-8 flex flex-row items-center gap-2 text-2xl font-extrabold text-primary">
                      <ChevronLeft
                        size={24}
                        strokeWidth={4}
                        onClick={() => router.back()}
                        className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:text-gray-700"
                      />
                      <h1>Imports Users</h1>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="inputpart">
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={(event) =>
                          setSelectedFile(event.target.files?.[0] || null)
                        }
                        accept=".csv"
                        // style={{ display: "none" }}
                        className="bg=gray-100 h-24 w-full shrink border border-primary pl-16 pt-10 text-primary"
                      />
                    </div>
                    {/* <div className="BucketName mt-4">
                      <Select
                        onValueChange={(value: any) => setSelectedBucket(value)}
                      >
                        <SelectTrigger className="h-12 w-full border border-gray-500">
                          <SelectValue placeholder="Bucket" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-42">
                            now show all the segment's name here 
                            {segments.map((segment, index) => (
                              <SelectItem key={index} value={segment.id}>
                                {segment.name}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div> */}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="relative">
                  <AlertDialogCancel className=" absolute bottom-56 h-12 rounded-sm border-none bg-slate-950 shadow-none hover:scale-110 hover:bg-slate-950 hover:delay-200 hover:ease-in-out">
                    <X size={24} color="green" className="font-extrabold" />
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="relative right-1 my-4 h-12 w-full rounded-sm"
                    onClick={handleFileUpload}
                  >
                    Next
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* export buttom=n  */}
          <Button
            className="flex h-12 flex-row gap-2 border border-slate-300 text-slate-300 hover:no-underline"
            variant="link"
            onClick={exportCustomer}
          >
            <ExternalLink size={20} />
            Export
          </Button>

          <div className="flex gap-2 bg-green-500 text-primary">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              {" "}
              <DialogTrigger asChild>
                <Button
                  className="flex h-12 flex-row gap-2 bg-green-500 text-slate-950"
                  variant="link"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus width={20} />
                  Create new User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-950 text-slate-300">
                <DialogHeader></DialogHeader>
                <UserCreatePage closeDialog={setIsOpen} refetch={refetchData} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        refetchData={refetchData}
        // applyFilter={applyFilter}
        // clearFilter={clearFilter}
      />
      {/* Pagination Component */}
      <div className="flex text-slate-300">
        <Select
          onValueChange={(value: any) => {
            setPageSize(value)
          }}
        >
          <SelectTrigger className="ml-4 w-[80px] bg-slate-950 pr-2 text-slate-300 focus:ring-0">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent className="bg-slate-950 text-slate-300 focus:ring-0">
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="32">32</SelectItem>
          </SelectContent>
        </Select>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((data?.total ?? 0) / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default UserPage
