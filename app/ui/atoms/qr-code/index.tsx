import clsx from 'clsx';

export type QRCodeProps = {
  url: string;
  className?: string;
};

export const QRCode = ({ url, className }: QRCodeProps) => {
  return (
    <div className="self-center rounded-md p-2 shadow-lg">
      <img src={url} alt="payment qr code" className={clsx('h-44 w-44  md:h-56 md:w-56', className)} />
    </div>
  );
};
