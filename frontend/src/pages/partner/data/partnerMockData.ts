import { PartnerMockData } from '../types/partnerTypes';

export const partnerMockData: PartnerMockData = {
  stats: {
    totalEarnings: 125000,
    totalBookings: 89,
    totalVenues: 3,
    avgRating: 4.7,
    last30Days: {
      earnings: 15000,
      bookings: 12,
      venues: 0,
      rating: 0.1
    }
  },
  earningsData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [45000, 52000, 48000, 61000, 58000, 67000]
  },
  bookingsData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [12, 15, 18, 22, 19, 25]
  },
  recentBookings: [
    {
      id: 'BK001',
      venue: 'Champions Cricket Academy',
      user: 'Rahul Sharma',
      date: '2024-01-15',
      time: '10:00 AM',
      amount: 2000,
      status: 'confirmed',
      sport: 'Cricket'
    },
    {
      id: 'BK002',
      venue: 'Elite Football Ground',
      user: 'Priya Patel',
      date: '2024-01-14',
      time: '6:00 PM',
      amount: 1500,
      status: 'confirmed',
      sport: 'Football'
    },
    {
      id: 'BK003',
      venue: 'Pro Tennis Courts',
      user: 'Amit Kumar',
      date: '2024-01-13',
      time: '8:00 AM',
      amount: 1200,
      status: 'pending',
      sport: 'Tennis'
    },
    {
      id: 'BK004',
      venue: 'Champions Cricket Academy',
      user: 'Sneha Gupta',
      date: '2024-01-12',
      time: '4:00 PM',
      amount: 2000,
      status: 'confirmed',
      sport: 'Cricket'
    },
    {
      id: 'BK005',
      venue: 'Elite Football Ground',
      user: 'Vikram Singh',
      date: '2024-01-11',
      time: '7:00 PM',
      amount: 1500,
      status: 'cancelled',
      sport: 'Football'
    }
  ],
  venues: [
    {
      id: '1',
      name: 'Champions Cricket Academy',
      location: 'Sector 21, Gurgaon',
      sport: 'Cricket',
      pricePerHour: 2000,
      rating: 4.8,
      totalBookings: 156,
      status: 'active' as const,
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '2',
      name: 'Elite Football Ground',
      location: 'DLF Phase 3, Gurgaon',
      sport: 'Football',
      pricePerHour: 1500,
      rating: 4.6,
      totalBookings: 89,
      status: 'active' as const,
      image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '3',
      name: 'Pro Tennis Courts',
      location: 'Golf Course Road, Gurgaon',
      sport: 'Tennis',
      pricePerHour: 1200,
      rating: 4.7,
      totalBookings: 67,
      status: 'pending' as const,
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ],
  revenueData: [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 58000 },
    { month: 'Jun', amount: 67000 },
    { month: 'Jul', amount: 72000 },
    { month: 'Aug', amount: 69000 },
    { month: 'Sep', amount: 75000 },
    { month: 'Oct', amount: 78000 },
    { month: 'Nov', amount: 82000 },
    { month: 'Dec', amount: 85000 }
  ]
}; 