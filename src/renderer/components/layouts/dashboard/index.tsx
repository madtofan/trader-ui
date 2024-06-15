import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { navsConfig } from '@/lib/config/navs';
import { useCurrentUser } from '@/lib/hooks/userApi';
import Icons from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { toast } from '@/components/ui/use-toast';
import { useGetNotifications } from '@/lib/hooks/notificationApi';
import { SidebarNav } from './sidebar-nav';
import MobileNav from './mobile-nav';
import MainNav from './main-nav';
import CommandMenu from './command-menu';
import MainLayout from '../main-layout';
import ModeToggle from './mode-toggle';

function UserProfileNavigation() {
  const { data: currentUser, isLoading } = useCurrentUser({
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Skeleton className="h-4 w-[50px]" />;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {currentUser?.data.first_name}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/logout">Logout</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const isLoading = false;
  // TODO - get user permission

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-xl max-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-10rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          <SidebarNav items={navsConfig.sidebarNav} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: notifications } = useGetNotifications();

  useEffect(() => {
    if (notifications) {
      toast({
        title: 'Notification',
        description: notifications as string,
      });
    }
  }, [notifications]);
  return (
    <MainLayout>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center">
              <ModeToggle />
            </nav>
            <UserProfileNavigation />
          </div>
        </div>
      </header>
      <DashboardContent>{children}</DashboardContent>
    </MainLayout>
  );
}
