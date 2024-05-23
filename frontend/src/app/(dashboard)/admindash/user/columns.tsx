"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Customer, Lead } from "@/types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Customer>[] = [
 
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
]
