import { NavLink } from '@remix-run/react';

export type KrabuuProps = {
  isLink?: boolean;
  size: 'small' | 'medium' | 'large';
  className?: string;
};

export const Krabuu = ({ size, isLink, className }: KrabuuProps) => {
  const sizeClass = size === 'small' ? 'text-xs !font-bold' : size === 'medium' ? 'text-md' : 'text-2xl';
  const As = isLink ? NavLink : 'span';

  return (
    <As to="/" className={`font-extrabold tracking-tight text-primary-3 ${sizeClass} ${className}`}>
      krabuu.
    </As>
  );
};
