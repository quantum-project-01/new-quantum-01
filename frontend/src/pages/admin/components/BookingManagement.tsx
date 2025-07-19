import React from 'react';
import { AdminComponentProps } from '../types/adminTypes';
import UserManagement from './UserManagement';

const BookingManagement: React.FC<AdminComponentProps> = (props) => {
  // For now, reuse UserManagement component
  // This can be customized later with booking-specific functionality
  return <UserManagement {...props} />;
};

export default BookingManagement; 