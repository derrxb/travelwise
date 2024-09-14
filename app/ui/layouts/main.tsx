import { Link } from '@remix-run/react';
import React from 'react';
import logo from '~/assets/images/logo.png';
import { SiteNav } from '../molecules/site-nav';
import { cn } from '~/lib/utils';

export const MainLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className="h-full w-full px-4 md:px-20" style={{ backgroundImage: "url('/background-1.png')" }}>
      <SiteNav />

      <main className={cn('h-full w-full flex flex-col pt-6 md:pt-12', className)}>{children}</main>
    </div>
  );
};
