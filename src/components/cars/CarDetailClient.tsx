// src/components/cars/CarDetailClient.tsx
"use client";

import type { Car, Review } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, MessageSquare, Tag, CalendarDays, Settings, Image as ImageIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { AIRecommendations } from './AIRecommendations';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { StarRating } from '@/components/reviews/StarRating';
import { useState, useEffect } from 'react';
import { addReviewToCar as addReviewToCarData } from '@/data/cars'; 
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Carousel import was here, but not used. Removed to avoid confusion.
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

interface CarDetailClientProps {
  car: Car;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CarDetailClient({ car: initialCar }: CarDetailClientProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [car, setCar] = useState<Car>(initialCar);
  const [userPreferences, setUserPreferences] = useState<string>(""); // Not used yet, but kept from original
  const [currentImage, setCurrentImage] = useState(initialCar.imageUrls && initialCar.imageUrls.length > 0 ? initialCar.imageUrls[0] : 'https://picsum.photos/600/400?random');

  useEffect(() => {
    setCar(initialCar);
    if (initialCar.imageUrls && initialCar.imageUrls.length > 0) {
      setCurrentImage(initialCar.imageUrls[0]);
    }
  }, [initialCar]);

  const handleWishlistToggle = () => {
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const handleReviewSubmit = (newReview: Review) => {
    const updatedCar = addReviewToCarData(car.id, newReview);
    if (updatedCar) {
      setCar(updatedCar); 
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div 
        className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {/* Image Gallery Section */}
        <motion.div variants={sectionVariants}>
          <div className="aspect-video relative w-full overflow-hidden rounded-lg shadow-xl mb-4">
            <Image
              src={currentImage}
              alt={`${car.make} ${car.model} - main image`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
              data-ai-hint={car.dataAiHint || "car sideview"}
            />
          </div>
          {car.imageUrls && car.imageUrls.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {car.imageUrls.map((url, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImage(url)}
                  className={`aspect-square relative w-full overflow-hidden rounded-md border-2 transition-all
                              ${currentImage === url ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-muted-foreground'}`}
                  aria-label={`View image ${index + 1} of ${car.make} ${car.model}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={url}
                    alt={`${car.make} ${car.model} - thumbnail ${index + 1}`}
                    fill
                    sizes="10vw"
                    className="object-cover"
                    data-ai-hint={car.dataAiHint || "car thumbnail"}
                  />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Car Info and Actions Section */}
        <motion.div className="flex flex-col space-y-4" variants={sectionVariants}>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{car.make} {car.model}</h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CalendarDays className="h-5 w-5" /> 
            <span>{car.year}</span>
          </div>
          <div className="flex items-center">
            <StarRating rating={car.averageRating} size={20} />
            <a href="#reviews" className="ml-2 text-sm text-primary hover:underline">({car.reviewsCount} reviews)</a>
          </div>
          <p className="text-3xl font-extrabold text-primary">AED {car.price.toLocaleString()}</p>
          
          <p className="text-foreground leading-relaxed">{car.description}</p>

          <div className="space-y-3 pt-2">
            <Button onClick={() => addToCart(car)} size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <div className="flex space-x-3">
              <Button onClick={handleWishlistToggle} variant="outline" size="lg" className="flex-1">
                <Heart className={`mr-2 h-5 w-5 ${isInWishlist(car.id) ? 'fill-destructive text-destructive' : ''}`} />
                {isInWishlist(car.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
              <WhatsAppButton car={car} />
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Accordion type="single" collapsible defaultValue="features" className="w-full mb-8">
          <AccordionItem value="features">
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-primary" /> Key Features
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1 pl-2 text-foreground">
                  {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                  ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          {car.imageUrls && car.imageUrls.length > 0 && (
            <AccordionItem value="gallery">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5 text-primary" /> Image Gallery
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
                  {car.imageUrls.map((url, index) => (
                    <motion.div 
                      key={index} 
                      className="aspect-video relative w-full overflow-hidden rounded-md shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                       <Image
                          src={url}
                          alt={`${car.make} ${car.model} - image ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          className="object-cover transition-transform duration-300"
                          data-ai-hint={car.dataAiHint || "car photo"}
                          onClick={() => setCurrentImage(url)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setCurrentImage(url)}
                        />
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </motion.div>

      <Separator className="my-8" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <AIRecommendations selectedCar={car} userPreferences={userPreferences} />
      </motion.div>
      
      <Separator className="my-8" />

      <motion.div 
        id="reviews" 
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-2xl font-semibold flex items-center text-foreground">
            <MessageSquare className="mr-2 h-6 w-6 text-primary" /> Customer Reviews
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
            <ReviewList reviews={car.reviews || []} />
            <ReviewForm carId={car.id} onSubmitReview={handleReviewSubmit} />
        </div>
      </motion.div>
    </div>
  );
}
