import type { Currency } from '@prisma/client';
import { getPrettyCurrency } from '~/lib/currency';

export type OrderTotalProps = {
  amount: number;
  currency: Currency;
};

export const OrderTotal = ({ amount, currency }: OrderTotalProps) => {
  return (
    <div className="flex flex-col">
      <span className="mb-2 text-xs uppercase text-gray-500">Total</span>
      <span className=" text-lg font-semibold text-primary-1 md:text-xl">
        {getPrettyCurrency(amount / 100, currency)}
      </span>
    </div>
  );
};
