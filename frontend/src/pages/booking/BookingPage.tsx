import React, { useState } from "react";
import { Search, Star, MapPin, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllVenue } from "../../services/partner-service/venue-service/venueService";

// Venue type for our dummy data
interface Venue {
  id: number;
  name: string;
  location: { city: string };
  rating: number;
  start_price_per_hour: number;
  offer?: string;
  headline: string;
  images: string[];
}

// Image Carousel Component
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for none
  console.log(direction);
  const nextImage = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setDirection(index > currentImage ? 1 : -1);
    setCurrentImage(index);
  };

  // Reset direction after animation
  React.useEffect(() => {
    const timer = setTimeout(() => setDirection(0), 300);
    return () => clearTimeout(timer);
  }, [currentImage]);

  return (
    <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
      {/* Image Container with Sliding Effect */}
      <div
        className="w-full h-full flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Venue ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
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
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
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
  );
};

// Venue Card Component
const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  const handleCardClick = () => {
    // Placeholder for navigation to venue detail page
    console.log(`Navigating to venue: ${venue.name}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
    >
      {/* Image Carousel */}
      <ImageCarousel images={venue.images} />

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
              {venue.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{venue.location.city}</span>
            </div>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {venue.rating}
          </div>
        </div>

        {/* Headline */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {venue.headline}
        </p>

        {/* Price and Offer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Starting from</span>
            <div className="text-lg font-bold text-gray-900">
              ₹{venue.start_price_per_hour.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/hour</span>
            </div>
          </div>
          {venue.offer && (
            <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
              <Tag className="w-3 h-3 mr-1" />
              {venue.offer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar: React.FC<{
  venueName: string;
  sport: string;
  city: string;
  onVenueNameChange: (value: string) => void;
  onSportChange: (value: string) => void;
  onCityChange: (value: string) => void;
}> = ({
  venueName,
  sport,
  city,
  onVenueNameChange,
  onSportChange,
  onCityChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Find Your Perfect Venue
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Venue Name Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by venue name"
            value={venueName}
            onChange={(e) => onVenueNameChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Sport Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by sport"
            value={sport}
            onChange={(e) => onSportChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* City Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by city"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

// Main BookingPage Component
const BookingPage: React.FC = () => {
  const [venueName, setVenueName] = useState("");
  const [sport, setSport] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const {
    data: venues,
    isLoading,
    error,
  } = useQuery<Venue[]>({
    queryKey: [
      "venues",
      { searchName: venueName, page: 1, limit: 20, city, event: sport },
    ],
    queryFn: () => getAllVenue(venueName, 1, 20, city, sport),
  });

  const venuesList = venues ?? [];

  if (isLoading) {
    return <div>Loading venues...</div>; // ✅ JSX returned
  }

  if (error) {
    return <div>Error loading venues.</div>; // ✅ JSX returned
  }

  if (!venues) {
    return <div>No venues available.</div>; // ✅ JSX returned
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Book Your Sports Venue
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and book the best sports venues in your city. From football
            to tennis, find the perfect place for your game.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          venueName={venueName}
          sport={sport}
          city={city}
          onVenueNameChange={setVenueName}
          onSportChange={setSport}
          onCityChange={setCity}
        />

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Venues
            </h2>
          </div>

          {/* Venue Cards Grid */}
          {venuesList && venuesList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(venuesList || []).map((venue: Venue) => (
                <div
                  onClick={() => {
                    navigate(`/booking/${venue.id}`);
                  }}
                >
                  <VenueCard key={venue.id} venue={venue} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No venues found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria to find more venues.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
