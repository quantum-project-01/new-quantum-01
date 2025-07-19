import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateFilterProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  selectedDate,
  onDateChange,
  filter,
  onFilterChange,
}) => {
  const filters = [
    { key: "all", label: "All", color: "bg-gray-100 text-gray-700" },
    {
      key: "available",
      label: "Available",
      color: "bg-green-100 text-green-700",
    },
    { key: "booked", label: "Booked", color: "bg-red-100 text-red-700" },
    {
      key: "filling-fast",
      label: "Filling Fast",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      key: "not-available",
      label: "Not Available",
      color: "bg-gray-100 text-gray-500",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between lg:px-4">
        {/* Date Picker Field */}
        <div className="flex items-center">
          <input
            id="date-picker"
            type="date"
            className="px-1 lg:px-3 py-2 w-5/6 lg:w-full text-xs lg:text-base rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              if (!isNaN(newDate.getTime())) {
                onDateChange(newDate);
              }
            }}
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg pl-2">
          <div className="px-1 lg:px-3 py-2 border-r border-gray-300 text-xs lg:text-base">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <button
            className="flex items-center justify-center h-full text-gray-500 border-r border-gray-300 hover:bg-gray-100 transition"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() - 1);
              if (newDate < new Date()) {
                onDateChange(new Date());
              } else {
                onDateChange(newDate);
              }
            }}
          >
            <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
          <button
            className="flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 text-gray-500 hover:bg-gray-100 transition"
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() + 1);
              onDateChange(newDate);
            }}
          >
            <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
        </div>
      </div>
      <div className="flex space-x-2">
          {filters.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`px-2 lg:px-4 py-1 lg:py-3 rounded-xl text-[10px] lg:text-sm overflow-x-auto font-medium whitespace-nowrap transition-all ${
                filter === key
                  ? "bg-blue-600 text-white shadow-md"
                  : `${color} hover:opacity-80`
              }`}
            >
              {label}
            </button>
          ))}
        </div>
    </div>
  );
};

export default DateFilter;
