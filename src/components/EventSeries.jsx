import React, { useRef, useEffect } from 'react';
import EventCard from './card';
import bgImg from '../assets/bg-img.jpeg';

export const EVENTS_DATA = [
  { id: "1", title: "TITAN", subtitle: "OAD Archive", imgTop: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600", character: "👦" },
  { id: "2", title: "WALL", subtitle: "Survey Corps", imgTop: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600", character: "🛡️" },
  { id: "3", title: "AMERICA", subtitle: "Survey Corps", imgTop: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600", character: "🏙️" },
  { id: "4", title: "HUMAN", subtitle: "Survey Corps", imgTop: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600", character: "🏙️" },
];

const EventSeries = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const cards = container.querySelectorAll('.snap-center');
        if (cards.length > 0) {
          const firstCard = cards[0];
          // CHANGE: Math updated to find the VERTICAL center
          const scrollTop = firstCard.offsetTop - (container.offsetHeight / 2) + (firstCard.offsetHeight / 2);
          container.scrollTo({ top: scrollTop, behavior: 'auto' });
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    // CHANGE: Added h-screen and justify-center for vertical alignment
    <div className="h-screen bg-black flex items-center justify-center overflow-hidden"
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Optional: keeps bg still while cards scroll
      }}>
        <div className='font-serif text-white text-xl lg:text-5xl tracking-widest ml-2'>Events</div>
      <div 
        ref={containerRef}
        /* CHANGE LOG:
           - flex-col: Stacks cards vertically.
           - overflow-y-auto: Enables vertical scrolling.
           - snap-y: Locks snap points to the Y-axis.
        */
        className="relative flex flex-col items-center h-full overflow-y-auto snap-y snap-mandatory no-scrollbar w-full scroll-smooth"
      >
        {/* START SPACER: Changed w-[50vw] to h-[50vh] */}
        <div className="shrink-0 h-[50vh] w-1" />

        {EVENTS_DATA.map((event) => (
          <EventCard key={event.id} {...event} containerRef={containerRef} />
        ))}

        {/* END SPACER: Changed w-[50vw] to h-[50vh] */}
        <div className="shrink-0 h-[50vh] w-1" />
      </div>
    </div>
  );
};

export default EventSeries;