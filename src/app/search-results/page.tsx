// src/app/search-results/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { cars as allCarsData, getCarById } from '@/data/cars';
import type { Car } from '@/types';
import { CarCard } from '@/components/cars/CarCard';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { SearchX, Info, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [exactMatchCar, setExactMatchCar] = useState<Car | null | undefined>(undefined); // undefined for loading
  const [similarCars, setSimilarCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check for aiScanResult parameter (backward compatibility)
  const aiScanResultParam = searchParams.get('aiScanResult');
  
  const identified = useMemo(() => {
    // First try to parse aiScanResult if it exists
    if (aiScanResultParam) {
      try {
        const aiResult = JSON.parse(decodeURIComponent(aiScanResultParam));
        return {
          make: aiResult.carInfo?.make || '',
          model: aiResult.carInfo?.model || '',
          year: aiResult.carInfo?.year || '',
          color: aiResult.carInfo?.color || '',
          q: aiResult.carInfo?.description || '',
          exactMatchId: '',
        };
      } catch (error) {
        console.error('Error parsing aiScanResult:', error);
      }
    }
    
    // Fall back to individual parameters
    return {
      make: searchParams.get('make') || '',
      model: searchParams.get('model') || '',
      year: searchParams.get('year') || '',
      color: searchParams.get('color') || '',
      q: searchParams.get('q') || '', // General query from description
      exactMatchId: searchParams.get('exactMatchId') || '',
    };
  }, [searchParams, aiScanResultParam]);

  useEffect(() => {
    setIsLoading(true);
    let foundExactMatch: Car | null = null;
    if (identified.exactMatchId) {
      foundExactMatch = getCarById(identified.exactMatchId) || null;
      setExactMatchCar(foundExactMatch);
    } else {
      setExactMatchCar(null); // No ID, so no exact match by ID
    }

    let filteredSimilarCars: Car[] = allCarsData;

    // Exclude exact match from similar cars list
    if (foundExactMatch) {
      filteredSimilarCars = filteredSimilarCars.filter(car => car.id !== foundExactMatch!.id);
    }
    
    // Filter by make
    if (identified.make) {
      filteredSimilarCars = filteredSimilarCars.filter(car => car.make.toLowerCase() === identified.make.toLowerCase());
    }
    
    // Further filter by model
    if (identified.make && identified.model) {
      const primarySimilar = filteredSimilarCars.filter(car => car.model.toLowerCase() === identified.model.toLowerCase());
      // If specific model matches found within the make, use that subset.
      // Otherwise, (if no primarySimilar) keep the current `filteredSimilarCars` (which are already filtered by make)
      // to search for other models of the same make or apply other filters.
      if (primarySimilar.length > 0) {
        filteredSimilarCars = primarySimilar;
      } else {
        // No exact model match for the given make, so we keep all models of that make for further filtering.
        // This allows finding other models of the same make if the AI-identified model isn't in stock or was slightly off.
      }
    } else if (identified.model && !identified.make) { // If only model is known
        filteredSimilarCars = filteredSimilarCars.filter(car => car.model.toLowerCase() === identified.model.toLowerCase());
    }

    // Filter by year for similar cars - with leniency
    if (identified.year && filteredSimilarCars.length > 0) {
      const targetYear = parseInt(identified.year, 10);
      if (!isNaN(targetYear)) {
        let yearFilteredCars = filteredSimilarCars.filter(car => car.year === targetYear);
        
        // If exact year match yields nothing, AND we had make/model as primary identifiers, try +/- 1 year.
        if (yearFilteredCars.length === 0 && (identified.make || identified.model)) {
          yearFilteredCars = filteredSimilarCars.filter(car => 
            Math.abs(car.year - targetYear) <= 1 
          );
        }
        
        // Apply the year filter if it yields results, or if no make/model was specified (year is the main filter).
        // This prevents a slightly off year from wiping out good make/model matches.
        if (yearFilteredCars.length > 0 || (!identified.make && !identified.model)) {
            filteredSimilarCars = yearFilteredCars;
        }
      }
    }
    
    // Color filter - add this functionality since it's mentioned in the identified criteria
    if (identified.color && filteredSimilarCars.length > 0) {
      const colorString = identified.color.toLowerCase();
      // Simple fuzzy color matching - look for color substring in description or features
      // Since Car type doesn't have a direct color property, we'll check description and features
      const colorFilteredCars = filteredSimilarCars.filter(car => {
        const carText = `${car.description} ${car.features.join(' ')}`.toLowerCase();
        return carText.includes(colorString);
      });
      
      // Only apply color filter if it doesn't eliminate all results
      if (colorFilteredCars.length > 0) {
        filteredSimilarCars = colorFilteredCars;
      }
    }

    // Filter by general query 'q' if present
    if (identified.q && filteredSimilarCars.length > 0) {
        const queryWords = identified.q.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2); // Ignore very short words
        if (queryWords.length > 0) {
            filteredSimilarCars = filteredSimilarCars.filter(car => {
                const carText = `${car.make} ${car.model} ${car.description} ${car.features.join(' ')}`.toLowerCase();
                return queryWords.some((word: string) => carText.includes(word));
            });
        }
    }

    // Try finding an exact match by make and model if we don't already have one
    if (!foundExactMatch && identified.make && identified.model && filteredSimilarCars.length > 0) {
      const exactMatch = filteredSimilarCars.find(car => 
        car.make.toLowerCase() === identified.make.toLowerCase() && 
        car.model.toLowerCase() === identified.model.toLowerCase()
      );
      
      if (exactMatch) {
        setExactMatchCar(exactMatch);
        // Remove the exact match from similar cars
        filteredSimilarCars = filteredSimilarCars.filter(car => car.id !== exactMatch.id);
      }
    }

    // Limit to a reasonable number, e.g., 6 similar cars
    setSimilarCars(filteredSimilarCars.slice(0, 6));
    setIsLoading(false);

  }, [identified]);

  const identifiedCriteria = [
    identified.make && `Make: ${identified.make}`,
    identified.model && `Model: ${identified.model}`,
    identified.year && `Year: ${identified.year}`,
    identified.color && `Color: ${identified.color}`,
    identified.q && `Keywords: "${identified.q}"`,
  ].filter(Boolean).join(', ');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8">
          {/* Outer spinning circle */}
          <div className="animate-spin rounded-full h-full w-full border-t-4 border-b-4 border-primary absolute"></div>
          {/* Inner static icon */}
          <div className="flex items-center justify-center h-full w-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-12 w-12 sm:h-16 sm:w-16 text-primary animate-pulse"
            >
              <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
              <path d="M9 9a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v7H9V9z"></path>
              <path d="M12 16v3"></path>
              <path d="M15 6.7V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2.7"></path>
              <circle cx="12" cy="10" r="4"></circle>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-foreground">Scanning for your perfect car...</h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">Please wait while our AI analyzes your request.</p>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Cancel Scan
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <Button variant="outline" asChild className="mb-4 sm:mb-6">
        <Link href="/"> {/* Link back to the homepage or a dedicated browse page */}
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
        </Link>
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">AI Scan Search Results</h1>
      {identifiedCriteria && (
        <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm">
          <Info className="inline-block mr-1 h-4 w-4 align-text-bottom" />
          Showing results based on AI identification: {identifiedCriteria}.
        </p>
      )}

      {exactMatchCar && (
        <section className="mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-primary">Exact Match Found</h2>
          <div className="w-full max-w-sm mx-auto sm:mx-0"> {/* Constrain width for single card */}
            <CarCard car={exactMatchCar} />
          </div>
          <Separator className="my-6 sm:my-8" />
        </section>
      )}

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">
          {exactMatchCar ? "Other Similar Cars" : "Similar Cars Found"}
        </h2>
        {similarCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {similarCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-10 bg-card border rounded-lg shadow-sm">
            <SearchX className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg text-muted-foreground">
              {exactMatchCar ? "No other similar cars found based on these criteria." : "Sorry, we couldn't find any cars matching the AI's identification in our inventory."}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">Try another AI scan or browse our full collection.</p>
          </div>
        )}
      </section>

      {/* Fallback message if NO cars are found (neither exact nor similar) */}
      {!exactMatchCar && similarCars.length === 0 && (
         <div className="mt-6 sm:mt-10 text-center py-8 sm:py-10 bg-card border rounded-lg shadow-sm">
            <SearchX className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">No Results Found</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-prose mx-auto">
                The AI scan criteria ({identifiedCriteria || "based on the provided image"}) did not match any cars in our current inventory.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" /> Explore All Cars
              </Link>
            </Button>
        </div>
      )}
    </div>
  );
}