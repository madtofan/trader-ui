import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface NavsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const navsConfig: NavsConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Config",
      href: "/dashboard/config",
    },
    {
      title: "Docs",
      href: "/dashboard/docs",
    }
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          items: [],
        },
      ],
    },
    {
      title: "Configurations",
      items: [
        {
          title: "Notifications",
          href: "/dashboard/config",
          items: [],
        },
        {
          title: "Templates",
          href: "/dashboard/config/templates",
          items: [],
        },
      ],
    },
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
      ],
    },
  ],
}
