import { Star, X, Loader2 } from "lucide-react";
import { Venue } from "../../../types";
import { useState } from "react";

interface EditableVenueCardProps {
  venue: Venue;
  onSave: (updatedVenue: Venue) => void;
  onCancel: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

const EditableVenueCard: React.FC<EditableVenueCardProps> = ({ 
  venue, 
  onSave, 
  onCancel, 
  isOpen,
  isLoading = false 
}) => {
  const [editedVenue, setEditedVenue] = useState<Venue>(venue);

  const handleInputChange = (field: keyof Venue, value: any) => {
    setEditedVenue(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field: keyof typeof venue.location, value: string) => {
    setEditedVenue(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(editedVenue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Edit Venue</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Venue Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={editedVenue.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                maxLength={30}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter venue name (max 30 characters)"
              />
              <p className="text-gray-400 text-xs mt-1">
                {editedVenue.name.length}/30 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Highlight <span className="text-red-400">*</span>
              </label>
              <textarea
                value={editedVenue.highlight || ''}
                onChange={(e) => handleInputChange('highlight', e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief highlight of the venue"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price per Hour (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={editedVenue.start_price_per_hour}
                onChange={(e) => handleInputChange('start_price_per_hour', parseInt(e.target.value))}
                min="0"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price per hour"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Location Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editedVenue.location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  State <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editedVenue.location.state}
                  onChange={(e) => handleLocationChange('state', e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editedVenue.location.country}
                  onChange={(e) => handleLocationChange('country', e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Postal Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editedVenue.location.pincode}
                  onChange={(e) => handleLocationChange('pincode', e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Features</h3>
            <div>
              <textarea
                value={editedVenue.features?.join('\n')}
                onChange={(e) => handleInputChange('features', e.target.value.split('\n').filter(f => f.trim()))}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter features (one per line)"
                rows={4}
              />
              <p className="text-gray-400 text-sm mt-1">Add each feature on a new line</p>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Rating</h3>
            <div className="flex items-center bg-gray-700/50 rounded-lg px-4 py-3">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <input
                type="number"
                value={editedVenue.rating}
                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                className="w-20 bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                min="0"
                max="5"
                step="0.1"
              />
              <span className="text-gray-400 ml-2">/ 5</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableVenueCard;