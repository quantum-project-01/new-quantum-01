import { PartnerMockData } from '../types/partnerTypes';

export const mockData: PartnerMockData = {
    stats: {
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
    },
    earningsData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [18000, 22000, 19000, 25000, 28000, 32000]
    },
    bookingsData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [12, 15, 18, 22, 25, 28]
    },
    recentBookings: [
        {
            id: '1',
            venue: 'Elite Sports Arena',
            user: 'John Doe',
            date: '2024-01-15',
            time: '10:00 AM - 12:00 PM',
            amount: 2000,
            status: 'confirmed',
            sport: 'Cricket'
        },
        {
            id: '2',
            venue: 'Champions Ground',
            user: 'Jane Smith',
            date: '2024-01-16',
            time: '2:00 PM - 4:00 PM',
            amount: 1500,
            status: 'pending',
            sport: 'Football'
        },
        {
            id: '3',
            venue: 'Pro Tennis Court',
            user: 'Mike Johnson',
            date: '2024-01-17',
            time: '6:00 PM - 8:00 PM',
            amount: 1200,
            status: 'confirmed',
            sport: 'Tennis'
        }
    ],
    venues: [
        {
            id: '1',
            name: 'Elite Sports Arena',
            location: 'Sector 18, Noida',
            sport: 'Cricket',
            pricePerHour: 2000,
            rating: 4.8,
            totalBookings: 45,
            status: 'active',
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
            status: 'active',
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
            status: 'pending',
            image: '/api/placeholder/300/200'
        }
    ],
    revenueData: []
}; 