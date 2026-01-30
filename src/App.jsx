import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventSeries from './components/EventSeries';

// Simple placeholder for the detail page
const EventDetail = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <h1 className="text-4xl">Event Detail Page</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <Routes>
        {/* The main page showing all your event cards */}
        <Route path="/" element={<EventSeries />} />
        
        {/* The dynamic route for individual events */}
        <Route path="/event/:id" element={<EventDetail />} />
        
        {/* Catch-all route for 404s */}
        <Route path="*" element={<div className="p-10">Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;