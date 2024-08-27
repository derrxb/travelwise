import { Link, NavLink } from '@remix-run/react';
import clsx from 'clsx';
import React from 'react';

export type BurgerNavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export const BurgerNavItem = (props: BurgerNavItemProps) => {
  return (
    <NavLink
      to={props.href}
      className={({ isActive }) =>
        clsx('flex items-center gap-4 text-muted-foreground hover:text-foreground', {
          'text-foreground': isActive,
        })
      }
    >
      {props.icon}
      {props.label}
    </NavLink>
  );
};
