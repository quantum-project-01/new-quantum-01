/**
 * Utility functions for time validation
 */

/**
 * Validates that a time string is in HH:MM format and on 30-minute boundaries
 * @param time - Time string in HH:MM format
 * @returns boolean - true if valid, false otherwise
 */
export const isValidThirtyMinuteInterval = (time: string): boolean => {
  // Check if time matches HH:MM format
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return false;
  }

  // Extract minutes safely
  const parts = time.split(':');
  const minutes = parts[1];
  if (typeof minutes === 'undefined') {
    return false;
  }
  const minuteValue = parseInt(minutes, 10);

  // Check if minutes are either 00 or 30
  return minuteValue === 0 || minuteValue === 30;
};

/**
 * Validates that both start and end times are in 30-minute intervals
 * @param startTime - Start time in HH:MM format
 * @param endTime - End time in HH:MM format
 * @returns object with validation result and error message
 */
export const validateTimeSlot = (startTime: string, endTime: string) => {
  // Validate start time
  if (!isValidThirtyMinuteInterval(startTime)) {
    return {
      isValid: false,
      error: 'Start time must be in 30-minute intervals (e.g., 09:00, 09:30, 10:00)'
    };
  }

  // Validate end time
  if (!isValidThirtyMinuteInterval(endTime)) {
    return {
      isValid: false,
      error: 'End time must be in 30-minute intervals (e.g., 09:00, 09:30, 10:00)'
    };
  }

  // Convert times to minutes for comparison
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // Check if start time is before end time
  if (startMinutes >= endMinutes) {
    return {
      isValid: false,
      error: 'Start time must be before end time'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Converts time string to total minutes since midnight
 * @param time - Time in HH:MM format
 * @returns number of minutes since midnight
 */
const timeToMinutes = (time: string): number => {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Invalid time format: ${time}`);
  }

  return hours * 60 + minutes;
};

/**
 * Generates all valid 30-minute time slots between start and end time
 * @param startTime - Start time in HH:MM format
 * @param endTime - End time in HH:MM format
 * @returns array of time slots
 */
export const generateThirtyMinuteSlots = (startTime: string, endTime: string): string[] => {
  const validation = validateTimeSlot(startTime, endTime);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid time slot');
  }

  const slots: string[] = [];
  let currentMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  while (currentMinutes < endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    slots.push(timeString);
    currentMinutes += 30; // Add 30 minutes
  }

  return slots;
}; 