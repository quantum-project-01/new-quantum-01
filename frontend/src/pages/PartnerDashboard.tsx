import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import { PartnerTab } from './partner/types/partnerTypes';
import { partnerMockData } from './partner/data/partnerMockData';
import { Overview, BookingManagement, VenueManagement, Revenue, Settings } from './partner/components';

const PartnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PartnerTab>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'venues', label: 'Venues', icon: MapPin },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const renderContent = () => {
    const props = { selectedPeriod, mockData: partnerMockData };
    
    switch (activeTab) {
      case 'overview':
        return <Overview {...props} />;
      case 'bookings':
        return <BookingManagement {...props} />;
      case 'venues':
        return <VenueManagement {...props} />;
      case 'earnings':
        return <Revenue {...props} />;
      case 'settings':
        return <Settings {...props} />;
      default:
        return <Overview {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Partner Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your venues and track your business performance</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PartnerTab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Period Selector */}
        {(activeTab === 'overview' || activeTab === 'earnings') && (
          <div className="mb-6">
            <div className="flex space-x-2">
              {(['7d', '30d', '90d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {period === '7d' && 'Last 7 Days'}
                  {period === '30d' && 'Last 30 Days'}
                  {period === '90d' && 'Last 90 Days'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default PartnerDashboard; 