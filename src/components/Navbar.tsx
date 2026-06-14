"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full absolute top-0 z-50 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary-500 font-heading flex items-center gap-2">
          <Image src="/logo.png" alt="Lumina AI Logo" width={32} height={32} className="rounded-lg shadow-sm shadow-primary-500/20" />
          Lumina AI
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Right side: Theme toggle + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-50 md:hidden bg-white/80 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-lg shadow-primary-500/10 p-4 flex flex-col gap-2"
          >
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                pathname === '/' ? "bg-primary-500/10 text-primary-500" : "text-neutral-600 dark:text-neutral-300 hover:bg-white/50 dark:hover:bg-white/5"
              )}
            >
              Humanizer
            </Link>
            <Link 
              href="/settings" 
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                pathname === '/settings' ? "bg-primary-500/10 text-primary-500" : "text-neutral-600 dark:text-neutral-300 hover:bg-white/50 dark:hover:bg-white/5"
              )}
            >
              Settings
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
