// src/components/cars/CarCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Removed duplicate imports that were here
import { ShoppingCart, Heart, Eye, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { StarRating } from '@/components/reviews/StarRating';
import { motion } from 'framer-motion';
import { generateWhatsAppLink } from '@/lib/whatsappHelper'; // Added for direct WhatsApp link

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface CarCardProps {
  car: Car;
  priorityImage?: boolean;
}

export function CarCard({ car, priorityImage }: CarCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const primaryImageUrl = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : 'https://picsum.photos/600/400?random';

  return (
    <motion.div
      variants={cardVariants}
      // `initial` and `animate` will be controlled by the parent `motion.div` if part of a list animation
      // If used standalone, you can uncomment these:
      // initial="hidden"
      // animate="visible" 
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
        <CardHeader className="p-0">
          <Link href={`/cars/${car.id}`} aria-label={`View details for ${car.make} ${car.model}`}>
            <motion.div 
              className="aspect-video relative w-full overflow-hidden"
              // whileHover={{ scale: 1.05 }} // Image specific hover, if desired
            >
              <Image
                src={primaryImageUrl}
                alt={`${car.make} ${car.model}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300" // Removed group-hover:scale-105 to let framer-motion handle it potentially
                data-ai-hint={car.dataAiHint || "car dealership"}
                priority={priorityImage}
              />
            </motion.div>
          </Link>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl font-semibold mb-1">
            <Link href={`/cars/${car.id}`} className="hover:text-primary transition-colors">
              {car.make} {car.model}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2">{car.year}</CardDescription>
          <p className="text-lg font-bold text-primary mb-2">
            AED {car.price.toLocaleString()}
          </p>
          <div className="flex items-center mb-2">
            <StarRating rating={car.averageRating} size={16} />
            <span className="ml-2 text-xs text-muted-foreground">({car.reviewsCount} reviews)</span>
          </div>
          <p className="text-sm text-foreground line-clamp-2">{car.description}</p>
        </CardContent>
        <CardFooter className="p-3 flex flex-row justify-center items-center gap-2 border-t">
          <Button 
            size="icon" 
            onClick={() => addToCart(car)} 
            aria-label={`Add ${car.make} ${car.model} to cart`}
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            onClick={() => {
              const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890"; // Use env variable or default
              const message = `Hello DriveDeals, I'm interested in the ${car.make} ${car.model} (${car.year}) priced at AED ${car.price.toLocaleString()}. Could you provide more details or schedule a viewing?`;
              const link = generateWhatsAppLink(phoneNumber, message);
              window.open(link, '_blank', 'noopener,noreferrer');
            }}
            className="bg-green-500 hover:bg-green-600 text-white"
            aria-label={`Chat on WhatsApp about ${car.make} ${car.model}`}
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={handleWishlistToggle}
            aria-label={isInWishlist(car.id) ? `Remove ${car.make} ${car.model} from wishlist` : `Add ${car.make} ${car.model} to wishlist`}
            title={isInWishlist(car.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`h-5 w-5 ${isInWishlist(car.id) ? 'fill-destructive text-destructive' : ''}`} />
          </Button>

          <Button
            size="icon"
            variant="outline"
            asChild
            aria-label={`View details for ${car.make} ${car.model}`}
            title="View Details"
          >
            <Link href={`/cars/${car.id}`}>
              <Eye className="h-5 w-5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
