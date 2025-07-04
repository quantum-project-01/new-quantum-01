import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar, CheckCircle, Zap } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Get started with your sports venue booking in just three simple steps. 
            It's fast, secure, and hassle-free.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {/* Step 1 */}
          <div className="relative text-center group">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 sm:top-16 left-full w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-200 to-green-200 transform -translate-x-6 sm:-translate-x-8"></div>
            
            <div className="relative mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white border-3 sm:border-4 border-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg">
                1
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Search & Discover</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg px-2">
              Browse through hundreds of verified sports venues in your city. 
              Filter by sport, location, and price to find your perfect match.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="relative text-center group">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 sm:top-16 left-full w-12 sm:w-16 h-0.5 bg-gradient-to-r from-green-200 to-purple-200 transform -translate-x-6 sm:-translate-x-8"></div>
            
            <div className="relative mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white border-3 sm:border-4 border-green-100 text-green-600 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg">
                2
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Select & Schedule</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg px-2">
              Choose your preferred date and time slot from real-time availability. 
              See transparent pricing with no hidden fees.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="relative text-center group">
            <div className="relative mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white border-3 sm:border-4 border-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-lg">
                3
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Book & Play</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg px-2">
              Complete secure payment and receive instant confirmation. 
              Show up and enjoy your game - it's that simple!
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/venues"
            className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Booking Now
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 