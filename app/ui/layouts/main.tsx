import { Link } from '@remix-run/react';
import React from 'react';
import logo from '~/assets/images/logo.png';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="flex flex-row items-center w-full h-20 px-4 md:16 xl:px-32 bg-slate-100 font-sans">
        <Link to="/" className="font-bold text-black text-2xl font-sans">
          <img src={logo} alt="logo" className="w-12" />
        </Link>
      </nav>

      <main className="h-full w-full flex flex-col">{children}</main>
    </div>
  );
};
