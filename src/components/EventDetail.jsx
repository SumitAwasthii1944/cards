import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { EVENTS_DATA } from './EventSeries'; // Import your data

const EventDetail = () => {
  const { id } = useParams();
  
  // Find the event that matches the ID in the URL
  const event = EVENTS_DATA.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-[#f3cf7a]">
        <h1 className="text-2xl font-serif">ARCHIVE NOT FOUND</h1>
        <Link to="/" className="mt-4 underline">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f3cf7a] font-serif">
      {/* Header / Navigation */}
      <nav className="p-6 border-b border-[#f3cf7a]/20 flex justify-between items-center">
        <Link to="/" className="text-sm tracking-widest hover:opacity-70 transition-opacity">
          ← BACK TO ARCHIVE
        </Link>
        <span className="text-xs opacity-50 uppercase tracking-[0.5em]">Classified Document</span>
      </nav>

      <main className="max-w-6xl mx-auto p-8 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Visual Hero */}
        <div className="relative group justify-self-center lg:justify-self-start">
          {/* We reuse the crosshair style here to keep the theme */}
          <div className="absolute -inset-4 border border-[#f3cf7a]/30 pointer-events-none" />
          <div className="relative w-72 sm:w-96 aspect-3/4 overflow-hidden shadow-2xl border border-[#f3cf7a]/20">
            <img src={event.imgTop} className="absolute top-0 w-full h-1/2 object-cover opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center z-10 text-9xl">
              {event.character}
            </div>
            <img src={event.imgBottom} className="absolute bottom-0 w-full h-1/2 object-cover brightness-50" />
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="flex flex-col space-y-6">
          <header>
            <h2 className="text-xl tracking-[0.4em] uppercase opacity-70">Attack on</h2>
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-none mb-4">
              {event.title}
            </h1>
            <div className="h-1 w-24 bg-[#f3cf7a]" />
          </header>

          <section className="space-y-4 max-w-lg">
            <p className="text-lg leading-relaxed text-gray-300 italic">
              {event.subtitle}
            </p>
            <p className="text-gray-400 font-sans leading-relaxed">
              {event.description}
            </p>
          </section>

          <footer className="pt-10 flex gap-4">
            <button className="px-8 py-3 bg-[#f3cf7a] text-black font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors">
              Access Files
            </button>
            <button className="px-8 py-3 border border-[#f3cf7a] text-[#f3cf7a] font-bold tracking-widest uppercase hover:bg-[#f3cf7a]/10 transition-colors">
              Download
            </button>
          </footer>
        </div>
      </main>

      {/* Decorative Background Text */}
      <div className="fixed bottom-0 right-0 p-10 pointer-events-none select-none opacity-5">
        <h1 className="text-[15rem] leading-none font-black">{event.title}</h1>
      </div>
    </div>
  );
};

export default EventDetail;