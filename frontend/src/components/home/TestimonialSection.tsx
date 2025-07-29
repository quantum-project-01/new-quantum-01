import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  sport: string;
  colorScheme: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo';
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Anand',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Cricket has always been my passion, and at St. Andrew\'s Turf Park in Bandra, this passion comes alive. Every match adds a new chapter to my cricketing journey, creating unforgettable memories.',
      sport: 'Cricket',
      colorScheme: 'blue'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The badminton courts here are exceptional! The booking process was seamless, and the facility exceeded my expectations. Perfect for both casual games and serious training.',
      sport: 'Badminton',
      colorScheme: 'green'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Found the perfect football ground for our weekend matches. The venue quality is top-notch, and the instant booking feature saved us so much time. Highly recommended!',
      sport: 'Football',
      colorScheme: 'purple'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      location: 'Pune',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'The tennis courts are maintained beautifully. Booking was instant, and the customer support was excellent when I needed to reschedule. Will definitely book again!',
      sport: 'Tennis',
      colorScheme: 'yellow'
    },
    {
      id: 5,
      name: 'Arjun Singh',
      location: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Amazing basketball courts with proper lighting and flooring. The venue was exactly as shown in photos. Great platform for finding quality sports venues!',
      sport: 'Basketball',
      colorScheme: 'red'
    },
    {
      id: 6,
      name: 'Meera Reddy',
      location: 'Chennai',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Excellent swimming pool facilities with clean changing rooms and professional staff. The booking system is user-friendly and the prices are very reasonable.',
      sport: 'Swimming',
      colorScheme: 'indigo'
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      accent: 'text-blue-400',
      gradientFrom: 'from-blue-500/10',
      gradientTo: 'to-blue-500/5',
      hoverBorder: 'hover:border-blue-500/30'
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      accent: 'text-green-400',
      gradientFrom: 'from-green-500/10',
      gradientTo: 'to-green-500/5',
      hoverBorder: 'hover:border-green-500/30'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      accent: 'text-purple-400',
      gradientFrom: 'from-purple-500/10',
      gradientTo: 'to-purple-500/5',
      hoverBorder: 'hover:border-purple-500/30'
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      accent: 'text-yellow-400',
      gradientFrom: 'from-yellow-500/10',
      gradientTo: 'to-yellow-500/5',
      hoverBorder: 'hover:border-yellow-500/30'
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      accent: 'text-red-400',
      gradientFrom: 'from-red-500/10',
      gradientTo: 'to-red-500/5',
      hoverBorder: 'hover:border-red-500/30'
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      accent: 'text-indigo-400',
      gradientFrom: 'from-indigo-500/10',
      gradientTo: 'to-indigo-500/5',
      hoverBorder: 'hover:border-indigo-500/30'
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <>
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll-right {
            animation: scroll-right 20s linear infinite;
          }
          
          .pause-animation:hover {
            animation-play-state: paused;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          /* Mobile specific animations */
          @media (max-width: 768px) {
            .animate-scroll-right {
              animation: scroll-right 30s linear infinite;
            }
          }
          
          /* Tablet specific animations */
          @media (min-width: 769px) and (max-width: 1024px) {
            .animate-scroll-right {
              animation: scroll-right 25s linear infinite;
            }
          }
        `
      }} />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-900 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/3 to-yellow-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
              <Quote className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-pulse" />
              Game Changing Stories
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              What Our Players Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands of happy players who have found their perfect game through our platform.
              Every booking creates memorable experiences and lasting connections.
            </p>
          </div>

          {/* Animated Testimonials Container */}
          <div className="relative overflow-hidden">
            {/* Scrolling Container */}
            <div className="flex animate-scroll-right pause-animation z-10">
              {duplicatedTestimonials.map((testimonial, index) => {
                const colors = colorClasses[testimonial.colorScheme];

                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className={`group relative bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-700/50 ${colors.hoverBorder} hover:shadow-2xl transition-all duration-500 hover:border-opacity-50 flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 mx-2 sm:mx-3 md:mx-4 hover:scale-105 hover:z-20 transform hover:-translate-y-2`}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <div className="relative">
                      {/* Quote Icon */}
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${colors.bg} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Quote className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${colors.accent} group-hover:scale-110 transition-transform duration-300`} />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-3 sm:mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base line-clamp-3 sm:line-clamp-4 group-hover:text-gray-200 transition-colors duration-300">
                        "{testimonial.text}"
                      </p>

                      {/* User Info */}
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-600 shadow-sm group-hover:scale-110 group-hover:border-gray-500 transition-all duration-300"
                          />
                          <div className={`absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 ${colors.bg} rounded-full flex items-center justify-center border-2 border-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${colors.accent.replace('text-', 'bg-')} rounded-full`}></div>
                          </div>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <h4 className="font-semibold text-white text-sm sm:text-base group-hover:text-gray-100 transition-colors duration-300">{testimonial.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{testimonial.location} • {testimonial.sport}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Glow */}
                    <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${colors.gradientFrom} blur-xl`}></div>
                  </div>
                );
              })}
            </div>

            {/* Left Fade Gradient - positioned at the beginning of testimonials */}
            <div className="absolute left-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>

            {/* Right Fade Gradient - positioned at the end of testimonials */}
            <div className="absolute right-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="inline-flex items-center px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer text-sm sm:text-base group">
              <span className="group-hover:scale-110 transition-transform duration-300">Share Your Story</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection; 