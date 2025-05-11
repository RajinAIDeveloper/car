// src/components/reviews/StarRating.tsx
"use client";

import { Star, StarHalf } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

export function StarRating({
  rating,
  size = 20,
  color = "hsl(var(--primary))", // Use Tailwind's primary color
  onRatingChange,
  readOnly = true,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const StarIcon = (props: LucideProps) => <Star {...props} />;
  const StarHalfIcon = (props: LucideProps) => <StarHalf {...props} />;

  const handleClick = (index: number) => {
    if (onRatingChange && !readOnly) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon
          key={`full-${i}`}
          size={size}
          fill={color}
          stroke={color}
          className={!readOnly ? "cursor-pointer" : ""}
          onClick={() => handleClick(i)}
          aria-hidden="true"
        />
      ))}
      {halfStar && (
        <StarHalfIcon
          key="half"
          size={size}
          fill={color}
          stroke={color}
          className={!readOnly ? "cursor-pointer" : ""}
          onClick={() => handleClick(fullStars)}
          aria-hidden="true"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          size={size}
          stroke={color}
          fill="transparent"
          className={!readOnly ? "cursor-pointer" : ""}
          onClick={() => handleClick(fullStars + (halfStar ? 1 : 0) + i)}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
