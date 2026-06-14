"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full absolute top-0 z-50 py-6 px-8 flex items-center justify-between"
    >
      <Link href="/" className="text-2xl font-bold text-primary-500 font-heading flex items-center gap-2">
        <Image src="/logo.png" alt="Lumina AI Logo" width={32} height={32} className="rounded-lg shadow-sm shadow-primary-500/20" />
        Lumina AI
      </Link>
      
      <div className="flex items-center gap-8">
        <Link 
          href="/" 
          className={cn(
            "text-sm font-semibold transition-colors relative pb-1", 
            pathname === '/' ? "text-primary-500" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          )}
        >
          Humanizer
          {pathname === '/' && (
            <motion.div 
              layoutId="nav-indicator" 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" 
            />
          )}
        </Link>
        <Link 
          href="/settings" 
          className={cn(
            "text-sm font-semibold transition-colors relative pb-1", 
            pathname === '/settings' ? "text-primary-500" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          )}
        >
          Settings
          {pathname === '/settings' && (
            <motion.div 
              layoutId="nav-indicator" 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" 
            />
          )}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
}
