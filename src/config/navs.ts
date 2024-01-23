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
      title: "Docs",
      href: "/dashboard/docs",
    },
    {
      title: "GitHub",
      href: "https://github.com/madtofan/trader-ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/madtofan",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Projects",
      items: [
        {
          title: "Project 1",
          href: "/dashboard/1",
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
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "components.json",
          href: "/docs/components-json",
          items: [],
        },
        {
          title: "Theming",
          href: "/docs/theming",
          items: [],
        },
        {
          title: "Dark mode",
          href: "/docs/dark-mode",
          items: [],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/components/typography",
          items: [],
        },
        {
          title: "Figma",
          href: "/docs/figma",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
  ],
}
