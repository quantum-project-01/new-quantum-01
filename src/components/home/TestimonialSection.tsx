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
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      accent: 'text-blue-600',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-blue-100'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      accent: 'text-green-600',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-green-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      accent: 'text-purple-600',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-purple-100'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      accent: 'text-yellow-600',
      gradientFrom: 'from-yellow-50',
      gradientTo: 'to-yellow-100'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      accent: 'text-red-600',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-red-100'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      accent: 'text-indigo-600',
      gradientFrom: 'from-indigo-50',
      gradientTo: 'to-indigo-100'
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
          
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />

      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <Quote className="h-4 w-4 mr-2" />
              Game Changing Stories
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What Our Players Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of happy players who have found their perfect game through our platform.
              Every booking creates memorable experiences and lasting connections.
            </p>
          </div>

          {/* Animated Testimonials Container */}
          <div className="relative overflow-hidden">
            {/* Scrolling Container */}
            <div className="flex animate-scroll-right pause-animation">
              {duplicatedTestimonials.map((testimonial, index) => {
                const colors = colorClasses[testimonial.colorScheme];

                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className={`group relative bg-white p-8 rounded-3xl border ${colors.border} hover:shadow-xl transition-all duration-300 hover:border-opacity-50 flex-shrink-0 w-96 mx-4 hover:scale-105 hover:z-20`}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} ${colors.gradientTo} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                    <div className="relative">
                      {/* Quote Icon */}
                      <div className={`w-12 h-12 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Quote className={`h-6 w-6 ${colors.accent}`} />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-base line-clamp-4">
                        "{testimonial.text}"
                      </p>

                      {/* User Info */}
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform duration-300`}>
                            <div className={`w-2 h-2 ${colors.accent.replace('text-', 'bg-')} rounded-full`}></div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.sport}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Fade Gradient - positioned at the beginning of testimonials */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>

            {/* Right Fade Gradient - positioned at the end of testimonials */}
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
              <span>Share Your Story</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection; 