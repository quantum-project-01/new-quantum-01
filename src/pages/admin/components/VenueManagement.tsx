import React from 'react';
import { AdminComponentProps } from '../types/adminTypes';
import UserManagement from './UserManagement';

const VenueManagement: React.FC<AdminComponentProps> = (props) => {
  // For now, reuse UserManagement component
  // This can be customized later with venue-specific functionality
  return <UserManagement {...props} />;
};

export default VenueManagement; 