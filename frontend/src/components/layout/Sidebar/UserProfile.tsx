import React from 'react';
import { getUserDisplayName, getUserInitial } from '../../../utils/dashboardUtils';
import { useAuthStore } from '../../../store/authStore';

interface UserProfileProps {
  userRole: 'admin' | 'partner';
  collapsed: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userRole, collapsed }) => {
  const { user } = useAuthStore();

  return (
    <div className={`p-4 border-b border-gray-700 ${collapsed ? 'px-2' : 'px-4'}`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : getUserInitial(userRole)}
          </span>
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium truncate">
              {user?.name || getUserDisplayName(userRole)}
            </p>
            <p className="text-gray-400 text-sm capitalize">
              {user?.role || userRole}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 