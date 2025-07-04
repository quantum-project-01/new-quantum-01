import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
            Book instantly across 1000+ venues
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Book Your Perfect Game,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </h1>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Venue Name Input */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <input
                    type="text"
                    placeholder="Search Venue Name"
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                {/* Sport Selection */}
                <div className="lg:col-span-1">
                  <select className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base">
                    <option value="" className="text-gray-900">Select Sport</option>
                    <option value="football" className="text-gray-900">Football</option>
                    <option value="basketball" className="text-gray-900">Basketball</option>
                    <option value="tennis" className="text-gray-900">Tennis</option>
                    <option value="badminton" className="text-gray-900">Badminton</option>
                    <option value="cricket" className="text-gray-900">Cricket</option>
                  </select>
                </div>

                {/* City Selection */}
                <div className="lg:col-span-1">
                  <select className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer text-sm sm:text-base">
                    <option value="" className="text-gray-900">Select City</option>
                    <option value="mumbai" className="text-gray-900">Mumbai</option>
                    <option value="delhi" className="text-gray-900">Delhi</option>
                    <option value="bangalore" className="text-gray-900">Bangalore</option>
                    <option value="hyderabad" className="text-gray-900">Hyderabad</option>
                    <option value="pune" className="text-gray-900">Pune</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <button className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">1000+</div>
                <div className="text-white/70 text-sm sm:text-base">Venues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">50K+</div>
                <div className="text-white/70 text-sm sm:text-base">Happy Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">25+</div>
                <div className="text-white/70 text-sm sm:text-base">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                <div className="text-white/70 text-sm sm:text-base">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-white/70" />
      </div>
    </section>
  );
};

export default HeroSection; 