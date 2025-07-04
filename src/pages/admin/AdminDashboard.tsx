import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Users, 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserPlus,
  Download,
  Search,
  Filter,
  Settings,
  Save
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Chart from '../../components/common/Chart';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  // Determine which tab to show based on the current route
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard') return 'overview';
    if (path.includes('/users')) return 'users';
    if (path.includes('/partners')) return 'partners';
    if (path.includes('/venues')) return 'venues';
    if (path.includes('/bookings')) return 'bookings';
    if (path.includes('/settings')) return 'settings';
    return 'overview';
  };

  const selectedTab = getCurrentTab();

  // Mock data
  const mockStats = {
    totalUsers: 12543,
    totalPartners: 234,
    totalVenues: 456,
    totalBookings: 1789,
    totalRevenue: 2340000,
    pendingApprovals: 23,
    last30Days: {
      users: 12,
      partners: 8,
      venues: 15,
      bookings: 23,
      revenue: 18,
      approvals: 5,
    }
  };

  const mockRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [180000, 220000, 190000, 250000, 280000, 320000]
  };

  const mockUsersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1450, 1300, 1600, 1800, 2100]
  };

  const mockRecentUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      joinDate: '2024-01-15',
      status: 'active' as const,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'partner',
      joinDate: '2024-01-14',
      status: 'pending' as const,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      joinDate: '2024-01-13',
      status: 'active' as const,
      avatar: '/api/placeholder/40/40'
    }
  ];

  const mockPendingVenues = [
    {
      id: '1',
      name: 'Elite Sports Arena',
      partner: 'SportsCorp Ltd',
      location: 'Mumbai, Maharashtra',
      sport: 'Cricket',
      submittedDate: '2024-01-10',
      status: 'pending' as const
    },
    {
      id: '2',
      name: 'Champions Ground',
      partner: 'PlayTime Sports',
      location: 'Delhi, NCR',
      sport: 'Football',
      submittedDate: '2024-01-09',
      status: 'under_review' as const
    }
  ];

  const mockRecentBookings = [
    {
      id: '1',
      venue: 'Elite Sports Arena',
      user: 'John Doe',
      partner: 'SportsCorp Ltd',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      amount: 2000,
      status: 'confirmed' as const,
      sport: 'Cricket'
    },
    {
      id: '2',
      name: 'Weekend Tournament',
      venue: 'Champions Ground',
      user: 'Jane Smith',
      partner: 'PlayTime Sports',
      date: '2024-01-16',
      time: '2:00 PM - 6:00 PM',
      amount: 5000,
      status: 'pending' as const,
      sport: 'Football'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'approved':
        return 'text-green-400 bg-green-900/20 border-green-800';
      case 'pending':
      case 'under_review':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'cancelled':
      case 'rejected':
      case 'blocked':
        return 'text-red-400 bg-red-900/20 border-red-800';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
      case 'rejected':
      case 'blocked':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.users}% this month</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Partners</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalPartners}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.partners}% this month</p>
            </div>
            <UserPlus className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Venues</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalVenues}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.venues}% this month</p>
            </div>
            <Building className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{mockStats.totalBookings.toLocaleString()}</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.bookings}% this month</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹{(mockStats.totalRevenue / 100000).toFixed(1)}L</p>
              <p className="text-xs text-green-400">+{mockStats.last30Days.revenue}% this month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Pending Approvals</p>
              <p className="text-2xl font-bold text-white">{mockStats.pendingApprovals}</p>
              <p className="text-xs text-yellow-400">+{mockStats.last30Days.approvals} this month</p>
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
            data={mockRevenueData.data}
            labels={mockRevenueData.labels}
            color="green"
            type="line"
          />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
          <Chart
            data={mockUsersData.data}
            labels={mockUsersData.labels}
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
            {mockRecentUsers.map((user) => (
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
            {mockPendingVenues.map((venue) => (
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
            {mockRecentBookings.map((booking) => (
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

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">User Management</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-gray-700 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add User
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockRecentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full bg-gray-600"
                      />
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 capitalize">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
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
                      <button className="p-1 text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
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

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Platform Settings</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="Quantum Sports"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@quantum.com"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Platform Description
            </label>
            <textarea
              rows={4}
              defaultValue="Quantum is a comprehensive sports venue booking platform that connects users with premium sports facilities."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                defaultValue="15"
                min="0"
                max="100"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Partner Subscription Fee (₹/month)
              </label>
              <input
                type="number"
                defaultValue="5000"
                min="0"
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
      case 'users':
        return renderUsers();
      case 'partners':
        return renderUsers(); // Reuse for now, can be customized later
      case 'venues':
        return renderUsers(); // Reuse for now, can be customized later
      case 'bookings':
        return renderUsers(); // Reuse for now, can be customized later
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {selectedTab === 'overview' ? 'Admin Dashboard' : 
               selectedTab === 'users' ? 'User Management' :
               selectedTab === 'partners' ? 'Partner Management' :
               selectedTab === 'venues' ? 'Venue Management' :
               selectedTab === 'bookings' ? 'Booking Management' :
               selectedTab === 'settings' ? 'Platform Settings' : 'Admin Dashboard'}
            </h1>
            <p className="text-gray-400 mt-1">
              {selectedTab === 'overview' ? 'Monitor platform performance and key metrics' :
               selectedTab === 'users' ? 'Manage user accounts and permissions' :
               selectedTab === 'partners' ? 'Manage partner applications and accounts' :
               selectedTab === 'venues' ? 'Approve and manage venue listings' :
               selectedTab === 'bookings' ? 'Monitor and manage all bookings' :
               selectedTab === 'settings' ? 'Configure platform settings and preferences' : 'Monitor platform performance and key metrics'}
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

export default AdminDashboard; 