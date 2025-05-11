// src/components/cart/QuantitySelector.tsx
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  maxQuantity?: number; // Optional: if there's a stock limit
}

export function QuantitySelector({ quantity, onQuantityChange, maxQuantity = 99 }: QuantitySelectorProps) {
  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1)); // Ensure quantity doesn't go below 1
  };

  const handleIncrement = () => {
    onQuantityChange(Math.min(maxQuantity, quantity + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }
    onQuantityChange(newQuantity);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={handleDecrement} disabled={quantity <= 1} aria-label="Decrease quantity">
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-16 text-center h-9"
        min="1"
        max={maxQuantity.toString()}
        aria-label="Item quantity"
      />
      <Button variant="outline" size="icon" onClick={handleIncrement} disabled={quantity >= maxQuantity} aria-label="Increase quantity">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
