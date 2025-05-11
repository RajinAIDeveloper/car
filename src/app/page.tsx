// src/app/page.tsx
"use client";

import { CarCard } from '@/components/cars/CarCard';
import { cars as allCarsData } from '@/data/cars'; // Mock data for now
import type { Car } from '@/types';
import { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ScanLine, XCircle } from 'lucide-react';
import { AISearchDialog } from '@/components/cars/AISearchDialog';
import type { IdentifiedCarInfo } from '@/ai/flows/identify-car-from-image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Adjust stagger delay as needed
      delayChildren: 0.1,
    },
  },
};

// CarCard will use its own variants, this is just for the container

export default function HomePage() {
  const [availableCars, setAvailableCars] = useState<Car[]>(allCarsData); // In a real app, this would be fetched
  const [searchTerm, setSearchTerm] = useState('');
  const [isAISearchDialogOpen, setIsAISearchDialogOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleAISearchComplete = useCallback((identifiedCar: IdentifiedCarInfo | null) => {
    setIsAISearchDialogOpen(false); 

    if (identifiedCar) {
      const queryParams = new URLSearchParams();
      let performRedirect = false;

      if (identifiedCar.make) queryParams.set('make', identifiedCar.make);
      if (identifiedCar.model) queryParams.set('model', identifiedCar.model);
      if (identifiedCar.year) queryParams.set('year', identifiedCar.year);
      if (identifiedCar.color) queryParams.set('color', identifiedCar.color);
      
      if (identifiedCar.description && !identifiedCar.make && !identifiedCar.model) {
        queryParams.set('q', identifiedCar.description);
      }

      if (identifiedCar.make && identifiedCar.model) {
        const exactMatch = allCarsData.find(
          (dbCar) =>
            dbCar.make.toLowerCase() === identifiedCar.make!.toLowerCase() &&
            dbCar.model.toLowerCase() === identifiedCar.model!.toLowerCase() &&
            (identifiedCar.year ? dbCar.year.toString() === identifiedCar.year : true)
        );
        if (exactMatch) {
          queryParams.set('exactMatchId', exactMatch.id);
        }
        performRedirect = true;
      } else if (queryParams.toString()) { 
        performRedirect = true;
      }
      
      if (performRedirect && queryParams.toString()) {
        router.push(`/search-results?${queryParams.toString()}`);
      } else {
        let aiSearchKeywords = '';
        if (identifiedCar.make) aiSearchKeywords += `${identifiedCar.make} `;
        if (identifiedCar.model) aiSearchKeywords += `${identifiedCar.model} `;
        if (identifiedCar.year) aiSearchKeywords += `${identifiedCar.year} `;
        if (identifiedCar.color) aiSearchKeywords += `${identifiedCar.color} `;
        if (identifiedCar.description && !aiSearchKeywords) aiSearchKeywords = identifiedCar.description;
        
        setSearchTerm(aiSearchKeywords.trim());
      }
    }
  }, [router, setSearchTerm]);

  const filteredCars = useMemo(() => {
    if (!searchTerm.trim()) {
      return availableCars;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return availableCars.filter((car) => {
      const carMake = car.make.toLowerCase();
      const carModel = car.model.toLowerCase();
      const carYear = car.year.toString();
      
      return (
        carMake.includes(lowercasedSearchTerm) ||
        carModel.includes(lowercasedSearchTerm) ||
        carYear.includes(lowercasedSearchTerm) ||
        `${carMake} ${carModel}`.includes(lowercasedSearchTerm) ||
        `${carMake} ${carModel} ${carYear}`.includes(lowercasedSearchTerm) ||
        `${car.make} ${car.model}`.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
  }, [availableCars, searchTerm]);

  return (
    <div>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center text-foreground"
      >
        Explore Our Collection
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 max-w-2xl mx-auto flex items-center space-x-2"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by make, model, or year..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-10 py-2 text-base"
            aria-label="Search cars"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <XCircle className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsAISearchDialogOpen(true)}
          aria-label="Search with AI image scan"
          className="shrink-0"
        >
          <ScanLine className="mr-2 h-5 w-5" />
          AI Scan
        </Button>
      </motion.div>

      {filteredCars.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground py-10"
        >
          {searchTerm ? `No cars found matching "${searchTerm}". Try broadening your search or use AI Scan.` : "No cars available at the moment. Please check back later."}
        </motion.p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCars.map((car, index) => (
            // CarCard now has its own `motion.div` with `variants={cardVariants}`
            // The `initial` and `animate` props will be inherited from this parent `motion.div`
            // and controlled by `staggerChildren`.
            <CarCard key={car.id} car={car} priorityImage={index === 0 && !searchTerm.trim()} />
          ))}
        </motion.div>
      )}
      <AISearchDialog
        isOpen={isAISearchDialogOpen} 
        onOpenChange={setIsAISearchDialogOpen}
        onSearchComplete={handleAISearchComplete} 
      />
    </div>
  );
}
