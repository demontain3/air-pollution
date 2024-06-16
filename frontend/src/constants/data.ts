import { NavItem, SidebarNavItem } from "@/types"

import { Icons } from "@/components/icons"

export interface Review{
  location:string,

}

export type User = {
  id: number
  name: string
  company: string
  role: string
  verified: boolean
  status: string
}
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
]

export type Employee = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: string // Consider using a proper date type if possible
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  longitude?: number // Optional field
  latitude?: number // Optional field
  job: string
  profile_picture?: string | null // Profile picture can be a string (URL) or null (if no picture)
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admindash",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/admindash/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Routes",
    href: "/admindash/routes",
    icon: "add",
    label: "routes",
  },
  {
    title: "Sensor Data",
    href: "/admindash/sensor-data",
    icon: "media",
    label: "sensor",
  },
  {
    title: "Government",
    href: "/admindash/govt",
    icon: "help",
    label: "govt",
  },
  {
    title: "Kanban",
    href: "/admindash/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "LIVE MAP",
    href: "/admindash/map",
    icon: "dashboard",
    label: "map",
  },
]

export const navItemsUser: NavItem[] = [
  {
    title: "Dashboard",
    href: "/userdash",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Profile",
    href: "/userdash/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/userdash/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "LIVE MAP",
    href: "/userdash/map",
    icon: "dashboard",
    label: "map",
  },
]

// data.ts
export interface Sale {
  id: number;
  name: string;
  email: string;
  amount: string;
  avatar: string;
  initials: string;
}

export const salesData: Sale[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "/avatars/01.png",
    initials: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "/avatars/02.png",
    initials: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "/avatars/03.png",
    initials: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "/avatars/04.png",
    initials: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "/avatars/05.png",
    initials: "SD",
  },
];



export interface CardData {
  title: string;
  value: string;
  description: string;
  iconPath: string;
  iconViewBox: string;
}

export const cardData: CardData[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    iconViewBox: "0 0 24 24",
  },
  {
    title: "Subscriptions",
    value: "+2350",
    description: "+180.1% from last month",
    iconPath: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    iconViewBox: "0 0 24 24",
  },
  {
    title: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    iconPath: "M2 10h20 M2 5h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2V5z",
    iconViewBox: "0 0 24 24",
  },
  {
    title: "Active Now",
    value: "+573",
    description: "+201 since last hour",
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
    iconViewBox: "0 0 24 24",
  },
];
