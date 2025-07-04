import React from 'react';
import { AdminComponentProps } from '../types/adminTypes';
import UserManagement from './UserManagement';

const PartnerManagement: React.FC<AdminComponentProps> = (props) => {
  // For now, reuse UserManagement component
  // This can be customized later with partner-specific functionality
  return <UserManagement {...props} />;
};

export default PartnerManagement; 