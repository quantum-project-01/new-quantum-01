import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  activityId: string;
  minPrice: number;
  timeRange: string;
  images: string[];
  availability: string;
}

interface FacilitySelectorProps {
  facilities: Facility[];
  selectedActivity: string | null;
  selectedFacility: Facility | null;
  onFacilitySelect: (facility: Facility) => void;
  onResetSelection: () => void;
}

const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  facilities,
  selectedActivity,
  selectedFacility,
  onFacilitySelect,
  onResetSelection,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredFacilities = facilities.filter(
    (facility) => facility.activityId === selectedActivity
  );

  if (!selectedActivity) return null;

  // If a facility is selected, show only that card
  if (selectedFacility) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Selected Facility
          </h3>
          <button
            onClick={onResetSelection}
            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Change Facility
          </button>
        </div>

        <div className="w-80 bg-white rounded-2xl border-2 border-blue-500 shadow-lg">
          {/* Image Carousel */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {selectedFacility.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedFacility.name} ${index + 1}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>

            {/* Navigation Dots */}
            {selectedFacility.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedFacility.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedFacility.name}
            </h4>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-gray-900">
                ₹{selectedFacility.minPrice}
              </span>
              <span className="text-sm text-gray-500">onwards</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {selectedFacility.timeRange}
            </div>
            <div className="text-sm text-green-600 font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Selected
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Choose Facility</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Change Activity
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            onClick={() => onFacilitySelect(facility)}
            className="flex-shrink-0 w-80 bg-white rounded-2xl border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300"
          >
            {/* Image Carousel */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {facility.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${facility.name} ${index + 1}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              {facility.images.length > 1 && (
                <>
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {facility.name}
              </h4>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{facility.minPrice}
                </span>
                <span className="text-sm text-gray-500">onwards</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {facility.timeRange}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                {facility.availability}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitySelector;
