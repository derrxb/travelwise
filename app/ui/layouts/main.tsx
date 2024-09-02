import { Link } from '@remix-run/react';
import React from 'react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col">
      <nav className="flex flex-row items-center w-full h-16 px-4 md:16 xl:px-32 bg-slate-100 font-sans">
        <Link to="/" className="font-bold text-black text-2xl">
          Zelo
        </Link>
      </nav>

      <div className="h-full w-full flex flex-col">{children}</div>
    </main>
  );
};
