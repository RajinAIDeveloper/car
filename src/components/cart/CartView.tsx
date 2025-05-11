// src/components/cart/CartView.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { QuantitySelector } from './QuantitySelector';
import { Separator } from '@/components/ui/separator';
import { WhatsAppButton } from '@/components/common/WhatsAppButton'; 

export function CartView() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-foreground">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any cars to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" /> Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  const cartTotal = getCartTotal();
  const firstCarInCartForWhatsApp = cartItems.length > 0 ? cartItems[0] : null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Your Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item) => {
          const primaryImageUrl = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : 'https://picsum.photos/300/200?random';
          return (
            <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 shadow-md">
              <div className="relative w-full sm:w-32 h-32 sm:h-24 aspect-video sm:aspect-auto rounded-md overflow-hidden shrink-0">
                <Image
                  src={primaryImageUrl}
                  alt={`${item.make} ${item.model}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 128px"
                  className="object-cover"
                  data-ai-hint={item.dataAiHint || "car sideview"}
                />
              </div>
              <div className="flex-grow">
                <Link href={`/cars/${item.id}`} className="hover:text-primary">
                  <h3 className="text-lg font-semibold">{item.make} {item.model} ({item.year})</h3>
                </Link>
                <p className="text-primary font-medium text-md">AED {item.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                />
                <p className="text-lg font-semibold w-24 text-right hidden sm:block">
                  AED {(item.price * item.quantity).toLocaleString()}
                </p>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80" aria-label={`Remove ${item.make} ${item.model} from cart`}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Separator className="my-8" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="font-semibold">AED {cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping & Taxes</span>
            <span>Calculated at checkout</span>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>AED {cartTotal.toLocaleString()}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button size="lg" className="w-full sm:w-auto sm:flex-1 bg-green-500 hover:bg-green-600 text-white">
            Proceed to Checkout (Demo)
          </Button>
          {firstCarInCartForWhatsApp && (
            <WhatsAppButton car={firstCarInCartForWhatsApp} />
          )}
        </CardFooter>
      </Card>
       <div className="mt-6 text-right">
            <Button variant="outline" onClick={clearCart} className="text-destructive border-destructive hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
        </div>
    </div>
  );
}
