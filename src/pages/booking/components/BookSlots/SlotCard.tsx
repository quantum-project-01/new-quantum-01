import React from "react";
import { Slot } from "./SlotSelector";

interface SlotCardProps {
  slot: Slot;
  isSelected: boolean;
  onClick: () => void;
}

const SlotCard: React.FC<SlotCardProps> = ({
  slot,
  isSelected,
  onClick,
}) => {
  const getStatusStyles = () => {
    switch (slot.slotAvailability) {
      case "available":
        return "bg-green-50 text-green-800 border-green-200 hover:border-green-300";
      case "booked":
        return "bg-red-50 text-red-800 border-red-200";
      case "filling-fast":
        return "bg-yellow-50 text-yellow-800 border-yellow-200 hover:border-yellow-300";
      case "not-available":
        return "bg-gray-50 text-gray-500 border-gray-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = () => {
    switch (slot.slotAvailability) {
      case "available":
        return slot.slotAvailability || "Available";
      case "booked":
        return "Booked";
      case "filling-fast":
        return "Filling Fast";
      case "not-available":
        return "N/A";
      default:
        return "";
    }
  };

  const isClickable = slot.slotAvailability === "available" || slot.slotAvailability === "filling-fast";

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`h-16 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected ? "border-blue-500 bg-blue-50 shadow-md" : getStatusStyles()
      } ${isClickable ? "hover:shadow-md" : "cursor-not-allowed"}`}
    >
      <div className="h-full flex flex-col items-center justify-center text-xs p-1">
        <div className="font-semibold text-sm">₹{slot.slotAmount}</div>
        <div className="text-xs opacity-75 mt-1">{getStatusText()}</div>
      </div>
    </div>
  );
};

export default SlotCard;
