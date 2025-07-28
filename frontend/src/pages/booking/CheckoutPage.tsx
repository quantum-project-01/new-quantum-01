/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle,
  MapPin,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";

// Types for Checkout
interface CheckoutData {
  venue: {
    name: string;
    address: string;
    city: string;
  };
  booking: {
    activity: string;
    date: string;
    time: string;
    duration: number;
    totalPrice: number;
  };
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

// Payment Method Component
const PaymentMethod: React.FC<{
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}> = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods = [
    { id: "credit", name: "Credit Card", icon: CreditCard },
    { id: "debit", name: "Debit Card", icon: CreditCard },
    { id: "upi", name: "UPI", icon: CheckCircle },
    { id: "net-banking", name: "Net Banking", icon: CheckCircle },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Choose Payment Method
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <method.icon className="w-8 h-8 mb-2 text-gray-700" />
            <span className="text-sm font-medium text-gray-800">
              {method.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Booking Summary Component
const BookingSummary: React.FC<{ booking: CheckoutData["booking"] }> = ({
  booking,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Booking Summary
      </h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <span className="text-gray-700 font-medium">Activity</span>
            <p className="text-gray-900">{booking.activity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <span className="text-gray-700 font-medium">Date & Time</span>
            <p className="text-gray-900">
              {booking.date} at {booking.time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <span className="text-gray-700 font-medium">Duration</span>
            <p className="text-gray-900">{booking.duration} hours</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Price</span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{booking.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

// Checkout Page Component
const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { venueId } = useParams();

  // Default venue data (can be replaced with actual venue data based on venueId)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    venue: {
      name: "Sunset Arena",
      address: "123 Sports Complex, Andheri West",
      city: "Mumbai",
    },
    booking: {
      activity: location.state?.activity?.name || "Cricket",
      date: location.state?.slots?.[0]?.slotDate || "2025-07-26",
      time: location.state?.slots?.[0]?.slotTime || "00:00 - 00:30",
      duration: location.state?.slots?.length || 1,
      totalPrice: location.state?.slots?.reduce((sum: number, slot: { slotAmount: number }) => sum + slot.slotAmount, 0) || 367,
    },
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
    },
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmBooking = () => {
    // Placeholder for payment and booking confirmation logic
    if (selectedPaymentMethod) {
      setIsBookingConfirmed(true);
    } else {
      alert("Please select a payment method");
    }
  };

  if (isBookingConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking for {checkoutData.booking.activity} at{" "}
            {checkoutData.venue.name} is now confirmed.
          </p>
          <div className="bg-green-50 rounded-xl p-4 text-left space-y-2">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="text-gray-800">
                {checkoutData.venue.address}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="text-gray-800">
                {checkoutData.booking.date} at {checkoutData.booking.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Complete Your Booking
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your booking details and choose a payment method to confirm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Venue & Booking Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Venue Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {checkoutData.venue.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>
                      {checkoutData.venue.address}, {checkoutData.venue.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Your Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-gray-700 font-medium">Name</span>
                    <p className="text-gray-900">{checkoutData.user.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-gray-700 font-medium">Email</span>
                    <p className="text-gray-900">{checkoutData.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-gray-700 font-medium">Phone</span>
                    <p className="text-gray-900">{checkoutData.user.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <PaymentMethod
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={handlePaymentMethodSelect}
            />
          </div>

          {/* Right Section - Booking Summary */}
          <div className="lg:col-span-1 space-y-8">
            <BookingSummary booking={checkoutData.booking} />

            {/* Confirm Booking Button */}
            <button
              onClick={handleConfirmBooking}
              disabled={!selectedPaymentMethod}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                selectedPaymentMethod
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 