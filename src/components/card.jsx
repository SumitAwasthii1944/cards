import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';


const EventCard = ({ id, title, subtitle, imgTop, imgBottom, character, containerRef }) => {
  const cardRef = useRef(null);

  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    // This offset tracks the card from entering the right to exiting the left
    offset: ["start end", "center center", "end start"]
  });

  /** * SYMMETRY FIX: 
   * 0.0 (Entering Right) -> Scale 0.7
   * 0.5 (Center)         -> Scale 1.0 (Full Size)
   * 1.0 (Exiting Left)   -> Scale 0.7
   **/
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  
  // Apply the same symmetry to opacity so edges look uniform
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="shrink-0 snap-center px-4"
    >
      <Link 
        to={`/event/${id}`} 
        className="relative block group w-55 p-2 md:w-85 focus:outline-none"
      >
        {/* Crosshair Borders */}
        <div className="absolute -inset-x-4 top-0 bottom-0 border-t border-b border-gray-600/80 pointer-events-none z-50" />
        <div className="absolute -inset-y-4 left-0 right-0 border-l border-r border-gray-600/80 pointer-events-none z-50" />

        <div className="relative w-full h-full p-px"> 
          <div className="relative aspect-3/4 bg-neutral-900 overflow-hidden shadow-2xl w-full border border-black/10">
            
            {/* CONTENT WRAPPER - GPU accelerated for sharpness */}
            <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105 transform-gpu will-change-transform">
              
              {/* TOP IMAGE - Full Color/Clarity */}
              <div className="absolute top-0 w-full h-1/2 overflow-hidden">
                <img 
                  src={imgTop} 
                  className="w-full h-full object-cover antialiased" 
                  alt="" 
                />
              </div>

              {/* CHARACTER ICON */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-7xl sm:text-8xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-4">
                  {character}
                </div>
              </div>

              {/* BOTTOM IMAGE - Full Color/Clarity */}
              <div className="absolute bottom-0 w-full h-1/2 z-20 overflow-hidden">
                <img 
                  src={imgBottom} 
                  className="w-full h-full object-cover antialiased" 
                  alt="" 
                />
                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
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