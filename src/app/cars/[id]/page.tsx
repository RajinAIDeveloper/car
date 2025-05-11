// src/app/cars/[id]/page.tsx
import { getCarById } from '@/data/cars';
import { CarDetailClient } from '@/components/cars/CarDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const car = getCarById(params.id);

  if (!car) {
    return {
      title: 'Car Not Found - DriveDeals',
    }
  }
  
  const primaryImageUrl = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : undefined;

  return {
    title: `${car.make} ${car.model} (${car.year}) - DriveDeals`,
    description: car.description,
    openGraph: {
      title: `${car.make} ${car.model} - DriveDeals`,
      description: car.description,
      images: primaryImageUrl ? [
        {
          url: primaryImageUrl,
          width: 600,
          height: 400,
          alt: `${car.make} ${car.model}`,
        },
      ] : [],
    },
  }
}


export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = getCarById(params.id);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}
