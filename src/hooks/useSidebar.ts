import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleMenuClick = useCallback((path: string) => {
    navigate(path);
    closeMobileMenu();
  }, [navigate, closeMobileMenu]);

  const handleLogout = useCallback(() => {
    // TODO: Implement logout logic
    navigate('/');
    closeMobileMenu();
  }, [navigate, closeMobileMenu]);

  return {
    sidebarCollapsed,
    mobileMenuOpen,
    toggleSidebar,
    openMobileMenu,
    closeMobileMenu,
    handleMenuClick,
    handleLogout,
  };
}; 