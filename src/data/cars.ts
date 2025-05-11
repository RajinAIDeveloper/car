import type { Car, Review } from '@/types';

const initialReviews: Review[] = [
  { id: 'r1', carId: '1', userName: 'Alice', rating: 5, comment: 'Absolutely love this car! Smooth ride and great features.', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'r2', carId: '1', userName: 'Bob', rating: 4, comment: 'Very reliable and fuel-efficient. Good value for money.', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'r3', carId: '2', userName: 'Charlie', rating: 4, comment: 'Powerful engine and stylish design. A bit pricey though.', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'r4', carId: '3', userName: 'Diana', rating: 5, comment: 'Perfect family SUV. Lots of space and safety features.', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
];

export let cars: Car[] = [ // Changed to let for potential modification by admin actions later
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 104595,
    description: 'A reliable and comfortable mid-size sedan, perfect for families and daily commutes. Known for its fuel efficiency and smooth ride.',
    imageUrls: [
        '/camry.jpeg',
        '/camry2.jpeg',
        '/camry3.jpg',
    ],
    dataAiHint: 'sedan silver',
    features: ['Fuel Efficient', 'Spacious Interior', 'Advanced Safety Features', 'Smooth Ride', 'Apple CarPlay'],
    averageRating: 4.7,
    reviewsCount: 120,
    reviews: initialReviews.filter(r => r.carId === '1'),
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 91750,
    description: 'A compact car that offers a sporty driving experience, excellent fuel economy, and a refined interior.',
    imageUrls: [
        '/civic.jpeg',
    ],
    dataAiHint: 'sedan red',
    features: ['Sporty Handling', 'Fuel Efficient', 'Modern Infotainment', 'Reliable'],
    averageRating: 4.6,
    reviewsCount: 95,
    reviews: initialReviews.filter(r => r.carId === '2'),
  },
  {
    id: '3',
    make: 'Ford',
    model: 'Explorer',
    year: 2024,
    price: 154140,
    description: 'A versatile and spacious SUV with three rows of seating, powerful engine options, and a comfortable ride.',
    imageUrls: ['/explorer.jpeg'],
    dataAiHint: 'suv blue',
    features: ['Three-Row Seating', 'Powerful Engine', 'Ample Cargo Space', 'Towing Capacity'],
    averageRating: 4.4,
    reviewsCount: 75,
    reviews: initialReviews.filter(r => r.carId === '3'),
  },
  {
    id: '4',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 146800,
    description: 'An all-electric sedan with impressive range, cutting-edge technology, and exhilarating performance.',
    imageUrls: [
        '/model3.jpeg',
        
    ],
    dataAiHint: 'electric white',
    features: ['Electric Vehicle', 'Long Range', 'Autopilot Capable', 'Minimalist Interior', 'Large Touchscreen'],
    averageRating: 4.8,
    reviewsCount: 150,
    reviews: [],
  },
  {
    id: '5',
    make: 'BMW',
    model: 'X5',
    year: 2024,
    price: 238550,
    description: 'A luxury mid-size SUV that combines performance, comfort, and advanced technology in a stylish package.',
    imageUrls: ['/bmwx5.jpeg'],
    dataAiHint: 'suv black',
    features: ['Luxury Interior', 'Performance Engine Options', 'Advanced Driver Assists', 'Panoramic Sunroof'],
    averageRating: 4.7,
    reviewsCount: 60,
    reviews: [],
  },
   {
    id: '6',
    make: 'Audi',
    model: 'A4',
    year: 2023,
    price: 157810,
    description: 'A compact luxury sedan offering a refined driving experience, high-quality interior, and advanced technology.',
    imageUrls: ['/audia4.jpg'],
    dataAiHint: 'sedan gray',
    features: ['Quattro All-Wheel Drive', 'Virtual Cockpit', 'Premium Sound System', 'Leather Upholstery'],
    averageRating: 4.5,
    reviewsCount: 88,
    reviews: [],
  },
  {
    id: '7',
    make: 'Jeep',
    model: 'Wrangler',
    year: 2024,
    price: 139460,
    description: 'The iconic off-road SUV, built for adventure with rugged capabilities and open-air freedom.',
    imageUrls: ['/wrangler.jpeg'],
    dataAiHint: 'suv green',
    features: ['Off-Road Prowess', 'Removable Top/Doors', '4x4 System', 'Durable Build'],
    averageRating: 4.3,
    reviewsCount: 110,
    reviews: [],
  },
  {
    id: '8',
    make: 'Subaru',
    model: 'Outback',
    year: 2023,
    price: 117440,
    description: 'A versatile wagon/SUV crossover known for its standard all-wheel drive, safety features, and practicality.',
    imageUrls: ['/outback.webp'],
    dataAiHint: 'wagon brown',
    features: ['Symmetrical AWD', 'EyeSight Driver Assist', 'Spacious Cargo Area', 'Roof Rails'],
    averageRating: 4.6,
    reviewsCount: 92,
    reviews: [],
  }
];

export const getCarById = (id: string): Car | undefined => {
  return cars.find(car => car.id === id);
};

export const addReviewToCar = (carId: string, review: Review): Car | undefined => {
  const carIndex = cars.findIndex(c => c.id === carId);
  if (carIndex !== -1) {
    const car = cars[carIndex];
    const updatedReviews = [...(car.reviews || []), review];
    const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    car.reviews = updatedReviews;
    car.reviewsCount = updatedReviews.length;
    car.averageRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));
    return car;
  }
  return undefined;
};
