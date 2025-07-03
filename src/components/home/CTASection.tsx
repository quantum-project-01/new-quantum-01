import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Search, Users, Shield, CreditCard, Clock } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Dark Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
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
            className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:border-white transition-all duration-200"
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
  );
};

export default CTASection; 