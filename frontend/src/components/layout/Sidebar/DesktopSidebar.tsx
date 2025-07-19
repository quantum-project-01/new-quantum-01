import React from 'react';
import { MenuItem } from '../../../config/menuConfig';
import { getSidebarClasses } from '../../../utils/dashboardUtils';
import SidebarHeader from './SidebarHeader';
import UserProfile from './UserProfile';
import NavigationMenu from './NavigationMenu';
import LogoutButton from './LogoutButton';

interface DesktopSidebarProps {
  userRole: 'admin' | 'partner';
  menuItems: MenuItem[];
  collapsed: boolean;
  onToggleSidebar: () => void;
  onMenuClick: (path: string) => void;
  onLogout: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  userRole,
  menuItems,
  collapsed,
  onToggleSidebar,
  onMenuClick,
  onLogout,
}) => {
  return (
    <div className={getSidebarClasses(collapsed)}>
      <SidebarHeader collapsed={collapsed} onToggle={onToggleSidebar} />
      <UserProfile userRole={userRole} collapsed={collapsed} />
      <NavigationMenu 
        menuItems={menuItems} 
        collapsed={collapsed} 
        onMenuClick={onMenuClick} 
      />
      <LogoutButton collapsed={collapsed} onLogout={onLogout} />
    </div>
  );
};

export default DesktopSidebar; 