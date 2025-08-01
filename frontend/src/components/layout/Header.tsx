import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, BarChart3, Shield, ChevronDown, Wallet, Calendar, Phone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-xl shadow-black/10'
          : 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/50'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
              onClick={closeMenu}
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <span className="text-white font-bold text-lg sm:text-xl">Q</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quantum
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* <Link
                to="/venues"
                className={`relative px-4 py-2 font-medium transition-all duration-200 ${
                  isActivePath('/venues')
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Venues
                {isActivePath('/venues') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </Link> */}
              <Link
                to="/membership"
                className={`relative px-4 py-2 font-medium transition-all duration-200 ${isActivePath('/membership')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                Membership
                {isActivePath('/membership') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </Link>
              <Link
                to="/events"
                className={`relative px-4 py-2 font-medium transition-all duration-200 ${isActivePath('/events')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                Events
                {isActivePath('/events') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </Link>
              <Link
                to="/shop"
                className={`relative px-4 py-2 font-medium transition-all duration-200 ${isActivePath('/shop')
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                Shop
                {isActivePath('/shop') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                )}
              </Link>
            </nav>

            {/* Partner Link - Hidden on mobile, shown in mobile menu */}
            <Link
              to="/partner/register"
              className="hidden md:flex text-white hover:bg-gray-100 hover:text-gray-900 group items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            >
              Join as Partner
            </Link>

            {/* Desktop User Actions */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                {/* Quick Access Links - Hidden on smaller desktop screens, shown on larger */}
                <div className="hidden xl:flex items-center space-x-2">
                  <Link
                    to="/contact"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActivePath('/contact')
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    title="Contact Us"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="hidden 2xl:inline">Contact</span>
                  </Link>
                  <Link
                    to="/wallet"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActivePath('/wallet')
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    title="Wallet"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden 2xl:inline">Wallet</span>
                  </Link>
                  <Link
                    to="/bookings"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActivePath('/bookings')
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    title="My Bookings"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden 2xl:inline">Bookings</span>
                  </Link>
                </div>

                {/* User Menu Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-3 px-3 lg:px-4 py-2 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-200 group"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <div className="hidden lg:block text-left min-w-0">
                      <p className="text-gray-200 font-medium text-sm truncate max-w-[120px] xl:max-w-[150px]">
                        Hi, {user?.name}
                      </p>
                      <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 lg:w-72 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl shadow-black/20 py-2 z-50">
                      {/* User Info Section - Mobile/Tablet Only */}
                      <div className="lg:hidden px-4 py-3 border-b border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-gray-200 font-medium">{user?.name}</p>
                            <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Access - Visible on smaller desktop screens */}
                      <div className="xl:hidden px-2 py-2 border-b border-gray-700/50">
                        <div className="space-y-1">
                          <Link
                            to="/contact"
                            onClick={closeUserMenu}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                              isActivePath('/contact')
                                ? 'bg-blue-900/50 text-blue-400'
                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                            }`}
                          >
                            <Phone className="h-4 w-4" />
                            <span>Contact Us</span>
                          </Link>
                          <Link
                            to="/wallet"
                            onClick={closeUserMenu}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                              isActivePath('/wallet')
                                ? 'bg-blue-900/50 text-blue-400'
                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                            }`}
                          >
                            <Wallet className="h-4 w-4" />
                            <span>Wallet</span>
                          </Link>
                          <Link
                            to="/bookings"
                            onClick={closeUserMenu}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                              isActivePath('/bookings')
                                ? 'bg-blue-900/50 text-blue-400'
                                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                            }`}
                          >
                            <Calendar className="h-4 w-4" />
                            <span>My Bookings</span>
                          </Link>
                        </div>
                      </div>

                      {/* Main Menu Items */}
                      <div className="px-2 py-2">
                        <div className="space-y-1">
                          <Link
                            to="/profile"
                            onClick={closeUserMenu}
                            className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all duration-200"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Profile Settings</span>
                          </Link>

                          {user?.role === 'partner' && (
                            <Link
                              to="/partner/dashboard"
                              onClick={closeUserMenu}
                              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all duration-200"
                            >
                              <BarChart3 className="h-4 w-4" />
                              <span>Partner Dashboard</span>
                            </Link>
                          )}

                          {user?.role === 'admin' && (
                            <Link
                              to="/admin/dashboard"
                              onClick={closeUserMenu}
                              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-all duration-200"
                            >
                              <Shield className="h-4 w-4" />
                              <span>Admin Panel</span>
                            </Link>
                          )}

                          <hr className="border-gray-700/50 my-2" />

                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 w-full text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 lg:px-6 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 lg:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 touch-manipulation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu Panel */}
        <div className={`absolute top-16 left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`}>
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-6">
                {/* Partner Link - Mobile */}
                <Link
                  to="/partner/register"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg mb-4"
                >
                  Join as Partner
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/contact')
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                        }`}
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/wallet"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/wallet')
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                        }`}
                    >
                      Wallet
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/bookings')
                        ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                        }`}
                    >
                      My Bookings
                    </Link>
                  </>
                )}
                <Link
                  to="/membership"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/membership')
                    ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                    }`}
                >
                  Membership
                </Link>
                <Link
                  to="/venues"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/venues')
                    ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                    }`}
                >
                  Venues
                </Link>
                <Link
                  to="/events"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/events')
                    ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                    }`}
                >
                  Events
                </Link>
                <Link
                  to="/shop"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation ${isActivePath('/shop')
                    ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white active:bg-gray-700/50'
                    }`}
                >
                  Shop
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-700/50 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-200 truncate">Hi, {user?.name}</p>
                        <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-200 touch-manipulation"
                      >
                        <Settings className="h-5 w-5 flex-shrink-0" />
                        <span>Profile Settings</span>
                      </Link>

                      {user?.role === 'partner' && (
                        <Link
                          to="/partner/dashboard"
                          onClick={closeMenu}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-200 touch-manipulation"
                        >
                          <BarChart3 className="h-5 w-5 flex-shrink-0" />
                          <span>Partner Dashboard</span>
                        </Link>
                      )}

                      {user?.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={closeMenu}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-200 touch-manipulation"
                        >
                          <Shield className="h-5 w-5 flex-shrink-0" />
                          <span>Admin Panel</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full text-left touch-manipulation"
                      >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="block px-6 py-3 text-center text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl font-medium transition-all duration-200 touch-manipulation"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="block px-6 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg touch-manipulation"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default Header; 