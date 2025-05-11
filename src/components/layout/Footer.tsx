"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Sun, Moon, Home as HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const navItemVariants = {
  hover: { scale: 1.05, color: "hsl(var(--primary))" },
  tap: { scale: 0.95 }
};

const iconVariants = {
  hover: { scale: 1.1, color: "hsl(var(--primary))" },
  tap: { scale: 0.9 }
};

const logoVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05 }
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-8 w-8 rounded-md bg-muted" />;
  }

  return (
    <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="text-muted-foreground hover:text-primary"
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </motion.div>
  );
}

function SimpleBreadcrumb() {
  // This is a placeholder. In a real app, derive this from the router.
  // For example, using usePathname from next/navigation
  return (
    <nav aria-label="breadcrumb" className="text-sm text-muted-foreground hidden sm:flex items-center">
      <ol className="flex items-center space-x-1">
        <li>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
              <HomeIcon className="h-4 w-4 mr-1" /> Home
            </Link>
          </motion.div>
        </li>
        {/* Example for a dynamic segment:
        <li><span className="mx-1 text-muted-foreground">/</span></li>
        <li><span className="text-foreground">Current Page</span></li>
        */}
      </ol>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-card text-foreground border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Mobile-specific bar: Logo left, ThemeToggle + Breadcrumb right */}
        <div className="md:hidden flex justify-between items-center mb-6 pb-4 border-b border-border">
          <motion.div variants={logoVariants} initial="initial" animate="animate" whileHover="hover">
            <Link href="/" aria-label="DriveDeals Home">
              <Logo className="h-7 w-auto text-primary" />
            </Link>
          </motion.div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            <SimpleBreadcrumb />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About DriveDeals */}
          <div>
            <motion.div 
              className="hidden md:block mb-4" 
              variants={logoVariants} 
              initial="initial" 
              animate="animate" 
              whileHover="hover"
            >
               <Link href="/" className="text-2xl font-bold text-primary flex items-center" aria-label="DriveDeals Home">
                 <Logo className="h-9 w-auto" />
                 {/* <span className="ml-2">DriveDeals</span> */}
               </Link>
            </motion.div>
             <h3 className="text-lg font-semibold text-card-foreground mb-4 md:hidden">About DriveDeals</h3>
            <p className="text-sm text-gray-900 dark:text-white">
              Your trusted partner for finding the best deals on new and used cars. We are committed to providing a seamless car buying experience.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><motion.div variants={navItemVariants} whileHover="hover" whileTap="tap"><Link href="/about" className="text-gray-900 dark:text-white hover:text-primary transition-colors">About Us</Link></motion.div></li>
              <li><motion.div variants={navItemVariants} whileHover="hover" whileTap="tap"><Link href="/contact" className="text-gray-900 dark:text-white hover:text-primary transition-colors">Contact Us</Link></motion.div></li>
              <li><motion.div variants={navItemVariants} whileHover="hover" whileTap="tap"><Link href="/faq" className="text-gray-900 dark:text-white hover:text-primary transition-colors">FAQ</Link></motion.div></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><motion.div variants={navItemVariants} whileHover="hover" whileTap="tap"><Link href="/privacy-policy" className="text-gray-900 dark:text-white hover:text-primary transition-colors">Privacy Policy</Link></motion.div></li>
              <li><motion.div variants={navItemVariants} whileHover="hover" whileTap="tap"><Link href="/terms-of-service" className="text-gray-900 dark:text-white hover:text-primary transition-colors">Terms of Service</Link></motion.div></li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <motion.a variants={iconVariants} whileHover="hover" whileTap="tap" href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={22} />
              </motion.a>
              <motion.a variants={iconVariants} whileHover="hover" whileTap="tap" href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={22} />
              </motion.a>
              <motion.a variants={iconVariants} whileHover="hover" whileTap="tap" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={22} />
              </motion.a>
              <motion.a variants={iconVariants} whileHover="hover" whileTap="tap" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={22} />
              </motion.a>
            </div>
            
            <h4 className="text-md font-semibold text-card-foreground mb-2">Newsletter</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-input border border-border text-foreground px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm flex-grow placeholder:text-muted-foreground"
                aria-label="Newsletter email input"
              />
              <Button type="submit" variant="default" size="sm" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DriveDeals. All rights reserved.</p>
          <p className="mt-1">Find your perfect ride with us.</p>
        </div>
      </div>
    </footer>
  );
}
