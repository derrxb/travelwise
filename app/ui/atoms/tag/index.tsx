import clsx from 'clsx';
import type { ReactNode } from 'react';

export enum TagAppearance {
  Gray,
}

export type TagProps = {
  children: ReactNode | string;
  appearance: TagAppearance;
};

const colors = {
  [TagAppearance.Gray]: 'bg-neutral-1 text-primary-3',
};

export const Tag = ({ children, appearance = TagAppearance.Gray }: TagProps) => {
  return (
    <div
      className={clsx('w-fit rounded-full px-2 py-1 text-xs font-bold', {
        [colors[TagAppearance.Gray]]: appearance === TagAppearance.Gray,
      })}
    >
      {children}
    </div>
  );
};
