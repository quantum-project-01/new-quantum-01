import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowUp, Zap, Shield, Award } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">Q</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-lg"></div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Quantum
                </span>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Revolutionizing sports venue booking with cutting-edge technology. 
                Join thousands of athletes and venue partners in building the future of sports.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">1000+</div>
                  <div className="text-sm text-gray-400">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">50K+</div>
                  <div className="text-sm text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">25+</div>
                  <div className="text-sm text-gray-400">Cities</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="https://twitter.com" 
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-sky-500 hover:border-sky-400 transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="https://instagram.com" 
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:border-pink-400 transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-blue-700 hover:border-blue-600 transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Platform */}
                <div>
                  <h3 className="text-lg font-bold mb-6 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-400" />
                    Platform
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <Link 
                        to="/venues" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Find Venues
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/events" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/shop" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/partner" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Become Partner
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-lg font-bold mb-6 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-400" />
                    Company
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <Link 
                        to="/about" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/careers" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/blog" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/press" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Press Kit
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-lg font-bold mb-6 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-purple-400" />
                    Support
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <Link 
                        to="/help" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/contact" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/privacy" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/terms" 
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Address</div>
                <div className="text-white font-medium">Kolkata, West Bengal, India</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Phone</div>
                <div className="text-white font-medium">+91 98765 43210</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="text-white font-medium">hello@quantum.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <span>© 2025 Quantum. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>in India</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <span className="text-gray-300 group-hover:text-white">Back to top</span>
              <ArrowUp className="h-4 w-4 text-gray-300 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 