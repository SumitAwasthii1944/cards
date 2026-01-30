import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const EventCard = ({ id, title, subtitle, imgTop, imgBottom, character, containerRef }) => {
  const cardRef = useRef(null);

  // CHANGE: Swapped scrollXProgress for scrollYProgress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    // Tracks the card from entering the bottom to exiting the top
    offset: ["start end", "center center", "end start"]
  });

  /** * SYMMETRY FIX (Vertical): 
   * 0.0 (Bottom of screen) -> Scale 0.7
   * 0.5 (Dead Center)     -> Scale 1.0
   * 1.0 (Top of screen)    -> Scale 0.7
   **/
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      // CHANGE: Changed px-4 to py-10 for vertical spacing between cards
      className="shrink-0 snap-center py-10" 
    >
      <Link 
        to={`/event/${id}`} 
        // CHANGE: Width remains fixed, but relative to vertical viewport
        className="relative block group w-56 md:w-96 focus:outline-none"
      >
        
        {/* Crosshair Borders - Solidified to black/90 for visibility */}
        <div className="absolute -inset-x-4 top-0 bottom-0 border-t border-b border-gray-600/90 pointer-events-none z-50" />
        <div className="absolute -inset-y-4 left-0 right-0 border-l border-r border-gray-600/90 pointer-events-none z-50" />

        <div className="relative w-full h-full p-px"> 
          <div className="relative aspect-3/4 bg-neutral-900 overflow-hidden shadow-2xl w-full border border-black/10">
            
            {/* CONTENT WRAPPER */}
            <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105 transform-gpu will-change-transform">
              
              <div className="absolute top-0 w-full h-1/2 overflow-hidden">
                <img 
                  src={imgTop} 
                  className="w-full h-full object-cover antialiased" 
                  alt="" 
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-7xl sm:text-8xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-4">
                  {character}
                </div>
              </div>

              <div className="absolute bottom-0 w-full h-1/2 z-20 overflow-hidden">
                <img 
                  src={imgBottom} 
                  className="w-full h-full object-cover antialiased" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>
            </div>

            {/* TEXT OVERLAY */}
            <div className="absolute inset-x-0 bottom-10 z-30 flex flex-col items-center text-center px-4 pointer-events-none">
              <h2 className="text-[#f3cf7a] text-[10px] sm:text-xs font-serif tracking-[0.4em] uppercase mb-1">Attack on</h2>
              <h1 className="text-[#f3cf7a] text-4xl sm:text-5xl font-serif font-black tracking-tight uppercase leading-none drop-shadow-2xl">{title}</h1>
              <div className="flex items-center gap-3 mt-4 w-full px-6">
                <div className="h-px flex-1 bg-[#f3cf7a]/40" />
                <span className="text-[#f3cf7a] text-[9px] uppercase tracking-[0.4em] font-bold">{subtitle}</span>
                <div className="h-px flex-1 bg-[#f3cf7a]/40" />
              </div>
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;