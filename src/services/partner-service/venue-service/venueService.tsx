import { VenueFormData } from "../../../pages/partner/components/venue/AddCart";
import { Venue } from "../../../types";
import axiosInstance from "../../api";

export const createVenue = async (venue: VenueFormData) => {
  try {
    const response = await axiosInstance.post("/venue/create-venue", venue);
    return response.data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export const getVenue = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/venue/get-venue/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting venue:", error);
    throw error;
  }
};

export const getAllVenuesByPartner = async (partnerId: string) => {
  try {
    const response = await axiosInstance.get(
      `/venue/get-all-venues-by-partner?partnerId=${partnerId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error getting all venues by partner:", error);
    throw error;
  }
};

export const updateVenue = async (id: string, venue: Venue) => {
  try {
    const response = await axiosInstance.put(
      `/venue/update-venue/${id}`,
      venue
    );
    return response.data;
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
};
