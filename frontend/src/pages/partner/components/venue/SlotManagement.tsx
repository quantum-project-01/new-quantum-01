/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Plus, Edit3, Trash2, Calendar, DollarSign, Loader2, RotateCcw, AlertCircle } from "lucide-react";
import { Venue } from "../../../../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface Activity {
  id: string;
  name: string;
  tags: string[];
  start_price_per_hour: number;
  venueId: string;
}

interface Facility {
  id: string;
  name: string;
  activityId: string;
  activityName?: string;
  start_price_per_hour: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isFillingFast: boolean;
}

interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  availability: 'available' | 'not_available' | 'booked' | 'filling_fast';
  facilityId: string;
  facilityName?: string;
  activityName?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SlotFormData {
  facilityId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  availability: 'available' | 'not_available' | 'booked' | 'filling_fast';
}

interface SlotManagementProps {
  venue: Venue;
}

const SlotManagement: React.FC<SlotManagementProps> = ({ venue }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkCreateModalOpen, setIsBulkCreateModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const queryClient = useQueryClient();

  // Mock data - replace with actual API calls
  const facilities: Facility[] = [
    {
      id: '1',
      name: 'Court 1',
      activityId: '1',
      activityName: 'Football',
      start_price_per_hour: 399,
      startTime: '06:00',
      endTime: '23:00',
      isAvailable: true,
      isFillingFast: false,
    },
    {
      id: '2',
      name: 'Court 2',
      activityId: '1',
      activityName: 'Football',
      start_price_per_hour: 449,
      startTime: '06:00',
      endTime: '23:00',
      isAvailable: true,
      isFillingFast: true,
    },
    {
      id: '3',
      name: 'Cricket Ground',
      activityId: '2',
      activityName: 'Cricket',
      start_price_per_hour: 599,
      startTime: '05:00',
      endTime: '22:00',
      isAvailable: true,
      isFillingFast: false,
    }
  ];

  // Mock slots data - replace with actual API calls
  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['slots', venue.id, selectedFacility, selectedDateRange],
    queryFn: async () => {
      // Generate mock slots for the next 7 days
      const mockSlots: Slot[] = [];
      const startDate = new Date(selectedDateRange.start);
      const endDate = new Date(selectedDateRange.end);
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        
        // Generate slots for each facility
        facilities.forEach(facility => {
          if (selectedFacility !== 'all' && facility.id !== selectedFacility) return;
          
          // Generate 30-minute slots from 6 AM to 11 PM
          for (let hour = 6; hour < 23; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
              const endHour = minute === 30 ? hour + 1 : hour;
              const endMinute = minute === 30 ? 0 : 30;
              const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
              
              const availabilityOptions: Slot['availability'][] = ['available', 'not_available', 'booked', 'filling_fast'];
              const randomAvailability = availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)];
              
              mockSlots.push({
                id: `${facility.id}-${dateStr}-${startTime}`,
                date: dateStr,
                startTime,
                endTime,
                amount: facility.start_price_per_hour,
                availability: randomAvailability,
                facilityId: facility.id,
                facilityName: facility.name,
                activityName: facility.activityName,
              });
            }
          }
        });
      }
      
      return mockSlots;
    }
  });

  const createSlotMutation = useMutation({
    mutationFn: async (data: SlotFormData) => {
      // Replace with actual API call
      const facility = facilities.find(f => f.id === data.facilityId);
      const newSlot: Slot = {
        id: Date.now().toString(),
        date: data.startDate,
        startTime: data.startTime,
        endTime: data.endTime,
        amount: data.amount,
        availability: data.availability,
        facilityId: data.facilityId,
        facilityName: facility?.name,
        activityName: facility?.activityName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newSlot;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots', venue.id] });
      setIsAddModalOpen(false);
      toast.success('Slot created successfully!');
    },
    onError: () => {
      toast.error('Failed to create slot');
    }
  });

  const createBulkSlotsMutation = useMutation({
    mutationFn: async (data: SlotFormData) => {
      // Replace with actual API call to create multiple slots
      return { count: 48 }; // Mock response
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['slots', venue.id] });
      setIsBulkCreateModalOpen(false);
      toast.success(`${data.count} slots created successfully!`);
    },
    onError: () => {
      toast.error('Failed to create bulk slots');
    }
  });

  const updateSlotMutation = useMutation({
    mutationFn: async (data: { id: string; slot: Partial<SlotFormData> }) => {
      // Replace with actual API call
      return { ...data.slot, id: data.id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots', venue.id] });
      setIsEditModalOpen(false);
      setEditingSlot(null);
      toast.success('Slot updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update slot');
    }
  });

  const deleteSlotMutation = useMutation({
    mutationFn: async (id: string) => {
      // Replace with actual API call
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots', venue.id] });
      toast.success('Slot deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete slot');
    }
  });

  const handleCreateSlot = (data: SlotFormData) => {
    createSlotMutation.mutate(data);
  };

  const handleCreateBulkSlots = (data: SlotFormData) => {
    createBulkSlotsMutation.mutate(data);
  };

  const handleUpdateSlot = (data: Partial<SlotFormData>) => {
    if (editingSlot) {
      updateSlotMutation.mutate({ id: editingSlot.id, slot: data });
    }
  };

  const handleDeleteSlot = (id: string) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      deleteSlotMutation.mutate(id);
    }
  };

  const getAvailabilityColor = (availability: Slot['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-600/20 text-green-400';
      case 'booked':
        return 'bg-red-600/20 text-red-400';
      case 'filling_fast':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'not_available':
        return 'bg-gray-600/20 text-gray-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getAvailabilityText = (availability: Slot['availability']) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'booked':
        return 'Booked';
      case 'filling_fast':
        return 'Filling Fast';
      case 'not_available':
        return 'Not Available';
      default:
        return 'Unknown';
    }
  };

  const filteredSlots = selectedFacility === 'all' 
    ? slots 
    : slots.filter(s => s.facilityId === selectedFacility);

  // Group slots by date for better display
  const slotsByDate = filteredSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, Slot[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Time Slots</h2>
          <p className="text-gray-400 text-sm">
            Set up booking time slots and availability for your facilities
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Facilities</option>
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name} ({facility.activityName})
              </option>
            ))}
          </select>
          
          <input
            type="date"
            value={selectedDateRange.start}
            onChange={(e) => setSelectedDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
          
          <input
            type="date"
            value={selectedDateRange.end}
            onChange={(e) => setSelectedDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={() => setIsBulkCreateModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Bulk Create</span>
          </button>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Slot</span>
          </button>
        </div>
      </div>

      {/* Slots Display */}
      {Object.keys(slotsByDate).length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Slots Available</h3>
          <p className="text-gray-400 mb-4">
            Create time slots for your facilities to start accepting bookings.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setIsBulkCreateModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Bulk Create Slots
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Individual Slot
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(slotsByDate)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, dateSlots]) => (
              <div key={date} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {dateSlots
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((slot) => (
                      <div
                        key={slot.id}
                        className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-white font-medium">
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="text-blue-400 text-sm">
                              {slot.facilityName}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {slot.activityName}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                setEditingSlot(slot);
                                setIsEditModalOpen(true);
                              }}
                              className="text-gray-400 hover:text-blue-400 transition-colors p-1"
                            >
                              <Edit3 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-400 text-sm">
                              <DollarSign className="h-3 w-3 mr-1" />
                              <span>₹{slot.amount}</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(slot.availability)}`}>
                              {getAvailabilityText(slot.availability)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Add Single Slot Modal */}
      <SlotModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateSlot}
        title="Add New Slot"
        facilities={facilities}
        isLoading={createSlotMutation.isPending}
        isBulk={false}
      />

      {/* Bulk Create Slots Modal */}
      <SlotModal
        isOpen={isBulkCreateModalOpen}
        onClose={() => setIsBulkCreateModalOpen(false)}
        onSubmit={handleCreateBulkSlots}
        title="Bulk Create Slots"
        facilities={facilities}
        isLoading={createBulkSlotsMutation.isPending}
        isBulk={true}
      />

      {/* Edit Slot Modal */}
      <SlotModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSlot(null);
        }}
        onSubmit={(data) => handleUpdateSlot(data)}
        title="Edit Slot"
        facilities={facilities}
        initialData={editingSlot ? {
          facilityId: editingSlot.facilityId,
          startDate: editingSlot.date,
          endDate: editingSlot.date,
          startTime: editingSlot.startTime,
          endTime: editingSlot.endTime,
          amount: editingSlot.amount,
          availability: editingSlot.availability,
        } : undefined}
        isLoading={updateSlotMutation.isPending}
        isBulk={false}
      />
    </div>
  );
};

// Slot Modal Component
interface SlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SlotFormData) => void;
  title: string;
  facilities: Facility[];
  initialData?: SlotFormData;
  isLoading?: boolean;
  isBulk?: boolean;
}

const SlotModal: React.FC<SlotModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  facilities,
  initialData,
  isLoading = false,
  isBulk = false,
}) => {
  const [formData, setFormData] = useState<SlotFormData>(
    initialData || {
      facilityId: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startTime: '06:00',
      endTime: '23:00',
      amount: 0,
      availability: 'available',
    }
  );

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.facilityId || formData.amount <= 0) return;
    onSubmit(formData);
  };

  const selectedFacility = facilities.find(f => f.id === formData.facilityId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Facility
            </label>
            <select
              value={formData.facilityId}
              onChange={(e) => {
                const facility = facilities.find(f => f.id === e.target.value);
                setFormData(prev => ({ 
                  ...prev, 
                  facilityId: e.target.value,
                  amount: facility?.start_price_per_hour || 0
                }));
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Facility</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name} ({facility.activityName})
                </option>
              ))}
            </select>
          </div>

          {isBulk ? (
            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-medium mb-1">Bulk Creation</h4>
                  <p className="text-blue-300 text-sm">
                    This will create 30-minute slots for all days between the selected date range 
                    during the specified time period.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isBulk ? 'Start Date' : 'Date'}
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {isBulk && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="399"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value as SlotFormData['availability'] }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="available">Available</option>
                <option value="not_available">Not Available</option>
                <option value="filling_fast">Filling Fast</option>
                <option value="booked">Booked</option>
              </select>
            </div>
          </div>

          {selectedFacility && (
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-sm text-gray-300">
                <div>Facility Hours: {selectedFacility.startTime} - {selectedFacility.endTime}</div>
                <div>Base Price: ₹{selectedFacility.start_price_per_hour}/hour</div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={isLoading || !formData.facilityId || formData.amount <= 0}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                isBulk ? 'Create Slots' : 'Save Slot'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlotManagement;