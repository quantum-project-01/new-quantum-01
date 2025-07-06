import React, { useState } from "react";
import {
  MapPin,
  Star,
  Heart,
  Bookmark,
  Share2,
  Calendar,
  Award,
} from "lucide-react";

// Types
interface VenueDetailsData {
  id: number;
  name: string;
  tagline: string;
  address: string;
  city: string;
  rating: number;
  totalReviews: number;
  images: string[];
  videoUrl?: string;
  features: string[];
  description: string;
  pricePerHour: number;
  capacity: number;
  sports: string[];
}

// Dummy venue data
const venueData: VenueDetailsData = {
  id: 1,
  name: "Sunset Arena",
  tagline: "Premium turf in the heart of Mumbai",
  address: "123 Sports Complex, Andheri West",
  city: "Mumbai",
  rating: 4.5,
  totalReviews: 128,
  images: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop",
  ],
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  features: [
    "Floodlights",
    "CCTV",
    "Shower Rooms",
    "Parking",
    "WiFi",
    "Equipment Rental",
  ],
  description:
    "Experience the best football turf in Mumbai with professional-grade facilities. Our venue features premium artificial grass, floodlights for evening games, and all amenities you need for a perfect game.",
  pricePerHour: 500,
  capacity: 22,
  sports: ["Football", "Cricket", "Tennis"],
};

// Venue Media Component
const VenueMedia: React.FC<{ venue: VenueDetailsData }> = ({ venue }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Combine video first, then images into one array
  const mediaItems = [
    ...(venue.videoUrl
      ? [{ type: "video", src: venue.videoUrl, id: "video" }]
      : []),
    ...venue.images.map((image, index) => ({
      type: "image",
      src: image,
      id: index,
    })),
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="space-y-4">
      {/* Media Carousel */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl">
        {/* Media Container with Sliding Effect */}
        <div
          className="w-full h-full flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {mediaItems.map((item, index) => (
            <div key={item.id} className="w-full h-full flex-shrink-0">
              {item.type === "image" ? (
                <>
                  <img
                    src={item.src}
                    alt={`${venue.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-900">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover filter brightness-125"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    key={item.id}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Venue Details Component
const VenueDetails: React.FC<{ venue: VenueDetailsData }> = ({ venue }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: venue.tagline,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const openMaps = () => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
      venue.address + ", " + venue.city
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {venue.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{venue.tagline}</p>
        </div>
        <div className="flex flex-col items-center space-x-2">
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(venue.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div>
            <span className="text-gray-600 font-medium">{venue.rating}</span>
            <span className="text-gray-500">
              ({venue.totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-gray-700">{venue.address}</p>
          <p className="text-gray-600">{venue.city}</p>
          <button
            onClick={openMaps}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 transition-colors duration-200"
          >
            View on Maps →
          </button>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Features</h3>
        <div className="flex flex-wrap gap-2">
          {venue.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <div className="text-2xl font-bold text-gray-900">
              ₹{venue.pricePerHour.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/hour</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Capacity</div>
            <div className="font-semibold text-gray-900">
              {venue.capacity} players
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border transition-all duration-200 ${
            isLiked
              ? "bg-red-50 border-red-200 text-red-600"
              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span className="font-medium">Like</span>
        </button>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border transition-all duration-200 ${
            isSaved
              ? "bg-blue-50 border-blue-200 text-blue-600"
              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          <span className="font-medium">Save</span>
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-300 transition-all duration-200"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

// Tab Component
const Tab: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 text-2xl py-2 font-bold transition-all duration-200 ${
      isActive
        ? "text-green-500 border-b-2 border-green-500"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

// Book Slots Tab Component
const BookSlots: React.FC = () => {
  // Import the BookSlots component from the components folder
  const BookSlotsComponent = React.lazy(() => import("./components/BookSlots"));

  return (
    <React.Suspense
      fallback={
        <div className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Booking System...
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Please wait while we load the booking interface.
            </p>
          </div>
        </div>
      }
    >
      <BookSlotsComponent />
    </React.Suspense>
  );
};

// Membership Plans Tab Component
const MembershipPlans: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center py-12">
      <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Membership Plans
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Explore our membership plans for exclusive benefits and discounts. Plans
        will be displayed here.
      </p>
    </div>
  </div>
);

// Details Tab Component
const Details: React.FC<{ venue: VenueDetailsData }> = ({ venue }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        About this venue
      </h3>
      <p className="text-gray-700 leading-relaxed">{venue.description}</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Sports Available</h4>
        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full"
            >
              {sport}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Amenities</h4>
        <div className="space-y-2">
          {venue.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-gray-700"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Venue Info Tabs Component
const VenueInfoTabs: React.FC<{ venue: VenueDetailsData }> = ({ venue }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "Book Slots", component: <BookSlots /> },
    { id: 1, name: "Membership Plans", component: <MembershipPlans /> },
    { id: 2, name: "Details", component: <Details venue={venue} /> },
  ];

  return (
    <div className="bg-gray-200">
      {/* Tab Headers */}
      <div className="bg-white border-b border-gray-400 px-8">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </Tab>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">{tabs[activeTab].component}</div>
    </div>
  );
};

// Main VenueDetailsPage Component
const VenueDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="py-8 mt-24">
        {/* Top Section - Venue Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 px-8 lg:px-20">
          {/* Left Side - Media Area */}
          <div>
            <VenueMedia venue={venueData} />
          </div>

          {/* Right Side - Venue Info Area */}
          <div className="flex flex-col justify-center">
            <VenueDetails venue={venueData} />
          </div>
        </div>
        <div className="bg-white-50 rounded-xl">
          <VenueInfoTabs venue={venueData} />
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
