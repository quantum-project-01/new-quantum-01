import React, { useState } from "react";
import ActivitySelector from "./ActivitySelector";
import FacilitySelector from "./FacilitySelector";
import SlotSelector, { Slot } from "./SlotSelector";
import CheckoutCard from "./CheckoutCard";

// Types
interface Activity {
  id: string;
  name: string;
  minPrice: number;
  features: string[];
}

interface Facility {
  id: string;
  name: string;
  activityId: string;
  minPrice: number;
  timeRange: string;
  images: string[];
  availability: string;
}

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  price: number;
  status: "available" | "booked" | "filling-fast" | "not-available";
  facilityId: string;
  availability?: string;
}

// Dummy data
const activities: Activity[] = [
  {
    id: "football",
    name: "Football",
    minPrice: 399,
    features: ["Outdoor", "Equipment Required", "Professional Turf"],
  },
  {
    id: "cricket",
    name: "Cricket",
    minPrice: 599,
    features: ["Outdoor", "Pitch Available", "Floodlights"],
  },
  {
    id: "tennis",
    name: "Tennis",
    minPrice: 499,
    features: ["Indoor", "AC Available", "Professional Court"],
  },
  {
    id: "basketball",
    name: "Basketball",
    minPrice: 299,
    features: ["Indoor", "Multiple Courts", "Equipment Provided"],
  },
];

const facilities: Facility[] = [
  {
    id: "court-1",
    name: "Court 1",
    activityId: "football",
    minPrice: 399,
    timeRange: "06:00 AM – 02:00 AM",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    ],
    availability: "Available",
  },
  {
    id: "court-2",
    name: "Court 2",
    activityId: "football",
    minPrice: 449,
    timeRange: "06:00 AM – 02:00 AM",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
    ],
    availability: "Filling Fast",
  },
  {
    id: "cricket-ground",
    name: "Cricket Ground",
    activityId: "cricket",
    minPrice: 599,
    timeRange: "06:00 AM – 02:00 AM",
    images: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    availability: "Available",
  },
  {
    id: "tennis-court",
    name: "Tennis Court",
    activityId: "tennis",
    minPrice: 499,
    timeRange: "06:00 AM – 02:00 AM",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    ],
    availability: "Available",
  },
];

const BookSlots: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setSelectedFacility(null);
    setSelectedSlots([]);
  };

  const handleActivityReset = () => {
    setSelectedActivity(null);
    setSelectedFacility(null);
    setSelectedSlots([]);
  };

  const handleFacilitySelect = (activity: Activity, facility: Facility) => {
    setSelectedActivity(activity);
    setSelectedFacility(facility);
    setSelectedSlots([]);
  };

  const handleFacilityReset = () => {
    setSelectedFacility(null);
    setSelectedSlots([]);
  };

  const handleSlotSelect = (slot: Slot) => {
    const isSelected = selectedSlots.some((s) => s.slotId === slot.slotId);
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s.slotId !== slot.slotId));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleProceed = () => {
    console.log("Proceeding with booking:", {
      activity: selectedActivity,
      facility: selectedFacility,
      slots: selectedSlots,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
      {/* Left Section - Booking Steps */}
      <div className="lg:col-span-2 space-y-8 px-4">
        <ActivitySelector
          activities={activities}
          selectedActivity={selectedActivity}
          onActivitySelect={handleActivitySelect}
          onResetSelection={handleActivityReset}
        />

        <FacilitySelector
          facilities={facilities}
          selectedActivity={selectedActivity || null}
          selectedFacility={selectedFacility}
          onFacilitySelect={(facility, selectedActivity) =>
            handleFacilitySelect(selectedActivity, facility)
          }
          onResetSelection={handleFacilityReset}
        />

        <SlotSelector
          selectedActivity={selectedActivity}
          selectedFacility={selectedFacility}
          selectedSlots={selectedSlots}
          onSlotSelect={handleSlotSelect}
        />
      </div>

      {/* Right Section - Checkout Card */}
      <div className="lg:col-span-1">
        <CheckoutCard
          selectedActivity={selectedActivity}
          selectedFacility={selectedFacility}
          selectedSlots={selectedSlots}
          onProceed={handleProceed}
        />
      </div>
    </div>
  );
};

export default BookSlots;
