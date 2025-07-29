import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, MoreHorizontal, Filter, Search, Plus } from 'lucide-react';

const MyBookingsPage: React.FC = () => {
  const [bookings] = useState([
    {
      id: 1,
      venue: 'Grand Conference Hall',
      date: '2024-02-15',
      time: '10:00 AM - 2:00 PM',
      status: 'confirmed',
      type: 'Conference',
      location: 'Downtown Business Center',
      price: '₹15,000',
      capacity: '200 people'
    },
    {
      id: 2,
      venue: 'Sunset Ballroom',
      date: '2024-03-22',
      time: '6:00 PM - 11:00 PM',
      status: 'pending',
      type: 'Wedding Reception',
      location: 'Riverside Hotel',
      price: '₹45,000',
      capacity: '150 people'
    },
    {
      id: 3,
      venue: 'Tech Innovation Center',
      date: '2024-01-30',
      time: '9:00 AM - 5:00 PM',
      status: 'completed',
      type: 'Hackathon',
      location: 'Tech Park Campus',
      price: '₹25,000',
      capacity: '300 people'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  // const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'completed': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'confirmed': return '✓';
  //     case 'pending': return '⏳';
  //     case 'completed': return '✅';
  //     default: return '❓';
  //   }
  // };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                My Bookings
              </h1>
              <p className="text-gray-400 text-lg">Manage and track your venue reservations</p>
            </div>
            <button
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
            >
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                <span className="font-medium">New Booking</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`transition-all duration-1000 delay-200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-200">{booking.venue}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium uppercase ${getStatusColor(booking.status)}`}
                >
                  {/* {booking.status} */}
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