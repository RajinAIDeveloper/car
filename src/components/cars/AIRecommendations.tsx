// src/components/cars/AIRecommendations.tsx
"use client";

import type { Car, AIRecommendation as AIRecommendationType } from '@/types';
// import { generateCarRecommendations, type GenerateCarRecommendationsInput } from '@/ai/flows/generate-car-recommendations'; // Commenting out AI flow
import { cars as allCars } from '@/data/cars'; // Import all cars
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Wand2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

interface AIRecommendationsProps {
  selectedCar: Car;
  userPreferences?: string; // Optional user preferences input
}

export function AIRecommendations({ selectedCar, userPreferences }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isRandom, setIsRandom] = useState(false); // To track if recommendations are random

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsRandom(false); 
    try {
      // Simulate a delay for fetching, similar to an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      let foundRecommendations: Car[] = [];

      // 1. Try to find cars of the same make (excluding the selected car itself)
      if (selectedCar) {
        foundRecommendations = allCars.filter(
          car => car.make === selectedCar.make && car.id !== selectedCar.id
        );
      }

      // 2. If not enough, try to find cars with at least 2 common features (excluding the selected car)
      if (foundRecommendations.length < 3 && selectedCar && selectedCar.features) {
        const potentialRecs = allCars.filter(car => {
          if (car.id === selectedCar.id) return false;
          const commonFeatures = car.features.filter(feature => selectedCar.features.includes(feature));
          return commonFeatures.length >= 2;
        });
        // Add to foundRecommendations, avoiding duplicates
        potentialRecs.forEach(rec => {
          if (!foundRecommendations.find(fr => fr.id === rec.id)) {
            foundRecommendations.push(rec);
          }
        });
      }
      
      // 3. If still no recommendations (or less than 3), show random cars
      if (foundRecommendations.length === 0) {
        setIsRandom(true);
        const shuffled = [...allCars].filter(c => c.id !== selectedCar?.id).sort(() => 0.5 - Math.random());
        foundRecommendations = shuffled.slice(0, 3);
      } else if (foundRecommendations.length > 3) {
        // Limit to 3 recommendations if more are found
        foundRecommendations = foundRecommendations.slice(0, 3);
      }


      const recommendationsWithDetails: AIRecommendationType[] = foundRecommendations.map(car => ({
        id: car.id, // Add id
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        features: car.features,
        reasoning: car.make === selectedCar?.make ? `Similar make to ${selectedCar.make}` : `Shares common features`, // Basic reasoning
        imageUrl: car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : `https://picsum.photos/seed/${car.make}${car.model.replace(/\s+/g, '')}/300/200`, // Use actual image or placeholder
      }));

      setRecommendations(recommendationsWithDetails);
      setShowRecommendations(true);
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setError("Sorry, we couldn't fetch recommendations at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCar, userPreferences]); // userPreferences is not directly used now but kept for potential future use


  if (!showRecommendations && !isLoading) {
    return (
      <div className="my-8 p-6 bg-accent/20 rounded-lg text-center">
        <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-foreground">Discover Similar Cars</h3>
        <p className="text-muted-foreground mb-4">Find great alternatives for you based on the {selectedCar.make} {selectedCar.model}.</p>
        <Button onClick={fetchRecommendations} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" /> Show Recommendations
            </>
          )}
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-8 p-6 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Generating recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 p-6 bg-destructive/10 border border-destructive text-destructive rounded-lg text-center">
        <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
        <p>{error}</p>
         <Button onClick={fetchRecommendations} variant="outline" className="mt-4">Try Again</Button>
      </div>
    );
  }

  if (recommendations.length === 0 && showRecommendations && !isRandom) { // Only show if not random and no recs
    return (
       <div className="my-8 p-6 bg-card border rounded-lg text-center">
        <Wand2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No specific recommendations found for this car at the moment.</p>
      </div>
    );
  }
  
  // If recommendations are random, adjust the title
  const title = isRandom 
    ? "No specific recommendations found. Check out some of our other products:" 
    : "Similar Car Recommendations";

  return (
    <div className="my-8">
      <h3 className="text-2xl font-semibold mb-6 text-foreground">{title}</h3>
      {recommendations.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => ( // Use rec.id if available, otherwise index
          <Card key={rec.id || rec.make + rec.model} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href={`/cars/${rec.id}`} passHref>
              <div className="aspect-video relative w-full cursor-pointer">
                <Image
                  src={rec.imageUrl || '/placeholder-car.png'} // Ensure imageUrl is always defined
                  alt={`${rec.make} ${rec.model}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/cars/${rec.id}`} passHref>
                <CardTitle className="text-lg font-semibold mb-1 cursor-pointer hover:underline">{rec.make} {rec.model} ({rec.year})</CardTitle>
              </Link>
              <p className="text-md font-bold text-primary mb-2">${rec.price.toLocaleString()}</p>
              {rec.features && rec.features.length > 0 && (
                <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden"><strong>Features:</strong> {rec.features.join(', ')}</p>
              )}
              {isRandom && <p className="text-sm text-foreground italic">This is one of our popular models.</p>}
              {!isRandom && rec.reasoning && <p className="text-sm text-foreground"><strong>Reasoning:</strong> {rec.reasoning}</p>}
              
              <Link href={`/cars/${rec.id}`} passHref>
                <Button variant="outline" className="mt-4 w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
      {recommendations.length === 0 && showRecommendations && isRandom && ( // Message if random yielded no results (edge case)
         <div className="my-8 p-6 bg-card border rounded-lg text-center">
          <Wand2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">We couldn't find any other products to show right now.</p>
        </div>
      )}
    </div>
  );
}
