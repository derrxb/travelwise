import { Link } from '@remix-run/react';
import React from 'react';
import logo from '~/assets/images/logo.png';
import { SiteNav } from '../molecules/site-nav';
import { cn } from '~/lib/utils';

export const MainLayout = ({
  children,
  className,
  enableBackgroundImage,
}: {
  children: React.ReactNode;
  className?: string;
  enableBackgroundImage?: boolean;
}) => {
  return (
    <div
      className="h-full w-full px-4 md:px-20"
      style={enableBackgroundImage ? { backgroundImage: "url('/background-1.png')" } : {}}
    >
      <SiteNav />

      <main className={cn('h-full w-full flex flex-col', className)}>{children}</main>
    </div>
  );
};
