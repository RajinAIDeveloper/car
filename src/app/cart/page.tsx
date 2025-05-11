// src/app/cart/page.tsx
import { CartView } from '@/components/cart/CartView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart - DriveDeals',
  description: 'Review your selected cars and proceed to checkout.',
};

export default function CartPage() {
  return <CartView />;
}
