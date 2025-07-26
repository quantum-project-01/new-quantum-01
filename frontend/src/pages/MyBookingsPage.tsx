import React, { useState } from 'react';
import { Calendar, MapPin, Clock, MoreHorizontal } from 'lucide-react';

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      venue: 'Grand Conference Hall',
      date: '2024-02-15',
      time: '10:00 AM - 2:00 PM',
      status: 'confirmed',
      type: 'Conference',
      location: 'Downtown Business Center'
    },
    {
      id: 2,
      venue: 'Sunset Ballroom',
      date: '2024-03-22',
      time: '6:00 PM - 11:00 PM',
      status: 'pending',
      type: 'Wedding Reception',
      location: 'Riverside Hotel'
    },
    {
      id: 3,
      venue: 'Tech Innovation Center',
      date: '2024-01-30',
      time: '9:00 AM - 5:00 PM',
      status: 'completed',
      type: 'Hackathon',
      location: 'Tech Park Campus'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            New Booking
          </button>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-200">{booking.venue}</h2>
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium uppercase ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">{booking.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">{booking.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">{booking.location}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400 italic">{booking.type}</span>
                <button 
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  title="More Details"
                >
                  <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              You haven't made any bookings yet.
            </p>
            <button 
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Book Your First Venue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage; 