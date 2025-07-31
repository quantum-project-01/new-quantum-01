import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivitySelector, { Activity } from "./BookSlots/ActivitySelector";
import FacilitySelector, { Facility } from "./BookSlots/FacilitySelector";
import SlotSelector, {
  Slot
} from "./BookSlots/SlotSelector";
import CheckoutCard from "./BookSlots/CheckoutCard";


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

  const handleFacilitySelect = (activity: Activity | null, facility: Facility) => {
    setSelectedActivity(activity);
    setSelectedFacility(facility);
    setSelectedSlots([]);
  };

  const handleFacilityReset = () => {
    setSelectedFacility(null);
    setSelectedSlots([]);
  };

  const handleSlotSelect = (slot: Slot) => {
    const isSelected = selectedSlots.some((s) => s.id === slot.id);
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s.id !== slot.id));
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
          venueId={venueId || ""}
          selectedActivity={selectedActivity}
          onActivitySelect={handleActivitySelect}
          onResetSelection={handleActivityReset}
        />

        <FacilitySelector
          selectedActivity={selectedActivity}
          selectedFacility={selectedFacility}
          onFacilitySelect={(facility, activity) =>
            handleFacilitySelect(activity, facility)
          }
          onResetSelection={handleFacilityReset}
        />

        <SlotSelector
          selectedActivity={selectedActivity}
          selectedFacility={selectedFacility}
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
