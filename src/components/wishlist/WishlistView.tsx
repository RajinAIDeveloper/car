// src/components/wishlist/WishlistView.tsx
"use client";

import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { CarCard } from '@/components/cars/CarCard'; // Re-use CarCard for consistent display
import { Button } from '@/components/ui/button';
import { HeartCrack, ArrowLeft } from 'lucide-react';

export function WishlistView() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-12">
        <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground mb-6">Start adding your favorite cars to your wishlist.</p>
        <Button asChild size="lg">
          <Link href="/">
             <ArrowLeft className="mr-2 h-5 w-5" /> Explore Cars
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-foreground">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
