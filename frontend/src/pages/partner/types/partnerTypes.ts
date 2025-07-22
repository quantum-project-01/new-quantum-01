export type PartnerTab = 'overview' | 'bookings' | 'venues' | 'earnings' | 'settings';

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';
export type VenueStatus = 'active' | 'pending' | 'inactive';

export interface PartnerBooking {
  id: string;
  venue: string;
  user: string;
  date: string;
  time: string;
  amount: number;
  status: BookingStatus;
  sport: string;
}

export interface PartnerVenue {
  id: string;
  name: string;
  location: string;
  sport: string;
  pricePerHour: number;
  rating: number;
  totalBookings: number;
  status: VenueStatus;
  image: string;
}

export interface PartnerStats {
  totalEarnings: number;
  totalBookings: number;
  totalVenues: number;
  avgRating: number;
  last30Days: {
    earnings: number;
    bookings: number;
    venues: number;
    rating: number;
  };
}

export interface ChartData {
  labels: string[];
  data: number[];
}

export interface RevenueData {
  month: string;
  amount: number;
}

export interface PartnerMockData {
  stats: PartnerStats;
  earningsData: ChartData;
  bookingsData: ChartData;
  recentBookings: PartnerBooking[];
  venues: PartnerVenue[];
  revenueData: RevenueData[];
}

export interface PartnerComponentProps {
  selectedPeriod: '7d' | '30d' | '90d';
  mockData: PartnerMockData;
} 