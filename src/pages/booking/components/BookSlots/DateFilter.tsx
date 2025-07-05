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

  const generateDateButtons = () => {
    const buttons = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      const isToday = i === 0;

      buttons.push(
        <button
          key={i}
          onClick={() => onDateChange(date)}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            isToday
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="space-y-4">
      {/* Date Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() - 1);
            onDateChange(newDate);
          }}
          className="p-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {generateDateButtons()}
        </div>

        <button
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() + 1);
            onDateChange(newDate);
          }}
          className="p-2 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {filters.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
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
