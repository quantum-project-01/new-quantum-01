export interface Venue {
  id?: string;
  name: string;
  location: string;
  description?: string;
  highlight?: string;
  main: string;
  rating?: number | null; // DECIMAL(2,1)
  start_price_per_hour: number;
  createdOn?: Date; // ISO timestamp
  updatedOn?: Date;
  detailDescription?:string;
  features?: string[];
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  mapLocationLink: string;
  cancellationPolicy?: string[];
  partnerId:string;
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