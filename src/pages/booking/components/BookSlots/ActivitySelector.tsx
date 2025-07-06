import React from "react";
import { ArrowLeft } from "lucide-react";

export interface Activity {
  id: string;
  name: string;
  minPrice: number;
  features: string[];
}

interface ActivitySelectorProps {
  activities: Activity[];
  selectedActivity: Activity | null;
  onActivitySelect: (activity: Activity) => void;
  onResetSelection: () => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  activities,
  selectedActivity,
  onActivitySelect,
  onResetSelection,
}) => {
  // If an activity is selected, show only that card with a change button
  if (selectedActivity) {
    return (
      <div className="space-y-6 bg-white rounded-xl px-8 pt-6 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">
            Selected Activity
          </h3>
          <button
            onClick={onResetSelection}
            className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Change Activity
          </button>
        </div>

        <div className="w-full max-w-80 bg-white rounded-2xl border-2 border-green-500 shadow-lg">
          <div className="p-3">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              {selectedActivity.name}
            </h4>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-gray-900">
                ₹{selectedActivity.minPrice}
              </span>
              <span className="text-sm text-gray-500">onwards</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedActivity.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full"
                >
                  {feature}
                </span>
              ))}
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

  // Show all activities in a horizontal scrollable layout
  return (
    <div className="space-y-6 bg-white rounded-xl px-8 pt-6 pb-2">
      <h3 className="text-2xl font-semibold text-gray-900 ">
        Choose an Activity
      </h3>
      <div className="flex space-x-4 overflow-x-auto p-4 scrollbar-hide">
        {activities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => onActivitySelect(activity)}
            className="flex-shrink-0 w-full max-w-80 bg-white rounded-2xl border-2 border-green-500 cursor-pointer transition-all duration-300 
            hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="flex flex-col p-3 h-full">
              <h4 className="text-lg font-semibold text-gray-900">
                {activity.name}
              </h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{activity.minPrice}
                </span>
                <span className="text-sm text-gray-500">onwards</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {activity.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-auto align-bottom justify-end text-end">
                <button className="w-full py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySelector;
