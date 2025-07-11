import React, { useState, useEffect } from "react";
import DateFilter from "./DateFilter";
import SlotCard from "./SlotCard";
import { Sun, Moon } from "lucide-react";
import { Activity } from "./ActivitySelector";
import { Facility } from "./FacilitySelector";

export type SlotAvailability =
  | "available"
  | "not-available"
  | "booked"
  | "filling-fast";

export interface Slot {
  slotId: number;
  slotDate: string;
  slotAmount: number;
  slotAvailability: SlotAvailability;
  slotTime: string;
}

export interface SlotDataByDate {
  [date: string]: Slot[];
}

interface SlotSelectorProps {
  selectedFacility: Facility | null;
  selectedActivity: Activity | null;
  selectedSlots: Slot[];
  slotData: SlotDataByDate;
  onSlotSelect: (slot: Slot) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  selectedActivity,
  selectedFacility,
  selectedSlots,
  slotData,
  onSlotSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!selectedFacility || !selectedActivity) {
    return (
      <div className="space-y-6 bg-white rounded-xl px-8 pt-6 pb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          Select Time Slot
        </h3>
        <p className="text-gray-600">
          Please select a facility to view available slots.
        </p>
      </div>
    );
  }

  // Generate timeLabels from the first available date in slotData
  const firstDateWithSlots = Object.keys(slotData).find(
    (date) => slotData[date] && slotData[date].length > 0
  );
  const timeLabels = firstDateWithSlots
    ? slotData[firstDateWithSlots].map((slot) => slot.slotTime)
    : [];

  // Prepare the visible dates for the grid (3 for mobile, 4 for desktop)
  const numVisibleDates = isMobile ? 3 : 4;
  const visibleDates = Array.from({ length: numVisibleDates }, (_, i) => {
    const dateObj = new Date(selectedDate);
    dateObj.setDate(selectedDate.getDate() + i);
    return dateObj.toISOString().split("T")[0];
  });

  return (
    <div className="bg-white rounded-xl py-6">
      <div className="flex items-center justify-between mb-6 px-2 lg:px-8">
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
          Select Time Slot
        </h3>
      </div>

      <div className="px-2 xl:px-8">
        <DateFilter
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Date Headers Row (outside scrollable area) */}
        <div
          className={`grid gap-2 p-2 xl:p-5 border-t border-x border-gray-300 rounded-t-xl bg-gray-100 mt-5`}
          style={{ gridTemplateColumns: `1fr repeat(${numVisibleDates}, 1fr)` }}
        >
          {/* Empty cell for time labels */}
          <div className="flex flex-col items-center justify-center text-center text-sm lg:text-xl">
            Timings
          </div>
          {/* Date headers */}
          {visibleDates.map((dateStr, dayIndex) => {
            const dateObj = new Date(dateStr);
            const dayNum = dateObj.getDate().toString().padStart(2, "0");
            const weekday = dateObj.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const month = dateObj.toLocaleDateString("en-US", {
              month: "short",
            });
            return (
              <div
                className="flex flex-col items-center justify-center text-center"
                key={dayIndex}
              >
                <span className="text-md lg:text-2xl font-bold text-gray-900">
                  {dayNum}
                </span>
                <div className="flex flex-row items-center justify-center gap-1">
                  <span className="text-xs lg:text-base text-gray-700">
                    {weekday}
                  </span>
                  <span className="text-xs lg:text-base text-gray-500">
                    {month}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Time Slot Grid (Scrollable) */}
        <div className="h-[400px] overflow-y-auto scrollbar-hide border border-gray-300 rounded-b-xl">
          <div
            className={`grid gap-2 p-2 xl:p-5`}
            style={{
              gridTemplateColumns: `1fr repeat(${numVisibleDates}, 1fr)`,
            }}
          >
            {/* Time Labels */}
            <div className="flex flex-col justify-center text-center gap-2">
              {timeLabels.map((label, rowIdx) => {
                // Determine if this is a day or night slot (6 AM = 12, 6 PM = 36)
                const isDay = rowIdx >= 12 && rowIdx < 36;
                return (
                  <div
                    key={rowIdx}
                    className={`h-full flex justify-center items-center text-center text-[10px] lg:text-sm font-medium pl-2 gap-1 border-r border-gray-400 ${
                      isDay
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    <span className="block lg:hidden">{label.slice(0, 5)}</span>
                    <span className="hidden lg:block">{label}</span>
                    {isDay ? (
                      <Sun className="w-3 h-3 lg:w-4 lg:h-4 inline-block ml-1 text-yellow-400" />
                    ) : (
                      <Moon className="w-3 h-3 lg:w-4 lg:h-4 inline-block ml-1 text-blue-400" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Date Columns: Render by row for perfect alignment */}
            {visibleDates.map((dateStr, dayIndex) => (
              <div
                className="flex flex-col h-full space-y-3 min-h-0 scrollbar-hide"
                key={dateStr}
              >
                {timeLabels.map((_, rowIdx) => {
                  const slotsForDate = slotData[dateStr] || [];
                  const slot = slotsForDate[rowIdx];
                  const matchesFilter =
                    filter === "all" ||
                    (slot && slot.slotAvailability === filter);
                  return slot && matchesFilter ? (
                    <SlotCard
                      key={slot.slotId + "-" + slot.slotDate}
                      slot={slot}
                      isSelected={selectedSlots.some(
                        (selectedSlot) => selectedSlot.slotId === slot.slotId
                      )}
                      onClick={() => onSlotSelect(slot)}
                    />
                  ) : (
                    <div
                      key={`not-available-${dateStr}-${rowIdx}`}
                      className="h-16 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg border border-gray-200 text-sm font-semibold"
                    >
                      N/A
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotSelector;
