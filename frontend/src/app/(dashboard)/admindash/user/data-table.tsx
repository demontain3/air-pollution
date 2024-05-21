"use client"

import { useRouter } from "next/navigation"
import { LeadStatus, Range } from "@/types"
import { AvatarImage } from "@radix-ui/react-avatar"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { PencilLine, Trash } from "lucide-react"

import { enumToArray } from "@/lib/enumToArray"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import DeleteButton from "@/components/DeleteButton"
import Status from "@/components/Status"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  //   applyFilter: (filter: Range) => void;
  //   clearFilter: () => void;
  refetchData: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  refetchData,
}: //   applyFilter,
//   clearFilter,
DataTableProps<TData, TValue>) {
  const router = useRouter()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  // const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  return (
    <div className="rounded-ee-3xl rounded-es-3xl border bg-slate-950 text-slate-300">
      <Table>
        <TableHeader className="h-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-slate-800 hover:bg-slate-800"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-row items-center gap-3 font-extrabold text-slate-300">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* {header.column.columnDef.header != "Actions" && (
                        <TablePopover
                          filterValue={filterValues[header.id] || ""}
                          onFilterChange={(value) =>
                            setFilterValues((prev) => ({
                              ...prev,
                              [header.id]: value,
                            }))
                          }
                          onCancel={() => {
                            clearFilter();
                          }}
                          onSubmit={() => {
                            const filterValue = filterValues[header.id]; // Use filterValues instead of filterValue
                            if (
                              header.column.columnDef?.header === "Name" ||
                              header.column.columnDef?.header === "Email"
                            ) {
                              // Apply range filter
                              applyFilter({
                                property:
                                  (
                                    header.column.columnDef?.header as string
                                  )?.toLowerCase() ?? "",
                                lower: filterValue,
                                upper: filterValue + "z",
                              });
                            } else {
                              // Apply normal filter
                              applyFilter({
                                property:
                                  (
                                    header.column?.columnDef?.header as string
                                  )?.toLowerCase() ?? "",
                                lower: filterValue,
                                upper: filterValue,
                              });
                            }
                          }}
                          contentType={
                            header.column.columnDef?.header === "Status"
                              ? "select"
                              : "text"
                          }
                          options={leadsStatusOptions} // Pass your LeadStatus options here
                        />
                      )} */}
                    </div>
                  )}
                </TableHead>
              ))}
              <TableHead className="ml-6 flex items-center justify-start pt-12 font-extrabold text-slate-300">
                Actions
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "name" ? (
                      <div className="flex items-center gap-4">
                        {/* <Avatar>
                          <AvatarImage
                            src={
                              `${process.env.NEXT_PUBLIC_BACKEND_API_URL_ORGANIZATIONS}` +
                              "/" +
                              (row?.original as { profilePicture: string })
                                ?.profilePicture
                            }
                          />
                          <AvatarFallback>
                            {(row?.original as { name: string })?.name
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar> */}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    ) : cell.column.id === "createdAt" ? (
                      new Date(
                        (row?.original as { createdAt: string })?.createdAt
                      ).toLocaleDateString()
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell className="flex h-full items-center justify-start gap-2 text-muted-foreground ">
                  <Button
                    variant={"link"}
                    className="w-12 flex-col "
                    onClick={() =>
                      router.push(
                        `/dashboard/customers/${
                          (row?.original as { id: number })?.id
                        }`
                      )
                    }
                  >
                    <PencilLine width={100} height={100} />
                    <p className="h-1 text-sm text-primary">Edit</p>
                  </Button>

                  <DeleteButton
                    id={(row?.original as { id: number })?.id}
                    entity="customers"
                    onDeleteSuccess={() => {
                      {
                        refetchData
                      }
                    }}
                    queryKey={["customers"]}
                    url={process.env.NEXT_PUBLIC_BACKEND_API_URL_LEADS}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center hover:bg-slate-950 bg-slate-950 rounded-es-3xl"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
