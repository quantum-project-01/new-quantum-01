import React from "react";
import { ArrowLeft } from "lucide-react";
import { Activity } from "./ActivitySelector";

export interface Facility {
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
  selectedActivity: Activity | null;
  selectedFacility: Facility | null;
  onFacilitySelect: (facility: Facility, selectedActivity: Activity) => void;
  onResetSelection: () => void;
}

const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  facilities,
  selectedActivity,
  selectedFacility,
  onFacilitySelect,
  onResetSelection,
}) => {
  const filteredFacilities = facilities.filter(
    (facility) => facility.activityId === selectedActivity?.id
  );

  if (!selectedActivity) {
    return (
      <div className="space-y-6 bg-white rounded-xl px-8 pt-6 pb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          Choose an facility
        </h3>
        <p className="text-gray-600">
          Please select an activity to view available facilities.
        </p>
      </div>
    );
  }

  if (selectedFacility) {
    return (
      <div className="space-y-6 bg-white rounded-xl p-4 lg:px-8 lg:py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
            Selected Facility
          </h3>
          <button
            onClick={onResetSelection}
            className="flex items-center text-green-600 hover:text-green-700 text-xs lg:text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            Change Facility
          </button>
        </div>

        <div className="flex-shrink-0 w-80 bg-white rounded-2xl border-2 border-green-500 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
          {/* Image Carousel */}
          <div className="relative h-full max-h-36 overflow-hidden rounded-t-2xl">
            <div className="flex transition-transform duration-300 ease-in-out">
              <img
                src={selectedFacility.images[1]}
                alt={`${selectedFacility.name}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            </div>
          </div>

          <div className="p-1 px-3">
            <h4 className="text-lg font-semibold text-gray-900">
              {selectedFacility.name}
            </h4>
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-bold text-gray-900">
                ₹{selectedFacility.minPrice}
              </span>
              <span className="text-sm text-gray-500">onwards</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              {selectedFacility.timeRange}
            </div>
            <div className="text-sm text-blue-600 font-medium mb-2">
              {selectedFacility.availability}
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
    <div className="space-y-3 lg:space-y-6 bg-white rounded-xl p-2 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
          Choose a Facility
        </h3>
        {selectedFacility && (
          <button
            onClick={onResetSelection}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Change Facility
          </button>
        )}
      </div>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            onClick={() => onFacilitySelect(facility, selectedActivity)}
            className="flex-shrink-0 w-80 bg-white rounded-2xl border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
          >
            {/* Image Carousel */}
            <div className="relative h-full max-h-36 overflow-hidden rounded-t-2xl">
              <div className="flex transition-transform duration-300 ease-in-out">
                <img
                  src={facility.images[1]}
                  alt={`${facility.name}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              </div>
            </div>

            <div className="p-1 px-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {facility.name}
              </h4>
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{facility.minPrice}
                </span>
                <span className="text-sm text-gray-500">onwards</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                {facility.timeRange}
              </div>
              <div className="text-sm text-blue-600 font-medium mb-2">
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
