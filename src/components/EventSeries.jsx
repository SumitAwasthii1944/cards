import React, { useRef, useEffect } from 'react';
import EventCard from './card';
import bgImg from '../assets/bg-img.jpeg'

export const EVENTS_DATA = [
  { id: "1", title: "TITAN", subtitle: "OAD Archive", imgTop: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600", character: "👦" },
  { id: "2", title: "WALL", subtitle: "Survey Corps", imgTop: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600", character: "🛡️" },
  { id: "3", title: "AMERICA", subtitle: "Survey Corps", imgTop: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600", character: "🏙️" },
  { id: "4", title: "HUMAN", subtitle: "Survey Corps", imgTop: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=600", imgBottom: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600", character: "🏙️" },
];

const EventSeries = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // We use a small timeout to ensure the DOM has fully painted
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const cards = container.querySelectorAll('.snap-center');
        if (cards.length > 0) {
          const firstCard = cards[0];
          // math to find the center of the screen
          const scrollLeft = firstCard.offsetLeft - (container.offsetWidth / 2) + (firstCard.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'auto' });
        }
      }
    }, 50); // 50ms is enough to let React finish rendering
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center overflow-hidden"
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Optional: keeps bg still while cards scroll
      }}>
        <div className='font-serif text-white text-2xl lg:text-4xl tracking-widest m-2'>EVENTS</div>
      <div 
        ref={containerRef}
        /* - px-[10vw]: Minimal padding so we don't conflict with spacers.
           - snap-mandatory: Forces the browser to lock onto a card center.
        */
        className="relative flex flex-nowrap items-center py-20 overflow-x-auto snap-x snap-mandatory no-scrollbar w-full scroll-smooth"
      >
        {/* START SPACER: This allows the first card to sit in the center */}
        <div className="shrink-0 w-[50vw] h-1" />

        {EVENTS_DATA.map((event) => (
          <EventCard key={event.id} {...event} containerRef={containerRef} />
        ))}

        {/* END SPACER: This allows the last card to sit in the center and bounce */}
        <div className="shrink-0 w-[50vw] h-1" />
      </div>
    </div>
  );
};

export default EventSeries;