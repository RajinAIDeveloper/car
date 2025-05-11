export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  description: string;
  imageUrls: string[]; // Changed from imageUrl to imageUrls
  features: string[];
  averageRating: number;
  reviewsCount: number;
  reviews?: Review[];
  dataAiHint?: string; // For the primary image
}

export interface CartItem extends Car {
  quantity: number;
}

export interface WishlistItem extends Car {}

export interface Review {
  id: string;
  carId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AIRecommendation {
  id: string; // Added id
  make: string;
  model: string;
  year: number;
  price: number;
  features: string[];
  reasoning: string;
  imageUrl: string; // AI Recommendations will keep a single imageUrl for now
}

// Types for AI Car Identification from Image
export interface IdentifiedCarInfo {
  make?: string;
  model?: string;
  year?: string; // Keep as string as it comes from LLM
  color?: string;
  description?: string;
}

export interface IdentifyCarFromImageOutput {
  carInfo: IdentifiedCarInfo;
  matchFound: boolean;
  reasoning: string;
}

export interface Partner {
  id: string;
  name: string;
  designation: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  description: string;
}
