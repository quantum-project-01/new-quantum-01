import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { PartnerComponentProps, RevenueData } from '../types/partnerTypes';

const Revenue: React.FC<PartnerComponentProps> = ({ mockData }) => {
  const { revenueData, recentBookings } = mockData;

  const totalRevenue = revenueData.reduce((sum: number, item: RevenueData) => sum + item.amount, 0);
  const previousMonthRevenue = revenueData.slice(0, -1).reduce((sum: number, item: RevenueData) => sum + item.amount, 0);
  const revenueGrowth = ((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

  const avgBookingValue = totalRevenue / recentBookings.length;
  const monthlyBookings = recentBookings.length;

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-600 bg-opacity-20 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+{revenueGrowth.toFixed(1)}%</span>
            <span className="text-sm text-gray-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Monthly Bookings</p>
              <p className="text-2xl font-bold text-white">{monthlyBookings}</p>
            </div>
            <div className="bg-blue-600 bg-opacity-20 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+12%</span>
            <span className="text-sm text-gray-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Avg. Booking Value</p>
              <p className="text-2xl font-bold text-white">₹{avgBookingValue.toFixed(0)}</p>
            </div>
            <div className="bg-purple-600 bg-opacity-20 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
            <span className="text-sm text-red-400">-2.5%</span>
            <span className="text-sm text-gray-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Revenue Growth</p>
              <p className="text-2xl font-bold text-white">{revenueGrowth.toFixed(1)}%</p>
            </div>
            <div className="bg-yellow-600 bg-opacity-20 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">+5.2%</span>
            <span className="text-sm text-gray-400 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between space-x-2">
            {revenueData.map((item: RevenueData, index: number) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-600 rounded-t-lg relative"
                  style={{
                    height: `${(item.amount / Math.max(...revenueData.map((d: RevenueData) => d.amount))) * 200}px`,
                    minHeight: '20px'
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-700 px-2 py-1 rounded">
                    ₹{item.amount.toLocaleString()}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 text-center">
                  {item.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-600 bg-opacity-20 p-2 rounded-full">
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{booking.venue}</p>
                    <p className="text-sm text-gray-400">{booking.user} • {booking.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">₹{booking.amount}</p>
                  <p className="text-sm text-gray-400">{booking.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue; 