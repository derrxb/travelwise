import type { Currency } from '@prisma/client';

export function getPrettyCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-BZ', { style: 'currency', currency }).format(amount);
}
