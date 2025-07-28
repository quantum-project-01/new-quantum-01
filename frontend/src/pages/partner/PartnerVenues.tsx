import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  createVenue,
  getAllVenuesByPartner,
  updateVenue,
} from "../../services/partner-service/venue-service/venueService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import VenueCard from "../../components/common/venue/venueCard";
import EditableVenueCard from "../../components/common/venue/EditableVenueCard";
import { Venue } from "../../types";
import { Plus, Loader2 } from "lucide-react";
import AddCart, { VenueFormData } from "./components/venue/AddCart";

const PartnerVenues: React.FC = () => {
  const [isAddCartOpen, setIsAddCartOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const queryClient = useQueryClient();

  const {
    data: venues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["venues"],
    queryFn: () =>
      getAllVenuesByPartner("7a79fb37-3f7c-40a6-969d-2087643dde8c"),
  });

  // Create venue mutation
  const createVenueMutation = useMutation({
    mutationFn: async (venueData: VenueFormData) => {
      return createVenue(venueData);
    },
    onSuccess: () => {
      setIsAddCartOpen(false);
      // Invalidate and refetch venues
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
    onError: (error: any) => {
      console.error("Error creating venue:", error);
      alert(error?.response?.data?.message || "Failed to create venue");
    },
  });

  // Update venue mutation
  const updateVenueMutation = useMutation({
    mutationFn: async (venue: Venue) => {
      if (!venue.id) throw new Error("Venue ID is required for update");
      return updateVenue(venue.id, venue);
    },
    onSuccess: () => {
      setEditingVenue(null);
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
    onError: (error: any) => {
      console.error("Error updating venue:", error);
      alert(error?.response?.data?.message || "Failed to update venue");
    },
  });

  const handleAddVenue = (data: VenueFormData) => {
    console.log("data", data);
    createVenueMutation.mutate(data);
  };

  const handleOpenAddCart = () => {
    setIsAddCartOpen(true);
  };

  const handleCloseAddCart = () => {
    setIsAddCartOpen(false);
  };

  const handleEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
  };

  const handleSaveVenue = (updatedVenue: Venue) => {
    updateVenueMutation.mutate(updatedVenue);
  };

  const handleCancelEdit = () => {
    setEditingVenue(null);
  };

  return (
    <DashboardLayout userRole="partner">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {"Partner Venues"}
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor your venue performance and bookings
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleOpenAddCart}
              disabled={createVenueMutation.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createVenueMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>
                {createVenueMutation.isPending ? "Creating..." : "Add Venue"}
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400">Loading venues...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400">
              Error loading venues: {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Venues Grid */}
        {!isLoading && !error && venues && venues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue: Venue) => (
              editingVenue?.id === venue.id ? (
                <EditableVenueCard
                  key={venue.id}
                  venue={venue}
                  onSave={handleSaveVenue}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div key={venue.id} onClick={() => handleEditVenue(venue)}>
                  <VenueCard venue={venue} />
                </div>
              )
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!venues || venues.length === 0) && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No venues found
            </h3>
            <p className="text-gray-400 mb-4">
              Get started by creating your first venue
            </p>
            <button
              onClick={handleOpenAddCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Create Your First Venue</span>
            </button>
          </div>
        )}

        <AddCart
          isOpen={isAddCartOpen}
          onClose={handleCloseAddCart}
          onSubmit={handleAddVenue}
          isLoading={createVenueMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
};

export default PartnerVenues;
