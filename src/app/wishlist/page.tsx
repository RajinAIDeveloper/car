// src/app/wishlist/page.tsx
import { WishlistView } from '@/components/wishlist/WishlistView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Wishlist - DriveDeals',
  description: 'View your saved cars.',
};

export default function WishlistPage() {
  return <WishlistView />;
}
