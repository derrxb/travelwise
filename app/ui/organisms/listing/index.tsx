import noop from 'lodash/noop';
import type { OrderDTO } from '~/domain/orders/entities/order';
import { PaymentMethodSelector } from '~/ui/molecules/payment-methods/selector';
import { PaymentPayDetails } from '~/ui/molecules/payment-pay-details';

export type ListingProps = {
  order: OrderDTO;
};

export const Listing = ({ order }: ListingProps) => {
  return (
    <div className="flex h-full w-full flex-col text-gray-800 md:flex-row">
      <div className="h-full w-full lg:w-1/2">
        <PaymentPayDetails hasOrderItemsDisplayed order={order} user={order.user} />
      </div>

      <div className="h-full w-full lg:w-1/2">
        <PaymentMethodSelector onClick={noop} />
      </div>
    </div>
  );
};
