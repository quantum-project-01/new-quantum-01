import React, { useState } from "react";
import DateFilter from "./DateFilter";
import SlotCard from "./SlotCard";

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  price: number;
  status: "available" | "booked" | "filling-fast" | "not-available";
  facilityId: string;
  availability?: string;
}

interface SlotSelectorProps {
  selectedFacility: any;
  selectedSlots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  selectedFacility,
  selectedSlots,
  onSlotSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");

  if (!selectedFacility) return null;

  // Generate time slots for the next 4 days
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const times = [
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30",
    ];

    for (let day = 0; day < 4; day++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + day);

      times.forEach((time, index) => {
        const isToday = day === 0;
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const slotHour = Math.floor(index / 2);
        const slotMinute = (index % 2) * 30;

        let status: TimeSlot["status"] = "available";
        if (
          isToday &&
          (slotHour < currentHour ||
            (slotHour === currentHour && slotMinute <= currentMinute))
        ) {
          status = "not-available";
        } else if (Math.random() < 0.3) {
          status = "booked";
        } else if (Math.random() < 0.2) {
          status = "filling-fast";
        }

        const availability =
          status === "available"
            ? `${Math.floor(Math.random() * 5) + 1} left`
            : undefined;

        slots.push({
          id: `slot-${day}-${index}`,
          time,
          date: date.toISOString().split("T")[0],
          price: selectedFacility.minPrice + Math.floor(Math.random() * 200),
          status,
          facilityId: selectedFacility.id,
          availability,
        });
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const filteredSlots = timeSlots.filter((slot) => {
    if (filter === "all") return true;
    return slot.status === filter;
  });

  const timeLabels = [
    "12 AM",
    "12:30 AM",
    "1 AM",
    "1:30 AM",
    "2 AM",
    "2:30 AM",
    "3 AM",
    "3:30 AM",
    "4 AM",
    "4:30 AM",
    "5 AM",
    "5:30 AM",
    "6 AM",
    "6:30 AM",
    "7 AM",
    "7:30 AM",
    "8 AM",
    "8:30 AM",
    "9 AM",
    "9:30 AM",
    "10 AM",
    "10:30 AM",
    "11 AM",
    "11:30 AM",
    "12 PM",
    "12:30 PM",
    "1 PM",
    "1:30 PM",
    "2 PM",
    "2:30 PM",
    "3 PM",
    "3:30 PM",
    "4 PM",
    "4:30 PM",
    "5 PM",
    "5:30 PM",
    "6 PM",
    "6:30 PM",
    "7 PM",
    "7:30 PM",
    "8 PM",
    "8:30 PM",
    "9 PM",
    "9:30 PM",
    "10 PM",
    "10:30 PM",
    "11 PM",
    "11:30 PM",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          Select Time Slot
        </h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Change Facility
        </button>
      </div>

      <DateFilter
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Time Slot Grid */}
      <div className="grid grid-cols-5 gap-2">
        {/* Time Labels */}
        <div className="space-y-2">
          {timeLabels.map((label, index) => (
            <div
              key={index}
              className="h-16 flex items-center text-sm text-gray-600 font-medium px-2"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Date Columns */}
        {Array.from({ length: 4 }, (_, dayIndex) => (
          <div key={dayIndex} className="space-y-2">
            {filteredSlots
              .filter((_, index) => index % 4 === dayIndex)
              .map((slot) => (
                <SlotCard
                  key={slot.id}
                  time={slot.time}
                  price={slot.price}
                  status={slot.status}
                  isSelected={selectedSlots.some((s) => s.id === slot.id)}
                  onClick={() => onSlotSelect(slot)}
                  availability={slot.availability}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotSelector;
