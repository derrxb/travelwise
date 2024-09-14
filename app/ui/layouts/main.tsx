import { Link } from '@remix-run/react';
import React from 'react';
import logo from '~/assets/images/logo.png';
import { SiteNav } from '../molecules/site-nav';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full px-4 md:px-20">
      <SiteNav />

      <main className="h-full w-full flex flex-col pt-6 md:pt-12">{children}</main>
    </div>
  );
};
