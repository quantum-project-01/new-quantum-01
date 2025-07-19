import React from 'react';
import { 
  Users, 
  Building, 
  Calendar, 
  DollarSign, 
  Clock,
  UserPlus
} from 'lucide-react';
import Chart from '../../../components/common/Chart';
import { AdminComponentProps } from '../types/adminTypes';
import { getStatusColor } from '../utils/statusUtils';

const AdminOverview: React.FC<AdminComponentProps> = ({ selectedPeriod, mockData }) => {
  const { stats, revenueData, usersData, recentUsers, pendingVenues, recentBookings } = mockData;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.users}% this month</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Partners</p>
              <p className="text-2xl font-bold text-white">{stats.totalPartners}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.partners}% this month</p>
            </div>
            <UserPlus className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Venues</p>
              <p className="text-2xl font-bold text-white">{stats.totalVenues}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.venues}% this month</p>
            </div>
            <Building className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{stats.totalBookings.toLocaleString()}</p>
              <p className="text-xs text-green-400">+{stats.last30Days.bookings}% this month</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
              <p className="text-xs text-green-400">+{stats.last30Days.revenue}% this month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Pending Approvals</p>
              <p className="text-2xl font-bold text-white">{stats.pendingApprovals}</p>
              <p className="text-xs text-yellow-400">+{stats.last30Days.approvals} this month</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <Chart
            data={revenueData.data}
            labels={revenueData.labels}
            color="green"
            type="line"
          />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
          <Chart
            data={usersData.data}
            labels={usersData.labels}
            color="blue"
            type="bar"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Users</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full bg-gray-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Venues */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Pending Venues</h3>
          </div>
          <div className="p-6 space-y-4">
            {pendingVenues.map((venue) => (
              <div key={venue.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{venue.name}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(venue.status)}`}>
                    {venue.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{venue.partner}</p>
                <p className="text-xs text-gray-500">{venue.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{booking.venue}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{booking.user}</p>
                <p className="text-xs text-gray-500">₹{booking.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 