import clsx from 'clsx';
import type { ReactNode } from 'react';
import digiWalletWhite from 'public/images/wallets/digiwallet-white.png';
import ekyashWhite from 'public/images/wallets/ekaysh-white.png';

export enum ButtonColors {
  Primary,
  Text,
  EKyash,
  DigiWallet,
}

export type ButtonProps = {
  /**
   * Where to redirect the user to
   */
  href?: string;
  /**
   * The button's variant
   */
  variant: 'button' | 'submit' | 'link';
  /**
   * Is this the principal call to action on the page?
   */
  color?: ButtonColors;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button should take up the full width of its container.
   */
  isFullWidth?: boolean;
  /**
   * A right aligned icon to display with your button
   */
  icon?: ReactNode;
  /**
   * Text to show inside button
   */
  children: ReactNode;
  disabled?: boolean;
};

const sizes = {
  small: 'text-sm px-4 py-3',
  medium: 'text-base px-4 py-3',
  large: 'text-lg px-4 py-3',
};

const modes = {
  secondary: 'text-gray-900 bg-transparent shadow-md',
  ekyash: 'bg-ekyash-1 text-gray-100 hover:text-white hover:bg-ekyash-2',
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  digiWallet: 'bg-digi-1 text-gray-100 hover:text-white hover:bg-digi-2',
};
/**
 * Primary UI component for user interaction
 */
export const Button = ({
  color = ButtonColors.Primary,
  size = 'medium',
  children,
  variant = 'button',
  isFullWidth = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  if (variant === 'link' && typeof variant === 'undefined') {
    throw new Error('Button links required `href` to be defined.');
  }

  if (variant === 'link') {
    const As = disabled ? 'span' : 'a';
    return (
      <As
        target="_blank"
        href={props.href}
        className={clsx(
          `inline-flex cursor-pointer items-center rounded-md border-0 text-center text-base font-semibold tracking-wider ${sizes[size]}`,
          {
            [modes.primary]: color === ButtonColors.Primary,
            [modes.secondary]: color === ButtonColors.Text,
            [modes.ekyash]: color === ButtonColors.EKyash,
            [modes.digiWallet]: color === ButtonColors.DigiWallet,
            'w-full justify-center': isFullWidth,
            'w-fit': !isFullWidth,
            'cursor-not-allowed opacity-50': disabled,
          },
        )}
        rel="noreferrer"
      >
        {color === ButtonColors.EKyash ? <img src={ekyashWhite} alt="ekyash" className="-mb-1 mr-2 h-6 w-24" /> : null}
        {color === ButtonColors.DigiWallet ? (
          <img src={digiWalletWhite} alt="digiwallet" className="mr-4 h-6 w-24" />
        ) : null}

        {children}

        {props.icon ? <span className="ml-2">props.icon</span> : null}
      </As>
    );
  }

  return (
    <button
      type={variant}
      disabled={disabled}
      className={clsx(
        `inline-flex cursor-pointer flex-row items-center rounded-md border-0 text-base font-semibold tracking-wider ${sizes[size]}`,
        {
          [modes.primary]: color === ButtonColors.Primary,
          [modes.secondary]: color === ButtonColors.Text,
          [modes.ekyash]: color === ButtonColors.EKyash,
          [modes.digiWallet]: color === ButtonColors.DigiWallet,
          'w-full justify-center': isFullWidth,
          'w-fit': !isFullWidth,
          'cursor-not-allowed opacity-50': disabled,
        },
      )}
      {...props}
    >
      {color === ButtonColors.EKyash ? <img src={ekyashWhite} alt="ekyash" className="-mb-1 mr-2 h-6 w-24" /> : null}
      {color === ButtonColors.DigiWallet ? (
        <img src={digiWalletWhite} alt="digiwallet" className="mr-2 h-5 w-20" />
      ) : null}

      {children}

      {props.icon ? <span className="ml-2">{props.icon}</span> : null}
    </button>
  );
};
