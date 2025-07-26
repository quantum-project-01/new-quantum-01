import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  createVenue,
  getAllVenuesByPartner,
  updateVenue,
  deleteVenue,
} from "../../services/partner-service/venue-service/venueService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import VenueCard from "../../components/common/venue/venueCard";
import EditableVenueCard from "../../components/common/venue/EditableVenueCard";
import { Venue } from "../../types";
import { Plus, Loader2, AlertTriangle } from "lucide-react";
import AddCart, { VenueFormData } from "./components/venue/AddCart";
import { useAuthStore } from "../../store/authStore";

const UnauthorizedView: React.FC = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 max-w-md w-full text-center">
      <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
      <p className="text-gray-400 mb-4">
        You must be logged in as a partner to view this page.
      </p>
      <button
        onClick={() => window.location.href = '/partner/login'}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Partner Login
      </button>
    </div>
  </div>
);

const PartnerVenues: React.FC = () => {
  const [isAddCartOpen, setIsAddCartOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const isAuthorized = user && user.role === 'partner' && user.partnerDetails?.id;
  const partnerId = user?.id;

  const {
    data: venues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["venues", partnerId],
    queryFn: () => partnerId ? getAllVenuesByPartner(partnerId) : Promise.resolve([]),
    enabled: !!partnerId,
  });

  const createVenueMutation = useMutation({
    mutationFn: async (venueData: VenueFormData) => {
      if (!partnerId) throw new Error("No partner ID available");
      const dataWithPartnerId = {
        ...venueData,
        partnerId,
      };
      return createVenue(dataWithPartnerId);
    },
    onSuccess: (data) => {
      console.log("Venue created successfully!", data);
      setIsAddCartOpen(false);
      queryClient.invalidateQueries({ queryKey: ["venues", partnerId] });
    },
    onError: (error: any) => {
      console.error("Error creating venue:", error);
      alert(error?.response?.data?.message || "Failed to create venue");
    },
  });

  const updateVenueMutation = useMutation({
    mutationFn: async (venue: Venue) => {
      if (!venue.id) throw new Error("Venue ID is required for update");
      return updateVenue(venue.id, venue);
    },
    onSuccess: () => {
      handleCloseEditModal();
      queryClient.invalidateQueries({ queryKey: ["venues", partnerId] });
    },
    onError: (error: any) => {
      console.error("Error updating venue:", error);
      alert(error?.response?.data?.message || "Failed to update venue");
    },
  });

  const deleteVenueMutation = useMutation({
    mutationFn: async (venueId: string) => {
      return deleteVenue(venueId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues", partnerId] });
    },
    onError: (error: any) => {
      console.error("Error deleting venue:", error);
      alert(error?.response?.data?.message || "Failed to delete venue");
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
    setIsEditModalOpen(true);
  };

  const handleDeleteVenue = (venueId: string) => {
    deleteVenueMutation.mutate(venueId);
  };

  const handleSaveVenue = (updatedVenue: Venue) => {
    updateVenueMutation.mutate(updatedVenue);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingVenue(null);
  };

  if (!isAuthorized) {
    return <UnauthorizedView />;
  }

  return (
    <DashboardLayout userRole="partner">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Partner Venues</h1>
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
              Error loading venues: {error instanceof Error ? error.message : 'Unknown error'}
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
              <VenueCard 
                key={venue.id} 
                venue={venue} 
                onEdit={() => handleEditVenue(venue)}
                onDelete={() => venue.id && handleDeleteVenue(venue.id)}
              />
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

        {/* Add Venue Modal */}
        <AddCart
          isOpen={isAddCartOpen}
          onClose={handleCloseAddCart}
          onSubmit={handleAddVenue}
          isLoading={createVenueMutation.isPending}
        />

        {/* Edit Venue Modal */}
        {editingVenue && (
          <EditableVenueCard
            venue={editingVenue}
            onSave={handleSaveVenue}
            onCancel={handleCloseEditModal}
            isOpen={isEditModalOpen}
            isLoading={updateVenueMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default PartnerVenues;
