// src/contexts/AuthContext.tsx
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { auth, googleAuthProvider } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'; // Using App Router's useRouter

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean; 
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAdminUids = (): string[] => {
  const adminUidsEnv = process.env.NEXT_PUBLIC_ADMIN_UIDS;
  if (adminUidsEnv) {
    return adminUidsEnv.split(',').map(uid => uid.trim()).filter(uid => uid);
  }
  return [];
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [adminUids, setAdminUids] = useState<string[]>([]);

  useEffect(() => {
    setAdminUids(getAdminUids());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && adminUids.length > 0) {
        setIsAdmin(adminUids.includes(currentUser.uid));
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [adminUids]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast({ title: "Signed In", description: "Successfully signed in with Google." });
      // The redirect logic will be handled by useEffect if the user becomes an admin
      // or by the page they were trying to access (e.g., /admin)
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast({
        title: "Sign-In Failed",
        description: error.message || "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/'); // Redirect to home after logout
    } catch (error: any) {
      console.error("Sign-Out Error:", error);
      toast({
        title: "Sign-Out Failed",
        description: error.message || "Could not sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
