import { MapPin, Star} from "lucide-react";
import { Venue } from "../../../types";
import ImageCarousel from "./ImageCaraousal";

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  
    return (
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
      >
        {/* Image Carousel */}
        <ImageCarousel images={venue.images || []} />
        {/* Card Content */}
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl max-w-[200px] font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                {venue.name}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{venue.location.city}</span>
              </div>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {venue.rating}
            </div>
          </div>
  
          {/* Headline */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {venue.highlight}
          </p>
  
          {/* Price and Offer */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">Starting from</span>
              <div className="text-lg font-bold text-gray-900">
                ₹{venue.start_price_per_hour.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">/hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default VenueCard;