import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Shield, Star, Users, Calendar, Search, CheckCircle, Zap, Award, Heart, Smartphone, CreditCard, ChevronDown } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Book instantly across 1000+ venues
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Book Your Perfect Game,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anytime, Anywhere
              </span>
            </h1>

            {/* Subtitle */}
            {/* <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover and book premium sports venues instantly. From basketball courts to football fields, 
              find your perfect game space in seconds.
            </p> */}

            {/* Search Form */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Venue Name Input */}
                  <div className="md:col-span-1">
                    <input
                      type="text"
                      placeholder="Search Venue Name"
                      className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  {/* Sport Selection */}
                  <div className="md:col-span-1">
                    <select className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer">
                      <option value="" className="text-gray-900">Select Sport</option>
                      <option value="football" className="text-gray-900">Football</option>
                      <option value="basketball" className="text-gray-900">Basketball</option>
                      <option value="tennis" className="text-gray-900">Tennis</option>
                      <option value="badminton" className="text-gray-900">Badminton</option>
                      <option value="cricket" className="text-gray-900">Cricket</option>
                    </select>
                  </div>

                  {/* City Selection */}
                  <div className="md:col-span-1">
                    <select className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer">
                      <option value="" className="text-gray-900">Select City</option>
                      <option value="mumbai" className="text-gray-900">Mumbai</option>
                      <option value="delhi" className="text-gray-900">Delhi</option>
                      <option value="bangalore" className="text-gray-900">Bangalore</option>
                      <option value="hyderabad" className="text-gray-900">Hyderabad</option>
                      <option value="pune" className="text-gray-900">Pune</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-1">
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                      <ArrowRight className="h-5 w-5" />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                  <div className="text-white/70">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
                  <div className="text-white/70">Happy Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
                  <div className="text-white/70">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/70">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/70" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get started with your sports venue booking in just three simple steps. 
              It's fast, secure, and hassle-free.
            </p>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div className="relative text-center group">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-16 left-full w-16 h-0.5 bg-gradient-to-r from-blue-200 to-green-200 transform -translate-x-8"></div>
              
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-4 border-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Browse through hundreds of verified sports venues in your city. 
                Filter by sport, location, and price to find your perfect match.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="relative text-center group">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-16 left-full w-16 h-0.5 bg-gradient-to-r from-green-200 to-purple-200 transform -translate-x-8"></div>
              
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-4 border-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Select & Schedule</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Choose your preferred date and time slot from real-time availability. 
                See transparent pricing with no hidden fees.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-4 border-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Book & Play</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Complete secure payment and receive instant confirmation. 
                Show up and enjoy your game - it's that simple!
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link
              to="/venues"
              className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Booking Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We've built the most comprehensive sports venue booking platform 
              with features that make booking effortless and playing enjoyable.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <Zap className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Booking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Book your slot instantly with real-time availability and immediate confirmation. 
                  No waiting, no delays.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <Shield className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Payments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pay securely with multiple payment options including cards, UPI, and wallets. 
                  Full refund protection guaranteed.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <Award className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Venues</h3>
                <p className="text-gray-600 leading-relaxed">
                  All venues are personally verified with genuine photos, reviews, 
                  and quality standards you can trust.
                </p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-yellow-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                  <MapPin className="h-7 w-7 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find venues near you with GPS integration, detailed directions, 
                  and accurate location information.
                </p>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                  <Heart className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join sports events, find teammates, and connect with fellow 
                  sports enthusiasts in your area.
                </p>
              </div>
            </div>
            
            {/* Feature 6 */}
            <div className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                  <Smartphone className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimized mobile experience with easy rescheduling, 
                  cancellation policies, and booking management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Star className="h-4 w-4 mr-2" />
            Join 10,000+ Happy Users
          </div>
          
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Book Your 
            <span className="block text-yellow-300">Next Game?</span>
          </h2>
          
          {/* Description */}
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of sports enthusiasts who trust Quantum for their venue booking needs. 
            Start your fitness journey today!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/venues"
              className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              <Search className="mr-3 h-5 w-5" />
              Find Venues Now
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-bold rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all duration-200 backdrop-blur-sm"
            >
              <Users className="mr-3 h-5 w-5" />
              Create Free Account
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-16 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-yellow-400" />
              <span>Instant Refunds</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 