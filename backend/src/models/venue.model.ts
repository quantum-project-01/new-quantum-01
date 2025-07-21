export interface Venue {
  id?: string;
  partnerId: string;
  name: string;
  description?: string;
  highlight?: string;
  location: Location;
  start_price_per_hour: number;
  details: {};
  cancellationPolicy: {};
  images?: string[];
  features?: string[];
  approved?: boolean;
  mapLocationLink: string;
  phone: string;
  rating?: number;
  reviews?: {
    userId: string;
    text: string;
    createdAt: string;
  };
  totalReviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  coordinates: {
    lat: number;
    lang: number;
  };
}
export interface Activity {
  id?: string;
  name: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  venueId?: string;
  start_price_per_hour: number;
}

export interface Facility {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  activityId: string;
  start_price_per_hour: number;
  startTime: string; // Format: "HH:MM:SS" (e.g., "09:00:00")
  endTime: string;   // Format: "HH:MM:SS" (e.g., "17:00:00")
  isAvailable?: boolean;
  isFillingFast?: boolean;
}

// Slot Model
export type SlotAvailability =
  | "available"
  | "not_available"
  | "booked"
  | "filling_fast";

export interface Slot {
  id?: string;
  date: string;
  amount: number;
  availability: SlotAvailability;
  startTime: string; 
  endTime: string;  
  facilityId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}