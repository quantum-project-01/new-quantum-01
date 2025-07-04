import React from 'react';
import { useLocation } from 'react-router-dom';
import { MenuItem } from '../../../config/menuConfig';
import { isActiveRoute, getMenuItemClasses } from '../../../utils/dashboardUtils';

interface NavigationMenuProps {
  menuItems: MenuItem[];
  collapsed: boolean;
  onMenuClick: (path: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ menuItems, collapsed, onMenuClick }) => {
  const location = useLocation();

  return (
    <nav className={`flex-1 p-2 space-y-1 ${collapsed ? 'px-2' : 'px-4'}`}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = isActiveRoute(location.pathname, item.path);
        
        return (
          <div key={item.id} className="relative group">
            <button
              onClick={() => onMenuClick(item.path)}
              className={getMenuItemClasses(isActive, collapsed)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
            
            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default NavigationMenu; 