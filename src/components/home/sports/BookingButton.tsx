import React from 'react';

interface BookingButtonProps {
  sportName: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ sportName }) => (
  <div className="pt-4">
    <button className="group inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
      <span>Book {sportName} Now</span>
      <svg className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
);

export default BookingButton; 