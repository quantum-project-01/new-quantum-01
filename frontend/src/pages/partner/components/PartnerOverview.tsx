import React from 'react';
import { 
  DollarSign, 
  Calendar, 
  Building, 
  Star
} from 'lucide-react';
import Chart from '../../../components/common/Chart';
import { PartnerComponentProps } from '../types/partnerTypes';
import { getStatusColor, getStatusIcon } from '../utils/statusUtils';

const PartnerOverview: React.FC<PartnerComponentProps> = ({ selectedPeriod, mockData }) => {
  const { stats, earningsData, bookingsData, recentBookings, venues } = mockData;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-white">₹{stats.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.earnings}% this month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.bookings}% this month</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Venues</p>
              <p className="text-2xl font-bold text-white">{stats.totalVenues}</p>
              <p className="text-xs text-gray-400">No change</p>
            </div>
            <Building className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.rating} this month</p>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Earnings Overview</h3>
          <Chart
            data={earningsData.data}
            labels={earningsData.labels}
            color="green"
            type="line"
          />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Bookings Trend</h3>
          <Chart
            data={bookingsData.data}
            labels={bookingsData.labels}
            color="blue"
            type="bar"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentBookings.slice(0, 3).map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{booking.venue}</p>
                      <p className="text-sm text-gray-400">{booking.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="capitalize">{booking.status}</span>
                    </span>
                    <p className="text-sm font-medium text-white mt-1">₹{booking.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Venues */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Top Performing Venues</h3>
          </div>
          <div className="p-6 space-y-4">
            {venues.slice(0, 3).map((venue) => (
              <div key={venue.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{venue.name}</p>
                    <p className="text-sm text-gray-400">{venue.totalBookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-white">{venue.rating}</span>
                  </div>
                  <p className="text-sm text-gray-400">₹{venue.pricePerHour}/hr</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOverview; 