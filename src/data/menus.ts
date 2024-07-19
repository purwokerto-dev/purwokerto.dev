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
