import { OrderStatus as OrderStatusEnum } from '@prisma/client';
import clsx from 'clsx';

export type OrderStatusProps = {
  status: OrderStatusEnum;
};

const getPrettyPaymentStatus = (status: OrderStatusProps['status']) => {
  switch (status) {
    case OrderStatusEnum.Completed:
      return 'Completed';
    case OrderStatusEnum.Pending:
      return 'In Progress';
    case OrderStatusEnum.Failed:
      return 'Cancelled';
    default:
      break;
  }
};

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex flex-col">
      <span className="mb-2 text-xs uppercase text-gray-500">Status</span>

      <span
        className={clsx('font-semibold', {
          'text-green-500': OrderStatusEnum.Completed === status,
          'text-primary-1': OrderStatusEnum.Pending === status,
          'text-red-500': OrderStatusEnum.Failed === status,
        })}
      >
        {getPrettyPaymentStatus(status)}
      </span>
    </div>
  );
};
