import React from 'react';
import { Search, Eye, Edit } from 'lucide-react';
import { PartnerComponentProps } from '../types/partnerTypes';
import { getStatusColor, getStatusIcon } from '../utils/statusUtils';

const BookingManagement: React.FC<PartnerComponentProps> = ({ mockData }) => {
  const { recentBookings } = mockData;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Booking Management</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="bg-gray-700 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentBookings.map((booking) => {
                const StatusIcon = getStatusIcon(booking.status);
                return (
                  <tr key={booking.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">#{booking.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{booking.venue}</div>
                        <div className="text-sm text-gray-400">{booking.sport}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{booking.user}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{booking.date}</div>
                      <div className="text-sm text-gray-400">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">₹{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="capitalize">{booking.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-400 hover:text-blue-300">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-400 hover:text-green-300">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement; 