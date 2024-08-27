import clsx from 'clsx';
import type { ReactNode } from 'react';
import { SiteNav } from '~/ui/molecules/site-nav';

export type PageProps = {
  className?: string;
  children: ReactNode | ReactNode[];
  hasTopNav?: boolean;
};

export const Page = ({ children, className, hasTopNav }: PageProps) => {
  return (
    <div className={clsx('flex h-full w-full flex-col bg-slate-50 px-4 md:px-12 lg:px-20', className)}>
      {hasTopNav ? <SiteNav className="mb-8" /> : null}
      {children}
    </div>
  );
};
