// src/components/reviews/ReviewForm.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StarRating } from './StarRating';
import type { Review } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';


interface ReviewFormProps {
  carId: string;
  onSubmitReview: (review: Review) => Promise<void> | void; // Make it potentially async
}

export function ReviewForm({ carId, onSubmitReview }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast({ title: "Name Required", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Rating Required", description: "Please select a star rating.", variant: "destructive" });
      return;
    }
    if (!comment.trim()) {
      toast({ title: "Comment Required", description: "Please write a comment.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const newReview: Review = {
      id: new Date().toISOString(), // Simple unique ID for now
      carId,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      await onSubmitReview(newReview); // This might be async if it calls an API
      toast({ title: "Review Submitted", description: "Thank you for your feedback!" });
      setRating(0);
      setComment('');
      setUserName('');
    } catch (error) {
      toast({ title: "Submission Failed", description: "Could not submit review. Please try again.", variant: "destructive" });
      console.error("Review submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-card shadow-md">
      <h3 className="text-xl font-semibold text-foreground">Leave a Review</h3>
      <div>
        <Label htmlFor="userName" className="mb-1 block">Your Name</Label>
        <Input
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="e.g., John Doe"
          maxLength={50}
          required
        />
      </div>
      <div>
        <Label className="mb-1 block">Your Rating</Label>
        <StarRating rating={rating} onRatingChange={setRating} size={24} readOnly={false} />
      </div>
      <div>
        <Label htmlFor="comment" className="mb-1 block">Your Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience..."
          rows={4}
          maxLength={500}
          required
        />
         <p className="text-xs text-muted-foreground mt-1">{comment.length}/500</p>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Review
      </Button>
    </form>
  );
}
