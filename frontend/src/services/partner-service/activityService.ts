import axiosInstance from "../api";

export interface Activity {
  id?: string;
  name: string;
  tags: string[];
  start_price_per_hour: number;
  venueId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityFormData {
  name: string;
  tags: string[];
  start_price_per_hour: number;
  venueId: string;
}

export const createActivity = async (activity: ActivityFormData) => {
  try {
    const response = await axiosInstance.post("/venue/activity-facility/create-activity", activity);
    return response.data;
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
};

export const getActivitiesByVenue = async (venueId: string) => {
  try {
    const response = await axiosInstance.get(`/venue/activity-facility/get-activities-by-venue/${venueId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting activities by venue:", error);
    throw error;
  }
};

export const getActivityById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/venue/activity-facility/get-activity-by-id/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting activity by id:", error);
    throw error;
  }
};

export const updateActivity = async (id: string, activity: Partial<ActivityFormData>) => {
  try {
    const response = await axiosInstance.put(`/venue/activity-facility/update-activity/${id}`, activity);
    return response.data;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const deleteActivity = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/venue/activity-facility/delete-activity/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
}; 