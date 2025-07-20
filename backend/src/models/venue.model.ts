export interface Venue {
  id?: string;
  partnerId: string;
  name: string;
  description?: string;
  highlight?: string;
  location: Location
  start_price_per_hour: number;
  details:{},
  cancellationPolicy:{};
  images?: string[];
  features?: string[];
  approved?: boolean;
  mapLocationLink: string;
  phone: string;
  rating?: number;
  reviews?: {
    userId:string,
    text:string,
    createdAt:string
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
    id: number;
    name: string;
    tags: string[];
    createdOn: Date;
    updatedOn: Date;
    start_price_per_hour:number
}

export interface Facility {
    id: number;
    name: string;
    createdOn: Date;
    updatedOn: Date;
    start_price_per_hour:number
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    isFillingFast: boolean;
}