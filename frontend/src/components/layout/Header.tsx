import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, BarChart3, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeMenu}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quantum
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
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

            {/* Partner Link */}
            <Link
              to="/partner/register"
              className="text-white hover:bg-gray-100 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              Join as Partner
            </Link>

            {/* Desktop User Actions */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <Link
                    to="/contact"
                    className={`relative px-4 py-2 font-medium transition-all duration-200 ${isActivePath('/contact')
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    Contact Us
                    {isActivePath('/contact') && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    )}
                  </Link>
                  <Link
                    to="/wallet"
                    className={`relative px-4 py-2 font-medium transition-all duration-200 ${isActivePath('/wallet')
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    Wallet
                    {isActivePath('/wallet') && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    )}
                  </Link>
                  <Link
                    to="/bookings"
                    className={`relative px-4 py-2 font-medium transition-all duration-200 ${isActivePath('/bookings')
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    My Bookings
                    {isActivePath('/bookings') && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    )}
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-200 font-medium">Hi, {user?.name}</span>
                  </div>

                  <Link
                    to="/profile"
                    className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    title="Profile"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>

                  {user?.role === 'partner' && (
                    <Link
                      to="/partner/dashboard"
                      className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                      title="Partner Dashboard"
                    >
                      <BarChart3 className="h-5 w-5" />
                    </Link>
                  )}

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="p-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                      title="Admin Panel"
                    >
                      <Shield className="h-5 w-5" />
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
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
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-6">
                {isAuthenticated && (
                  <>
                    <Link
                      to="/contact"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActivePath('/contact')
                          ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                        }`}
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/wallet"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActivePath('/wallet')
                          ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                        }`}
                    >
                      Wallet
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActivePath('/bookings')
                          ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                        }`}
                    >
                      My Bookings
                    </Link>
                  </>
                )}
                <Link
                  to="/venues"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActivePath('/venues')
                      ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                >
                  Venues
                </Link>
                <Link
                  to="/events"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActivePath('/events')
                      ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                >
                  Events
                </Link>
                <Link
                  to="/shop"
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActivePath('/shop')
                      ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                >
                  Shop
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-700/50 pt-6">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">Hi, {user?.name}</p>
                        <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-200"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Profile Settings</span>
                    </Link>

                    {user?.role === 'partner' && (
                      <Link
                        to="/partner/dashboard"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-200"
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span>Partner Dashboard</span>
                      </Link>
                    )}

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-200"
                      >
                        <Shield className="h-5 w-5" />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="block px-6 py-3 text-center text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl font-medium transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="block px-6 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 