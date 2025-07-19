import { MockData } from '../types/adminTypes';

export const mockData: MockData = {
  stats: {
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
  },
  revenueData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [180000, 220000, 190000, 250000, 280000, 320000]
  },
  usersData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1450, 1300, 1600, 1800, 2100]
  },
  recentUsers: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      joinDate: '2024-01-15',
      status: 'active',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'partner',
      joinDate: '2024-01-14',
      status: 'pending',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      joinDate: '2024-01-13',
      status: 'active',
      avatar: '/api/placeholder/40/40'
    }
  ],
  pendingVenues: [
    {
      id: '1',
      name: 'Elite Sports Arena',
      partner: 'SportsCorp Ltd',
      location: 'Mumbai, Maharashtra',
      sport: 'Cricket',
      submittedDate: '2024-01-10',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Champions Ground',
      partner: 'PlayTime Sports',
      location: 'Delhi, NCR',
      sport: 'Football',
      submittedDate: '2024-01-09',
      status: 'under_review'
    }
  ],
  recentBookings: [
    {
      id: '1',
      venue: 'Elite Sports Arena',
      user: 'John Doe',
      partner: 'SportsCorp Ltd',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      amount: 2000,
      status: 'confirmed',
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
      status: 'pending',
      sport: 'Football'
    }
  ]
}; 