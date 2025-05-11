// src/app/admin/layout.tsx
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/auth/signin?redirect=/admin');
      } else if (!isAdmin) {
        router.replace('/?error=unauthorized'); // Or a dedicated unauthorized page
      }
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Admin Area...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback or if redirect is slow:
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
        <h1 className="text-2xl font-semibold text-destructive mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          { !user ? "You need to be signed in to access this page." : "You do not have permission to access the admin area."}
        </p>
        { !user && (
          <Button asChild>
            <Link href="/auth/signin?redirect=/admin">Sign In</Link>
          </Button>
        )}
         { user && !isAdmin && (
          <Button asChild variant="outline">
            <Link href="/">Go to Homepage</Link>
          </Button>
        )}
      </div>
    );
  }

  // User is authenticated and is an admin
  return (
    <div className="flex flex-col min-h-screen">
      {/* Minimal Admin Layout for now, can be expanded with sidebar, etc. */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
