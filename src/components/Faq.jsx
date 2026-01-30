import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_DATA = [
  { question: "What is the Archive?", answer: "The Archive is a secure collection of OAD records and Survey Corps history." },
  { question: "How to join the Survey Corps?", answer: "Enrollment is currently restricted to those who have completed the 104th Training Corps." },
  { question: "Where are the Walls located?", answer: "The walls—Maria, Rose, and Sina—are situated in a concentric formation." }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-8 group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      {/* Blueprint Crosshairs - Matching your card style */}
      <div className="absolute -inset-x-2 top-0 bottom-0 border-t border-b border-white/10 pointer-events-none" />
      <div className="absolute -inset-y-2 left-0 right-0 border-l border-r border-white/10 pointer-events-none" />
      
      <div className="bg-neutral-900/50 p-6 transition-all duration-300 group-hover:bg-neutral-900">
        <div className="flex justify-between items-center">
          <h3 className="text-[#f3cf7a] text-lg font-serif tracking-widest uppercase">{question}</h3>
          <span className="text-[#f3cf7a] text-2xl">{isOpen ? "−" : "+"}</span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-neutral-400 font-light leading-relaxed border-t border-white/5 pt-4">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 font-sans relative overflow-hidden">
      {/* Background image logic from your EventSeries */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://your-dark-texture.jpg')] bg-cover bg-center" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <h2 className="text-[#f3cf7a] text-xs tracking-[0.5em] uppercase mb-2">Technical Documents</h2>
          <h1 className="text-5xl font-serif font-black uppercase tracking-tighter italic">F.A.Q. ARCHIVE</h1>
          <div className="h-[1px] w-32 bg-[#f3cf7a]/40 mx-auto mt-6" />
        </header>

        <div>
          {FAQ_DATA.map((item, index) => (
            <FAQItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;