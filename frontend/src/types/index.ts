import { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export interface Role {
  id: number
  name: string
}

export interface User {
  id: number
  email: string
  password: string
  isVerified: boolean
  firstName: string
  lastName: string
  roles?: Role[]
}

export interface ApiData<T> {
  data: T[]
  total: number
}

export interface FetchParams {
  url: string
  filters: Range[]
  page?: number
  pageSize?: number
  rangeFields: string[]
  type?: string
  where?: Where
  who?: string
}

// types/index.ts
export interface Range {
  property: string
  lower: string
  upper: string
}

export interface LeadStatus {
  PAID: "PAID"
  UNPAID: "UNPAID"
}

export interface Lead {
  name: string
  email: string
  phone: string
  // status: LeadsStatus;
  address: string
  id: number
  revenuePotential: number
}

export interface Customer {
  name: string
  email: string
  phone: string
  profile: string
  address: string
  id: number
  revenuePotential: number
}

export interface Segment {
  id: number
  name: string
  description: string
  createdAt: string
  userId: number
}

export interface QueryParams extends FetchParams {
  headers?: Record<string, string> // New headers property
  whereFilters?: WhereFilter[] // Add whereFilters property with default value
}

export interface WhereFilter {
  property: string // The property to filter on
  operator?: "<" | "<=" | ">" | ">=" | "=" | "" // The comparison operator (optional)
  value?: string | number // The value to compare against (optional)
}
interface Where {
  [key: string]: string | number | boolean
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren
