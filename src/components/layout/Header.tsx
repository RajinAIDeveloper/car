// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, Home, UserCircle, LogIn, LogOut, ShieldCheck, Sun, Moon, Mail, Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { Logo } from '@/components/icons/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItemVariants = {
  hover: { scale: 1.1, color: "hsl(var(--primary))" },
  tap: { scale: 0.95 }
};

const logoVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05 }
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null during server-side rendering and initial client-side mount
    return <Skeleton className="h-8 w-8 rounded-md" />;
  }

  return (
    <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
      </Button>
    </motion.div>
  );
}


export function Header() {
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const { user, isAdmin, signOut, loading: authLoading } = useAuth(); // Get auth state and functions
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const cartItemCount = getCartItemCount();
  const wishlistItemCount = getWishlistItemCount();

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center">
        {/* Mobile Menu Button - MOVED HERE */}
        <div className="md:hidden mr-2"> {/* Added mr-2 for spacing */}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <XIcon className="h-6 w-6 text-foreground" /> : <MenuIcon className="h-6 w-6 text-foreground" />}
          </Button>
        </div>
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Link href="/" className="text-2xl font-bold text-primary" aria-label="DriveDeals Home">
            <Logo />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 ml-auto"> {/* Added ml-auto */}
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" aria-label="Home">
                <Home className="h-5 w-5 sm:mr-1 text-foreground" />
                <span className="hidden sm:inline text-foreground">Home</span>
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/about" aria-label="About Us">
                {/* You might want to use a more appropriate icon for "About Us" */}
                <UserCircle className="h-5 w-5 sm:mr-1 text-foreground" />
                <span className="hidden sm:inline text-foreground">About Us</span>
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact" aria-label="Contact Us">
                <Mail className="h-5 w-5 sm:mr-1 text-foreground" />
                <span className="hidden sm:inline text-foreground">Contact Us</span>
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap" className="relative">
            <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
              <Link href="/wishlist">
                <Heart className="h-5 w-5 text-foreground" />
                {wishlistItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {wishlistItemCount}
                  </motion.span>
                )}
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap" className="relative">
            <Button variant="ghost" size="icon" asChild aria-label="Shopping Cart">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {cartItemCount > 0 && (
                   <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            </Button>
          </motion.div>

          {authLoading ? (
             <Skeleton className="h-8 w-20 rounded-md" />
          ) : user ? (
            <>
              {isAdmin && (
                 <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin" aria-label="Admin Panel">
                      <ShieldCheck className="h-5 w-5 sm:mr-1 text-foreground" />
                      <span className="hidden sm:inline">Admin</span>
                    </Link>
                  </Button>
                </motion.div>
              )}
               <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Button variant="ghost" size="sm" onClick={signOut} aria-label="Sign Out">
                  <LogOut className="h-5 w-5 sm:mr-1 text-foreground" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </motion.div>
            </>
          ) : (
             <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
              <Button variant="ghost" size="sm" asChild aria-label="Sign In">
                <Link href="/auth/signin">
                  <LogIn className="h-5 w-5 sm:mr-1 text-foreground" />
                  <span className="hidden sm:inline text-foreground">Login</span>
                </Link>
              </Button>
            </motion.div>
          )}
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-card shadow-lg py-2 px-4 z-40 flex flex-col space-y-2"
          onClick={() => setIsMobileMenuOpen(false)} // Close menu on item click
        >
          <Button variant="ghost" size="sm" asChild className="w-full justify-start">
            <Link href="/" aria-label="Home">
              <Home className="h-5 w-5 mr-2 text-foreground" />
              <span className="text-foreground">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full justify-start">
            <Link href="/about" aria-label="About Us">
              <UserCircle className="h-5 w-5 mr-2 text-foreground" />
              <span className="text-foreground">About Us</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full justify-start">
            <Link href="/contact" aria-label="Contact Us">
              <Mail className="h-5 w-5 mr-2 text-foreground" />
              <span className="text-foreground">Contact Us</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full justify-start relative">
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="h-5 w-5 mr-2 text-foreground" />
              <span className="text-foreground">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="w-full justify-start relative">
            <Link href="/cart" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5 mr-2 text-foreground" />
              <span className="text-foreground">Cart</span>
              {cartItemCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>
          {authLoading ? (
            <Skeleton className="h-8 w-full rounded-md" />
          ) : user ? (
            <>
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                  <Link href="/admin" aria-label="Admin Panel">
                    <ShieldCheck className="h-5 w-5 mr-2 text-foreground" />
                    <span className="text-foreground">Admin</span>
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={signOut} aria-label="Sign Out" className="w-full justify-start">
                <LogOut className="h-5 w-5 mr-2 text-foreground" />
                <span className="text-foreground">Logout</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild className="w-full justify-start">
              <Link href="/auth/signin" aria-label="Sign In">
                <LogIn className="h-5 w-5 mr-2 text-foreground" />
                <span className="text-foreground">Login</span>
              </Link>
            </Button>
          )}
          <div className="pt-2 border-t border-border">
             <ThemeToggle />
          </div>
        </motion.nav>
      )}
    </header>
  );
}
