import { NavLink } from '@remix-run/react';
import logo from '~/assets/images/logo.png';

export type NavLogoProps = {
  isLink?: boolean;
  size: 'small' | 'medium' | 'large';
  className?: string;
  isText?: boolean;
};

export const NavLogo = ({ size, isLink, className, isText }: NavLogoProps) => {
  const sizeClass = size === 'small' ? 'text-xs !font-bold' : size === 'medium' ? 'text-md' : 'text-2xl';
  const As = isLink ? NavLink : 'span';

  return (
    <As to="/" className={`font-extrabold tracking-tight text-primary-3 ${sizeClass} ${className}`}>
      {isText ? 'TravelWise' : <img src={logo} className="w-36" />}
    </As>
  );
};
