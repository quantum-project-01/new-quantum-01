import { MapPin, Star, Save, X } from "lucide-react";
import { Venue } from "../../../types";
import ImageCarousel from "./ImageCaraousal";
import { useState } from "react";

interface EditableVenueCardProps {
  venue: Venue;
  onSave: (updatedVenue: Venue) => void;
  onCancel: () => void;
}

const EditableVenueCard: React.FC<EditableVenueCardProps> = ({ venue, onSave, onCancel }) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Image Carousel */}
      <ImageCarousel images={editedVenue.images || []} />
      
      {/* Card Content */}
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <input
              type="text"
              value={editedVenue.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-lg sm:text-xl font-bold text-gray-900 mb-1 w-full border rounded px-2 py-1"
              placeholder="Venue Name"
            />
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <input
                type="text"
                value={editedVenue.location.city}
                onChange={(e) => handleLocationChange('city', e.target.value)}
                className="border rounded px-2 py-1"
                placeholder="City"
              />
            </div>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3 mr-1 fill-current" />
            <input
              type="number"
              value={editedVenue.rating}
              onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
              className="w-12 bg-transparent"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
        </div>

        {/* Headline */}
        <textarea
          value={editedVenue.highlight || ''}
          onChange={(e) => handleInputChange('highlight', e.target.value)}
          className="text-gray-700 text-sm mb-4 w-full border rounded px-2 py-1"
          placeholder="Venue Highlight"
          rows={2}
        />

        {/* Price and Features */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Starting from</span>
            <div className="text-lg font-bold text-gray-900">
              ₹
              <input
                type="number"
                value={editedVenue.start_price_per_hour}
                onChange={(e) => handleInputChange('start_price_per_hour', parseInt(e.target.value))}
                className="w-24 border rounded px-2 py-1"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Features:</label>
          <textarea
            value={editedVenue.features?.join('\n')}
            onChange={(e) => handleInputChange('features', e.target.value.split('\n').filter(f => f.trim()))}
            className="w-full border rounded px-2 py-1 mt-1"
            placeholder="Enter features (one per line)"
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-50 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center"
          >
            <Save className="w-4 h-4 mr-1" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableVenueCard;