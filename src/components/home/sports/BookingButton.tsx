import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BookingButtonProps {
  sportName: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ sportName }) => (
  <div className="pt-4">
    <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover-effect">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      <span className="relative z-10 flex items-center">
        Book {sportName}
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </button>
  </div>
);

export default BookingButton; 