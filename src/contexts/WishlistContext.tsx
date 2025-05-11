// src/contexts/WishlistContext.tsx
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WishlistItem, Car } from '@/types';
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (car: Car) => void;
  removeFromWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
  getWishlistItemCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  const addToWishlist = useCallback((car: Car) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === car.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${car.make} ${car.model} is already in your wishlist.`,
        });
        return prevItems;
      }
      toast({
        title: "Added to Wishlist",
        description: `${car.make} ${car.model} has been added to your wishlist.`,
      });
      return [...prevItems, { ...car }];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((carId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== carId));
    toast({
      title: "Removed from Wishlist",
      description: `Item removed from your wishlist.`,
      variant: "destructive",
    });
  }, [toast]);

  const isInWishlist = useCallback((carId: string) => {
    return wishlistItems.some((item) => item.id === carId);
  }, [wishlistItems]);
  
  const getWishlistItemCount = useCallback(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistItemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
