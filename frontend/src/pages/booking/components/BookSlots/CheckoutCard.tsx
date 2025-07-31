import React, { useEffect, useState } from "react";
import { MapPin, X, Gift, ArrowRight, Calendar, Clock } from "lucide-react";
import { Slot } from "./SlotSelector";
import { Activity } from "./ActivitySelector";
import { Facility } from "./FacilitySelector";
import { useMutation } from "@tanstack/react-query";
import {
  createBookingOrder,
  validateAndCreateBooking,
  verifyBookingPayment,
} from "../../../../services/partner-service/paymentService";
import { useAuthStore } from "../../../../store/authStore";
import { toast } from "react-hot-toast";
import { Venue } from "../../VenueDetailsPage";

export enum Currency {
  INR = "INR",
  USD = "USD",
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutCardProps {
  venue: Venue;
  selectedActivity: Activity | null;
  selectedFacility: Facility | null;
  selectedSlots: Slot[];
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  venue,
  selectedSlots,
  selectedActivity,
  selectedFacility,
}) => {
  const { user } = useAuthStore();
  const subtotal = selectedSlots.reduce((sum, slot) => sum + slot.amount, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const [validating, setValidating] = useState(false);
  const [initiatingPayment, setInitiatingPayment] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  // Step 1: Validate and create booking mutation
  const validateBookingMutation = useMutation({
    mutationFn: () => {
      const bookingData = {
        venueId: selectedActivity?.venueId || "",
        userId: user?.id || "",
        partnerId: venue.partnerId,
        facilityId: selectedFacility?.id || "",
        slotIds: selectedSlots
          .map((slot) => slot.id)
          .filter((id): id is string => typeof id === "string"),
        activityId: selectedActivity?.id || "",
        amount: total,
        startTime: selectedSlots[0]?.startTime || "",
        endTime: selectedSlots[selectedSlots.length - 1]?.endTime || "",
        bookedDate: new Date(),
      };

      return validateAndCreateBooking(bookingData);
    },
    onSuccess: (bookingResponse) => {
      setBookingId(bookingResponse);
      setValidating(false);
      setInitiatingPayment(true);

      // Proceed to create order
      createOrderMutation.mutate(bookingResponse);
    },
    onError: (error) => {
      toast.error("Error validating booking. Please try again.");
      setValidating(false);
    },
  });

  // Step 2: Create payment order mutation
  const createOrderMutation = useMutation({
    mutationFn: (bookingId: string) => {
      return createBookingOrder(bookingId);
    },
    onSuccess: (orderResponse) => {
      if (!orderResponse?.id) {
        throw new Error("Failed to create payment order");
      }
      setInitiatingPayment(false);
      openRazorpayCheckout(orderResponse);
    },
    onError: (error) => {
      toast.error("Error creating booking order. Please try again.");
      setInitiatingPayment(false);
    },
  });

  // Step 3: Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: ({
      bookingId,
      paymentId,
      orderId,
      signature,
    }: {
      bookingId: string;
      paymentId: string;
      orderId: string;
      signature: string;
    }) => {
      
      return verifyBookingPayment({ bookingId, paymentId, orderId, signature });
    },
    onSuccess: (response) => {
      // Check if verification was successful
      if (
        response &&
        response.message &&
        response.message.includes("verified")
      ) {
        toast.success("🎉 Payment successful! Your slots are booked.");
      } else {
        toast.error("Payment verification failed. Please contact support.");
      }
    },
    onError: (error) => {
      toast.error("Payment verification failed. Please contact support.");
    },
    onSettled: () => {
      setVerifyingPayment(false);
    },
  });

  // Razorpay checkout handler
  const openRazorpayCheckout = (orderData: any) => {

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      toast.error(
        "Payment system not loaded. Please refresh the page and try again."
      );
      setInitiatingPayment(false);
      return;
    }

    const razorpayOptions = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || "", // TODO: Add your Razorpay key
      amount: total * 100, // Amount in paise
      currency: Currency.INR,
      name: venue.name,
      order_id: orderData?.id,

      // Payment success handler
      handler: async function (response: any) {
        setVerifyingPayment(true);

        const verificationPayload = {
          bookingId: bookingId,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };
        verifyPaymentMutation.mutate(verificationPayload);
      },

      // Pre-fill user information
      prefill: {
        name: user?.name || user?.email?.split("@")[0] || "Customer",
        email: userInfo.email || user?.email || "",
        contact: userInfo.mobile || "",
      },

      // Additional booking details
      notes: {
        venue_id: selectedActivity?.venueId || "",
        facility_id: selectedFacility?.id || "",
        activity_id: selectedActivity?.id || "",
        booking_id: bookingId,
        user_id: user?.id || "",
      },

      // UI theme
      theme: {
        color: "#16a34a", // Green color matching your design
      },

      // Payment modal settings
      modal: {
        ondismiss: function () {
          setInitiatingPayment(false);
          setVerifyingPayment(false);
          toast.error("Payment cancelled");
        },
      },
    };

    // Open Razorpay checkout
    const razorpay = new window.Razorpay(razorpayOptions);

    // Handle payment failures
    razorpay.on("payment.failed", function (response: any) {
      toast.error(`Payment failed: ${response.error.description}`);
      setInitiatingPayment(false);
      setVerifyingPayment(false);
    });

    razorpay.open();
  };

  // Load Razorpay script on component mount
  useEffect(() => {
    // Load Razorpay script only if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Only remove if we added it
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  // Main payment initiation handler
  const handleProceed = () => {
    // Validate required fields
    if (!userInfo.email || !userInfo.mobile) {
      toast.error("Please fill in email and mobile number");
      return;
    }

    if (!selectedActivity || !selectedFacility || selectedSlots.length === 0) {
      toast.error(
        "Please select an activity, facility, and at least one slot."
      );
      return;
    }

    // Start the booking flow
    setValidating(true);
    validateBookingMutation.mutate();
  };
  const [userInfo, setUserInfo] = useState({
    email: "",
    mobile: "",
    dob: "",
  });

  const [saveToProfile, setSaveToProfile] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");

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
            {selectedSlots.map((slot: Slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(slot?.date?.toString())}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(slot?.startTime?.toString())}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ₹{slot.amount.toFixed(2)}
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
          onClick={handleProceed}
          disabled={
            selectedSlots.length === 0 ||
            validating ||
            initiatingPayment ||
            verifyingPayment
          }
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {validating ? (
            <span>Validating Booking...</span>
          ) : initiatingPayment ? (
            <span>Opening Payment...</span>
          ) : verifyingPayment ? (
            <span>Verifying Payment...</span>
          ) : (
            <>
              <span>Pay ₹{total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
