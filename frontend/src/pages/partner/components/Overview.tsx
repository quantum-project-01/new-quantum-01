import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, MapPin, Star } from 'lucide-react';
import { PartnerComponentProps } from '../types/partnerTypes';
import { getStatusColor, getStatusIcon } from '../utils/statusUtils';

const Overview: React.FC<PartnerComponentProps> = ({ mockData, selectedPeriod }) => {
  const { stats, earningsData, bookingsData, recentBookings, venues } = mockData;

  const renderStatCard = (title: string, value: string, change: number, icon: React.ElementType, color: string) => {
    const Icon = icon;
    const isPositive = change >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const trendColor = isPositive ? 'text-green-400' : 'text-red-400';

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <div className={`bg-${color}-600 bg-opacity-20 p-3 rounded-full`}>
            <Icon className={`h-6 w-6 text-${color}-400`} />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <TrendIcon className={`h-4 w-4 ${trendColor} mr-1`} />
          <span className={`text-sm ${trendColor}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-400 ml-2">from last month</span>
        </div>
      </div>
    );
  };

  const renderChart = (title: string, data: { labels: string[], data: number[] }, color: string) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6">
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.labels.map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full bg-${color}-600 rounded-t-lg relative`}
                style={{
                  height: `${(data.data[index] / Math.max(...data.data)) * 200}px`,
                  minHeight: '20px'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-700 px-2 py-1 rounded">
                  {typeof data.data[index] === 'number' && data.data[index] > 1000 
                    ? `₹${(data.data[index] / 1000).toFixed(0)}k` 
                    : data.data[index]}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 text-center">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCard(
          'Total Earnings',
          `₹${stats.totalEarnings.toLocaleString()}`,
          (stats.last30Days.earnings / stats.totalEarnings) * 100,
          DollarSign,
          'green'
        )}
        {renderStatCard(
          'Total Bookings',
          stats.totalBookings.toString(),
          (stats.last30Days.bookings / stats.totalBookings) * 100,
          Calendar,
          'blue'
        )}
        {renderStatCard(
          'Total Venues',
          stats.totalVenues.toString(),
          stats.last30Days.venues,
          MapPin,
          'purple'
        )}
        {renderStatCard(
          'Average Rating',
          stats.avgRating.toFixed(1),
          stats.last30Days.rating,
          Star,
          'yellow'
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderChart('Earnings Trend', earningsData, 'green')}
        {renderChart('Bookings Trend', bookingsData, 'blue')}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.slice(0, 5).map((booking) => {
                const StatusIcon = getStatusIcon(booking.status);
                return (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-600 bg-opacity-20 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{booking.venue}</p>
                        <p className="text-sm text-gray-400">{booking.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">₹{booking.amount}</p>
                      <div className="flex items-center space-x-1">
                        <StatusIcon className="h-3 w-3" />
                        <span className={`text-xs capitalize ${getStatusColor(booking.status).split(' ')[0]}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Venue Performance */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Venue Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {venues.map((venue) => {
                const StatusIcon = getStatusIcon(venue.status);
                return (
                  <div key={venue.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg overflow-hidden">
                        <img
                          src={venue.image}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{venue.name}</p>
                        <p className="text-sm text-gray-400">{venue.sport}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-white">{venue.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StatusIcon className="h-3 w-3" />
                        <span className={`text-xs capitalize ${getStatusColor(venue.status).split(' ')[0]}`}>
                          {venue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 