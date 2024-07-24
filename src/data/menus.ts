import { NavItem } from "@/components/blocks/dashboard-sidebar-menu";

export const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "Blogs",
    path: "/blogs",
  },
  {
    name: "Members",
    path: "/members",
  },
];

export const eventMenus = [
  {
    name: "List Event",
    path: "/dashboard/events",
  },
  {
    name: "Create Event",
    path: "/dashboard/events/create",
  },
];

export const badgesMenus = [
  {
    name: "List Badge",
    path: "/dashboard/badges",
  },
  {
    name: "Create Badge",
    path: "/dashboard/badges/create",
  },
];

export const usersMenus = [
  {
    name: "List User",
    path: "/dashboard/users",
  },
];

export const adminSetingsMenus = [
  {
    name: "List Admin",
    path: "/dashboard/admin-settings",
  },
  {
    name: "Add Admin",
    path: "/dashboard/admin-settings/add",
  },
];

export const dashboardMenus: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Articles",
    href: "/dashboard/articles",
    icon: "newspaper",
    label: "Articles",
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: "callenderplus",
    label: "Events",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: "user",
    label: "Users",
  },
  {
    title: "Badges",
    href: "/dashboard/badges",
    icon: "award",
    label: "Badges",
  },
  {
    title: "Admin Settings",
    href: "/dashboard/admin-settings",
    icon: "lockkeyhole",
    label: "Admin Settings",
  },
];
