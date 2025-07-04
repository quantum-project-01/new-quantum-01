import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  UserCheck,
  BarChart3,
  MapPin,
  DollarSign,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'partner';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/dashboard/users' },
    { id: 'partners', label: 'Partners', icon: UserCheck, path: '/admin/dashboard/partners' },
    { id: 'venues', label: 'Venues', icon: Building, path: '/admin/dashboard/venues' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/admin/dashboard/bookings' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/dashboard/settings' },
  ];

  const partnerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/partner/dashboard' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/partner/dashboard/bookings' },
    { id: 'venues', label: 'Venues', icon: Building, path: '/partner/dashboard/venues' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/partner/dashboard/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/partner/dashboard/settings' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : partnerMenuItems;

  const handleMenuClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const isActiveRoute = (path: string) => {
    if (path === `/admin/dashboard` || path === `/partner/dashboard`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Sidebar Header */}
        <div className={`p-4 border-b border-gray-700 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-green-400 flex-shrink-0" />
                <span className="text-xl font-bold text-white">Quantum</span>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="flex justify-center w-full">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors ${
                sidebarCollapsed ? 'ml-0' : 'ml-2'
              }`}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-b border-gray-700 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {userRole === 'admin' ? 'A' : 'P'}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium truncate">
                  {userRole === 'admin' ? 'Admin User' : 'Partner User'}
                </p>
                <p className="text-gray-400 text-sm capitalize">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className={`flex-1 p-2 space-y-1 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleMenuClick(item.path)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'space-x-3 px-3'} py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
                
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t border-gray-700 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
          <div className="relative group">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'space-x-3 px-3'} py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors`}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
            
            {/* Tooltip for collapsed state */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
                Logout
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors shadow-lg border border-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-80 max-w-xs bg-gray-800 border-r border-gray-700 shadow-xl">
            {/* Mobile Sidebar Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-green-400" />
                  <span className="text-xl font-bold text-white">Quantum</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile User Profile */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {userRole === 'admin' ? 'A' : 'P'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {userRole === 'admin' ? 'Admin User' : 'Partner User'}
                  </p>
                  <p className="text-gray-400 text-sm capitalize">{userRole}</p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Logout Button */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-0' : 'md:ml-0'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 