// src/components/cars/AISearchDialog.tsx
"use client";

import type { ChangeEvent } from 'react';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Not directly used, but illustrates alternative
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, UploadCloud, AlertTriangle, CheckCircle, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { identifyCarFromImage, type IdentifyCarFromImageOutput, type IdentifiedCarInfo } from '@/ai/flows/identify-car-from-image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AISearchDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSearchComplete: (identifiedCar: IdentifiedCarInfo | null) => void;
}

export function AISearchDialog({ isOpen, onOpenChange, onSearchComplete }: AISearchDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<IdentifyCarFromImageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when dialog is closed/opened
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsLoading(false);
      setAiResult(null);
      setError(null);
    }
  }, [isOpen]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size exceeds 5MB. Please choose a smaller image.");
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAiResult(null); // Clear previous AI results
      setError(null); // Clear previous errors
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const convertFileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResult(null);

    try {
      const photoDataUri = await convertFileToDataUri(selectedFile);
      const result = await identifyCarFromImage({ photoDataUri });
      setAiResult(result);
      if (!result.matchFound) {
         toast({
            title: "AI Analysis",
            description: result.reasoning || "Could not confidently identify car details.",
            variant: result.carInfo.make || result.carInfo.model ? "default" : "destructive",
         });
      } else {
        toast({
            title: "AI Analysis Complete",
            description: `Identified: ${result.carInfo.make || ''} ${result.carInfo.model || ''}`.trim(),
        });
      }
    } catch (err) {
      console.error("AI Image Analysis Error:", err);
      setError("Failed to analyze image. Please try again.");
      toast({
        title: "AI Error",
        description: "An error occurred during image analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUseThisCar = () => {
    if (aiResult) {
      // Build query params with individual fields instead of passing the entire object
      const params = new URLSearchParams();
      
      // Add the identified car information
      if (aiResult.carInfo.make) params.append('make', aiResult.carInfo.make);
      if (aiResult.carInfo.model) params.append('model', aiResult.carInfo.model);
      if (aiResult.carInfo.year) params.append('year', aiResult.carInfo.year);
      if (aiResult.carInfo.color) params.append('color', aiResult.carInfo.color);
      
      // Add description as general query if available and no specific make/model found
      if (aiResult.carInfo.description && (!aiResult.carInfo.make && !aiResult.carInfo.model)) {
        params.append('q', aiResult.carInfo.description);
      }
      
      // Navigate to search results page with the parameters
      router.push(`/search-results?${params.toString()}`);
      
      // Also call the callback to notify parent components
      onSearchComplete(aiResult.carInfo);
    } else {
      onSearchComplete(null); // Should not happen if button is enabled correctly
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="mb-2 sm:mb-4">
          <DialogTitle className="flex items-center text-lg sm:text-xl">
            <Wand2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            AI Car Image Scan
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Upload an image of a car, and our AI will try to identify its make and model for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-start w-full gap-1.5">
            <Label htmlFor="car-image-upload" className="text-sm sm:text-base">Upload Car Image</Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto gap-2 sm:space-x-2">
                <Button variant="outline" onClick={handleUploadClick} disabled={isLoading} className="w-full sm:w-auto">
                    <UploadCloud className="mr-2 h-4 w-4" /> Choose Image
                </Button>
                <input
                    id="car-image-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    disabled={isLoading}
                />
                {selectedFile && (
                  <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-full sm:max-w-[200px]">
                    {selectedFile.name}
                  </span>
                )}
            </div>
          </div>

          {previewUrl && (
            <div className="mt-2 sm:mt-4 border rounded-md p-1 sm:p-2 aspect-video relative w-full h-[180px] sm:h-[240px] md:max-h-[300px] overflow-hidden">
              <Image src={previewUrl} alt="Selected car preview" fill className="object-contain" data-ai-hint="car userupload" />
            </div>
          )}

          {selectedFile && !aiResult && !isLoading && (
            <Button onClick={handleAnalyzeImage} className="w-full mt-2" disabled={isLoading}>
              <Wand2 className="mr-2 h-4 w-4" /> Analyze Image
            </Button>
          )}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-2 py-2 sm:py-4">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
              <p className="text-sm sm:text-base text-muted-foreground">AI is analyzing the image...</p>
            </div>
          )}

          {aiResult && !isLoading && (
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-base sm:text-lg">AI Analysis Results:</h4>
              {aiResult.matchFound ? (
                <Alert variant="default" className="bg-green-50 border-green-200 text-sm">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <AlertTitle className="text-green-700">Car Identified!</AlertTitle>
                  <AlertDescription className="text-green-700 space-y-1 mt-1">
                    {aiResult.carInfo.make && <p><strong>Make:</strong> {aiResult.carInfo.make}</p>}
                    {aiResult.carInfo.model && <p><strong>Model:</strong> {aiResult.carInfo.model}</p>}
                    {aiResult.carInfo.year && <p><strong>Year:</strong> {aiResult.carInfo.year}</p>}
                    {aiResult.carInfo.color && <p><strong>Color:</strong> {aiResult.carInfo.color}</p>}
                    {aiResult.carInfo.description && (
                      <p className="break-words"><strong>Notes:</strong> {aiResult.carInfo.description}</p>
                    )}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" className="text-sm">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <AlertTitle>Identification Unclear</AlertTitle>
                  <AlertDescription className="mt-1">
                    <p>{aiResult.reasoning || "The AI could not confidently identify the car's make and model."}</p>
                    {aiResult.carInfo.description && (
                      <p className="mt-1 break-words"><strong>AI Saw:</strong> {aiResult.carInfo.description}</p>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isLoading}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUseThisCar} 
            disabled={isLoading || !aiResult || (!aiResult.carInfo.make && !aiResult.carInfo.model && !aiResult.carInfo.description)}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Use these Details for Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}