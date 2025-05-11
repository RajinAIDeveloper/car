// src/components/reviews/ReviewList.tsx
import type { Review } from '@/types';
import { StarRating } from './StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet for this car.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border rounded-lg bg-card shadow-sm">
          <div className="flex items-start space-x-3">
            <Avatar>
              {/* Placeholder for user image, if available */}
              <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">{review.userName}</h4>
                <StarRating rating={review.rating} size={16} readOnly />
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </p>
              <p className="text-sm text-foreground whitespace-pre-wrap">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
