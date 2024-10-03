/* eslint-disable react/no-unknown-property */
import React from 'react';
import { SiteFooter, TailwindIndicator, Toaster } from '@/modules/components';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-background font-sans antialiased"
      suppressHydrationWarning
    >
      <div vaul-drawer-wrapper="">
        <div className="relative flex min-h-screen flex-col bg-background justify-between">
          {children}
          <SiteFooter />
        </div>
        <TailwindIndicator />
        <Toaster />
      </div>
    </div>
  );
}
