import React, { useState } from "react";
import { MapPin, X, Gift, ArrowRight, Calendar, Clock } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  price: number;
  status: "available" | "booked" | "filling-fast" | "not-available";
  facilityId: string;
  availability?: string;
}

interface CheckoutCardProps {
  selectedActivity: any;
  selectedFacility: any;
  selectedSlots: TimeSlot[];
  onProceed: () => void;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  selectedActivity,
  selectedFacility,
  selectedSlots,
  onProceed,
}) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    mobile: "",
    dob: "",
  });

  const [saveToProfile, setSaveToProfile] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit sticky top-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

      {/* Venue Info */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Sunset Arena</h4>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Mumbai, Maharashtra</span>
        </div>
      </div>

      {/* Selected Slots */}
      {selectedSlots.length > 0 && (
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 mb-3">Selected Slots</h5>
          <div className="space-y-3">
            {selectedSlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(slot.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(slot.time)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ₹{slot.price}
                  </div>
                  <button className="text-red-600 text-sm hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Information */}
      <div className="mb-6">
        <h5 className="font-medium text-gray-900 mb-3">Booking Information</h5>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile
            </label>
            <input
              type="tel"
              value={userInfo.mobile}
              onChange={(e) =>
                setUserInfo({ ...userInfo, mobile: e.target.value })
              }
              placeholder="Enter your mobile number"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth (Optional)
            </label>
            <input
              type="date"
              value={userInfo.dob}
              onChange={(e) =>
                setUserInfo({ ...userInfo, dob: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Options */}
        <div className="mt-4 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={saveToProfile}
              onChange={(e) => setSaveToProfile(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Save to profile</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={whatsappUpdates}
              onChange={(e) => setWhatsappUpdates(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Get WhatsApp updates</span>
          </label>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowCoupon(!showCoupon)}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Gift className="w-4 h-4 mr-1" />
          {showCoupon ? "Hide Coupon" : "Add Coupon"}
        </button>
        {showCoupon && (
          <div className="mt-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onProceed}
          disabled={selectedSlots.length === 0}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span>₹{total.toFixed(2)}</span>
          <span className="mx-2">•</span>
          <span>PROCEED</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
