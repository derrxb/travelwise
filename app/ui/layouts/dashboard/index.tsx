import { Outlet } from '@remix-run/react';
import { Package, Settings, ShoppingCart } from 'lucide-react';
import React from 'react';
import { Routes } from '~/ui/atoms/sidebar-item';
import { BurgerNav } from '~/ui/molecules/burger-nav';
import { NavItem } from '~/ui/molecules/nav-item';

export const Dashboard = () => {
  return (
    <React.Fragment>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex items-center">
        <nav className="mt-6 flex flex-col space-y-2 justify-center">
          <NavItem content="Products" label="Products" href={Routes.Products} icon={<Package className="h-5 w-5" />} />
          <NavItem content="Orders" label="Orders" href={Routes.Orders} icon={<ShoppingCart className="h-5 w-5" />} />
          <NavItem content="Settings" label="Settings" href={Routes.Settings} icon={<Settings className="h-5 w-5" />} />
        </nav>
      </aside>

      <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20 lg:pr-8 md:pr-4">
        <BurgerNav />
        <Outlet />
      </main>
    </React.Fragment>
  );
};
