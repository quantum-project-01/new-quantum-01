import React, {  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const VenueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Mock venue data (replace with actual data fetching)
  const venue = {
    id: id,
    name: 'Grand Sports Arena',
    description: 'A premium venue for all your sporting needs',
    price: 250.00,
    availability: true
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login with intent
      navigate('/login', { 
        state: { 
          from: { pathname: `/venues/${id}` },
          intent: 'proceed_to_payment'
        } 
      });
    } else {
      // If authenticated, proceed directly to checkout
      navigate(`/booking/${id}/checkout`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {venue.name}
          </h1>

          <p className="text-gray-300 mb-6">{venue.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Venue Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Price per Session</span>
                  <span className="font-bold text-blue-400">${venue.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Availability</span>
                  <span 
                    className={`font-medium ${
                      venue.availability 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}
                  >
                    {venue.availability ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Booking Options</h2>
              <button
                onClick={handleProceedToPayment}
                disabled={!venue.availability}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                  venue.availability
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isAuthenticated 
                  ? 'Proceed to Checkout' 
                  : 'Login to Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailPage; 