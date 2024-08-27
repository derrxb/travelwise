import { NavLink } from '@remix-run/react';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export const enum Routes {
  Dashboard = '/dashboard',
  Products = '/products',
  Orders = '/orders',
  Settings = '/settings',
}

export type SidebarItemProps = {
  icon: ReactNode;
  children: ReactNode;
  to: Routes;
};

export const SidebarItem = ({ icon, children, to }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx('inline-flex w-full items-center rounded-lg py-2 px-4', {
          'bg-transparent text-gray-800 hover:text-blue-600': !isActive,
          'bg-blue-600 text-white': isActive,
        })
      }
    >
      {icon}
      {children}
    </NavLink>
  );
};
