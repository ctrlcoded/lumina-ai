"use client";

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative w-full h-[200px] sm:h-[300px] overflow-hidden mt-auto flex items-end justify-center">
      {/* Massive convex purple curved section */}
      <div className="absolute top-0 w-[150%] h-[600px] sm:h-[800px] left-1/2 -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-primary-500 to-primary-300 flex items-start justify-center pt-16 sm:pt-24 shadow-[0_-20px_50px_rgba(124,92,255,0.2)]">
        
        {/* Soft purple glow */}
        <div className="absolute inset-0 bg-primary-400/20 blur-[100px] rounded-[50%]" />

        {/* Particles (subtle) — hidden on small screens for performance */}
        <motion.div 
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-16 left-[30%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" 
        />
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden sm:block absolute top-28 right-[25%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_white]" 
        />
        <motion.div 
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="hidden sm:block absolute top-40 left-[45%] w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" 
        />

        <h2 className="relative z-10 text-white text-4xl sm:text-7xl md:text-9xl font-bold font-heading tracking-tighter mt-6 sm:mt-12">
          Lumina AI
        </h2>
      </div>
    </footer>
  );
}
