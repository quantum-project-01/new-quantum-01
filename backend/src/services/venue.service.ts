import { Venue } from "../models/venue.model";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export class VenueService {
    static async createVenue(venue: Venue) {
        try {
            const newVenue = await prisma.venue.create({
                data: {
                    name: venue.name,
                    location: venue.location,
                    description: venue.description ?? '',
                    highlight: venue.highlight ?? '',
                    rating: venue.rating || 0,
                    main: venue.main,
                    start_price_per_hour: venue.start_price_per_hour,
                    partnerId: venue.partnerId,
                    detailDescription: venue.detailDescription ?? '',
                    features: venue.features ?? [],
                    city: venue.city,
                    state: venue.state,
                    country: venue.country,
                    zip: venue.zip,
                    phone: venue.phone,
                    mapLocationLink: venue.mapLocationLink,
                    createdOn: new Date(),
                    updatedOn: new Date(),
                }
            });
            return newVenue;
        } catch (error) {
            console.error("Error creating venue:", error);
            throw error;
        }
    }
}