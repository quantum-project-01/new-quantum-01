import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, CheckCircle, Zap } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-pulse" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Get started with your sports venue booking in just three simple steps. 
            It's fast, secure, and hassle-free.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {/* Step 1 */}
          <div className="relative text-center group">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 sm:top-16 left-full w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500/30 to-green-500/30 transform -translate-x-6 sm:-translate-x-8 group-hover:from-blue-500/50 group-hover:to-green-500/50 transition-all duration-300"></div>
            
            <div className="relative mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 shadow-lg">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 border-3 sm:border-4 border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                1
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors duration-300">Search & Discover</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg px-2 group-hover:text-gray-300 transition-colors duration-300">
              Browse through hundreds of verified sports venues in your city. 
              Filter by sport, location, and price to find your perfect match.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="relative text-center group">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 sm:top-16 left-full w-12 sm:w-16 h-0.5 bg-gradient-to-r from-green-500/30 to-purple-500/30 transform -translate-x-6 sm:-translate-x-8 group-hover:from-green-500/50 group-hover:to-purple-500/50 transition-all duration-300"></div>
            
            <div className="relative mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-green-500/25 transition-all duration-300 shadow-lg">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 border-3 sm:border-4 border-green-500/30 text-green-400 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg group-hover:bg-green-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                2
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-green-400 transition-colors duration-300">Select & Schedule</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg px-2 group-hover:text-gray-300 transition-colors duration-300">
              Choose your preferred date and time slot from real-time availability. 
              See transparent pricing with no hidden fees.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="relative text-center group">
            <div className="relative mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 shadow-lg">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 border-3 sm:border-4 border-purple-500/30 text-purple-400 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg group-hover:bg-purple-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                3
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-400 transition-colors duration-300">Book & Play</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg px-2 group-hover:text-gray-300 transition-colors duration-300">
              Complete secure payment and receive instant confirmation. 
              Show up and enjoy your game - it's that simple!
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/booking"
            className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
          >
            Start Booking Now
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 