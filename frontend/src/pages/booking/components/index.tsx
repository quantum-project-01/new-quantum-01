import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivitySelector from "./BookSlots/ActivitySelector";
import FacilitySelector from "./BookSlots/FacilitySelector";
import SlotSelector, {
  Slot,
  SlotAvailability,
  SlotDataByDate,
} from "./BookSlots/SlotSelector";
import CheckoutCard from "./BookSlots/CheckoutCard";

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

function generateSlotDataForNext10Days(): SlotDataByDate {
  const availabilityOptions: SlotAvailability[] = [
    "available",
    "not-available",
    "booked",
    "filling-fast",
  ];

  const data: SlotDataByDate = {};
  const today = new Date();
  let globalSlotId = 1; // unique slotId counter

  for (let d = 0; d < 10; d++) {
    const dateObj = new Date(today);
    dateObj.setDate(today.getDate() + d);
    const dateStr = dateObj.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const slots: Slot[] = [];

    for (let i = 0; i < 48; i++) {
      const hour = Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      const startTime = `${String(hour).padStart(2, "0")}:${minute}`;
      const endHour = i % 2 === 0 ? hour : (hour + 1) % 24;
      const endMinute = i % 2 === 0 ? "30" : "00";
      const endTime = `${String(endHour).padStart(2, "0")}:${endMinute}`;

      const slot: Slot = {
        slotId: globalSlotId++,
        slotDate: dateStr,
        slotAmount: Math.floor(Math.random() * 400) + 100,
        slotAvailability:
          availabilityOptions[
            Math.floor(Math.random() * availabilityOptions.length)
          ],
        slotTime: `${startTime} - ${endTime}`,
      };

      slots.push(slot);
    }

    data[dateStr] = slots;
  }

  return data;
}

const slotData = generateSlotDataForNext10Days();

console.log(slotData);

const BookSlots: React.FC = () => {
  const navigate = useNavigate();
  const { venueId } = useParams(); // Get the venue ID from the URL

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
    // Navigate to checkout page with selected booking details
    if (selectedActivity && selectedFacility && selectedSlots.length > 0) {
      navigate(`/booking/${venueId}/checkout`, {
        state: {
          activity: selectedActivity,
          facility: selectedFacility,
          slots: selectedSlots,
        },
      });
    } else {
      // Optional: Show an error or alert
      alert("Please select an activity, facility, and at least one slot.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
      {/* Left Section - Booking Steps */}
      <div className="lg:col-span-2 space-y-8 xl:px-4">
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
          slotData={slotData}
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
