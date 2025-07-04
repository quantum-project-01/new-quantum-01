import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  DollarSign, 
  Calendar, 
  Building, 
  MapPin, 
  Users, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Search,
  Settings,
  Save
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Chart from '../../components/common/Chart';

const PartnerDashboard: React.FC = () => {
  const location = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  // Determine which tab to show based on the current route
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/partner/dashboard') return 'overview';
    if (path.includes('/bookings')) return 'bookings';
    if (path.includes('/venues')) return 'venues';
    if (path.includes('/earnings')) return 'earnings';
    if (path.includes('/settings')) return 'settings';
    return 'overview';
  };

  const selectedTab = getCurrentTab();

  // Mock data
  const mockStats = {
    totalEarnings: 125000,
    totalBookings: 89,
    totalVenues: 3,
    avgRating: 4.8,
    last30Days: {
      earnings: 22,
      bookings: 15,
      venues: 0,
      rating: 0.2,
    }
  };

  const mockEarningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [18000, 22000, 19000, 25000, 28000, 32000]
  };

  const mockBookingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [12, 15, 18, 22, 25, 28]
  };

  const mockRecentBookings = [
    {
      id: '1',
      venue: 'Elite Sports Arena',
      user: 'John Doe',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      amount: 2000,
      status: 'confirmed' as const,
      sport: 'Cricket'
    },
    {
      id: '2',
      venue: 'Champions Ground',
      user: 'Jane Smith',
      date: '2024-01-16',
      time: '2:00 PM - 4:00 PM',
      amount: 1500,
      status: 'pending' as const,
      sport: 'Football'
    },
    {
      id: '3',
      venue: 'Pro Tennis Court',
      user: 'Mike Johnson',
      date: '2024-01-17',
      time: '6:00 PM - 8:00 PM',
      amount: 1200,
      status: 'confirmed' as const,
      sport: 'Tennis'
    }
  ];

  const mockVenues = [
    {
      id: '1',
      name: 'Elite Sports Arena',
      location: 'Sector 18, Noida',
      sport: 'Cricket',
      pricePerHour: 2000,
      rating: 4.8,
      totalBookings: 45,
      status: 'active' as const,
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Champions Ground',
      location: 'Connaught Place, Delhi',
      sport: 'Football',
      pricePerHour: 1500,
      rating: 4.6,
      totalBookings: 32,
      status: 'active' as const,
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Pro Tennis Court',
      location: 'Gurgaon',
      sport: 'Tennis',
      pricePerHour: 1200,
      rating: 4.9,
      totalBookings: 28,
      status: 'pending' as const,
      image: '/api/placeholder/300/200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
        return 'text-green-400 bg-green-900/20 border-green-800';
      case 'pending':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'cancelled':
      case 'inactive':
        return 'text-red-400 bg-red-900/20 border-red-800';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
      case 'inactive':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-white">₹{mockStats.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.earnings}% this month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalBookings}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.bookings}% this month</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Venues</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalVenues}</p>
              <p className="text-xs text-gray-400">No change</p>
            </div>
            <Building className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-white">{mockStats.avgRating}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.rating} this month</p>
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
            data={mockEarningsData.data}
            labels={mockEarningsData.labels}
            color="green"
            type="line"
          />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Bookings Trend</h3>
          <Chart
            data={mockBookingsData.data}
            labels={mockBookingsData.labels}
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
            {mockRecentBookings.slice(0, 3).map((booking) => (
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
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </span>
                  <p className="text-sm font-medium text-white mt-1">₹{booking.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Venues */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Top Performing Venues</h3>
          </div>
          <div className="p-6 space-y-4">
            {mockVenues.slice(0, 3).map((venue) => (
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

  const renderBookings = () => (
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
              {mockRecentBookings.map((booking) => (
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
                      {getStatusIcon(booking.status)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderVenues = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Venue Management</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Venue</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockVenues.map((venue) => (
            <div key={venue.id} className="bg-gray-700 border border-gray-600 rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-600 relative">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(venue.status)}`}>
                    {getStatusIcon(venue.status)}
                    <span className="capitalize">{venue.status}</span>
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white">{venue.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {venue.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Sport:</span>
                    <p className="font-medium text-white">{venue.sport}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Price/Hour:</span>
                    <p className="font-medium text-white">₹{venue.pricePerHour}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-white">{venue.rating}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Bookings:</span>
                    <p className="font-medium text-white">{venue.totalBookings}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Partner Settings</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name
              </label>
              <input
                type="text"
                defaultValue="Elite Sports Management"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="partner@elite.com"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              defaultValue="Elite Sports Management provides premium sports facilities and exceptional service to athletes and sports enthusiasts."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+91 9876543210"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Address
              </label>
              <input
                type="text"
                defaultValue="Sector 18, Noida, UP"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'bookings':
        return renderBookings();
      case 'venues':
        return renderVenues();
      case 'earnings':
        return renderOverview(); // Reuse for now, can be customized later
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout userRole="partner">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {selectedTab === 'overview' ? 'Partner Dashboard' : 
               selectedTab === 'bookings' ? 'Booking Management' :
               selectedTab === 'venues' ? 'Venue Management' :
               selectedTab === 'earnings' ? 'Earnings & Analytics' :
               selectedTab === 'settings' ? 'Partner Settings' : 'Partner Dashboard'}
            </h1>
            <p className="text-gray-400 mt-1">
              {selectedTab === 'overview' ? 'Monitor your venue performance and bookings' :
               selectedTab === 'bookings' ? 'Manage and track all venue bookings' :
               selectedTab === 'venues' ? 'Manage your venue listings and details' :
               selectedTab === 'earnings' ? 'Track your earnings and financial performance' :
               selectedTab === 'settings' ? 'Update your partner profile and preferences' : 'Monitor your venue performance and bookings'}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as '7d' | '30d' | '90d')}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default PartnerDashboard; 