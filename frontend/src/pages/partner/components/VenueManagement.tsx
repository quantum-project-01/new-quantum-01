import React from 'react';
import { Plus, MapPin, Star, Edit, Eye } from 'lucide-react';
import { PartnerComponentProps } from '../types/partnerTypes';
import { getStatusColor, getStatusIcon } from '../utils/statusUtils';

const VenueManagement: React.FC<PartnerComponentProps> = ({ mockData }) => {
  const { venues } = mockData;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Venue Management</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Venue</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {venues.map((venue) => {
            const StatusIcon = getStatusIcon(venue.status);
            return (
              <div key={venue.id} className="bg-gray-700 border border-gray-600 rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-600 relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(venue.status)}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="capitalize">{venue.status}</span>
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">{venue.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {venue.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-400">Sport:</span>
                      <p className="font-medium text-white">{venue.sport}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Price/Hour:</span>
                      <p className="font-medium text-white">₹{venue.pricePerHour}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-white">{venue.rating}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Bookings:</span>
                      <p className="font-medium text-white">{venue.totalBookings}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VenueManagement; 