import React, { useState } from 'react';
import { Save, User, Bell, Shield, CreditCard, MapPin, Phone, Mail } from 'lucide-react';
import { PartnerComponentProps } from '../types/partnerTypes';

const Settings: React.FC<PartnerComponentProps> = ({ mockData }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Business Name
          </label>
          <input
            type="text"
            defaultValue="Elite Sports Academy"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Owner Name
          </label>
          <input
            type="text"
            defaultValue="Rajesh Kumar"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Mail className="inline h-4 w-4 mr-1" />
            Email Address
          </label>
          <input
            type="email"
            defaultValue="rajesh@elitesports.com"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Phone className="inline h-4 w-4 mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue="+91 98765 43210"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <MapPin className="inline h-4 w-4 mr-1" />
          Business Address
        </label>
        <textarea
          defaultValue="Sector 21, Near City Mall, Gurgaon, Haryana - 122001"
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Business Description
        </label>
        <textarea
          defaultValue="Premium sports facilities offering world-class amenities for cricket, football, tennis, and more. We provide top-notch equipment and professional coaching services."
          rows={4}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-white">New Bookings</h4>
            <p className="text-sm text-gray-400">Get notified when someone books your venue</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-white">Payment Confirmations</h4>
            <p className="text-sm text-gray-400">Receive alerts for successful payments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-white">Cancellations</h4>
            <p className="text-sm text-gray-400">Get notified about booking cancellations</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div>
            <h4 className="font-medium text-white">Monthly Reports</h4>
            <p className="text-sm text-gray-400">Receive monthly performance reports</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="font-medium text-white mb-2">Two-Factor Authentication</h4>
        <p className="text-sm text-gray-400 mb-4">
          Add an extra layer of security to your account
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 p-6 rounded-lg">
        <h4 className="font-medium text-white mb-4">Payment Method</h4>
        <div className="flex items-center space-x-4 p-4 bg-gray-600 rounded-lg">
          <div className="bg-blue-600 p-2 rounded">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-white">•••• •••• •••• 4532</p>
            <p className="text-sm text-gray-400">Expires 12/25</p>
          </div>
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            Update
          </button>
        </div>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg">
        <h4 className="font-medium text-white mb-4">Billing Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Billing Name
            </label>
            <input
              type="text"
              defaultValue="Elite Sports Academy"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GST Number
            </label>
            <input
              type="text"
              defaultValue="07AABCU9603R1ZX"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-6 rounded-lg">
        <h4 className="font-medium text-white mb-4">Commission Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Current Commission Rate</span>
            <span className="text-white font-medium">15%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Next Payout Date</span>
            <span className="text-white font-medium">Jan 31, 2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Pending Amount</span>
            <span className="text-white font-medium">₹12,500</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Account Settings</h3>
        </div>
        
        <div className="flex border-b border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'billing' && renderBillingSettings()}
        </div>

        <div className="p-6 border-t border-gray-700">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 