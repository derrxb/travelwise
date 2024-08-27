import clsx from 'clsx';
import type { ReactNode } from 'react';

export enum HeadingVariant {
  H1,
  H2,
  H3,
  H4,
  H5,
}

export enum HeadingAppearance {
  Primary,
  Secondary,
  UnStyled,
}

export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3';
  children: ReactNode | string;
  variant: HeadingVariant;
  appearance?: HeadingAppearance;
  className?: string;
};

export const Heading = ({
  as = 'h1',
  children,
  appearance = HeadingAppearance.Primary,
  variant,
  className,
}: HeadingProps) => {
  const As = as;

  return (
    <As
      className={clsx(
        'font-extrabold ',
        {
          'text-primary-3': HeadingAppearance.Primary === appearance,
          'text-primary-2': HeadingAppearance.Secondary === appearance,
          'flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0':
            HeadingVariant.H1 === variant,
          'text-2xl md:text-3xl lg:text-4xl': HeadingVariant.H2 === variant,
          'text-xl md:text-2xl lg:text-3xl': HeadingVariant.H3 === variant,
          'text-lg md:text-xl lg:text-2xl': HeadingVariant.H4 === variant,
          'text-base md:text-lg lg:text-xl': HeadingVariant.H5 === variant,
        },
        className,
      )}
    >
      {children}
    </As>
  );
};
