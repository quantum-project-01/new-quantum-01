import React, { useState } from "react";
import { ArrowLeft, Settings, Calendar, Users } from "lucide-react";
import { Venue } from "../../../../types";
import ActivityManagement from "./ActivityManagement";
import FacilityManagement from "./FacilityManagement";
import SlotManagement from "./SlotManagement";

interface VenueDetailsManagementProps {
  venue: Venue;
  onBack: () => void;
}

type TabType = 'activities' | 'facilities' | 'slots';

const VenueDetailsManagement: React.FC<VenueDetailsManagementProps> = ({
  venue,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('activities');

  const tabs = [
    {
      id: 'activities' as TabType,
      name: 'Activities',
      icon: Users,
      description: 'Manage sports and activities available at your venue'
    },
    {
      id: 'facilities' as TabType,
      name: 'Facilities',
      icon: Settings,
      description: 'Configure courts, fields, and facility details'
    },
    {
      id: 'slots' as TabType,
      name: 'Time Slots',
      icon: Calendar,
      description: 'Set up booking time slots and availability'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'activities':
        return <ActivityManagement venue={venue} />;
      case 'facilities':
        return <FacilityManagement venue={venue} />;
      case 'slots':
        return <SlotManagement venue={venue} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Venues
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{venue.name}</h1>
                <p className="text-gray-400 text-sm">
                  {venue.location?.city}, {venue.location?.state}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Starting Price</div>
              <div className="text-xl font-bold text-white">
                ₹{venue.start_price_per_hour}/hour
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Description */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="px-6 py-3">
          <p className="text-gray-400 text-sm">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VenueDetailsManagement;