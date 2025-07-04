import React, { useEffect, useRef, useState } from 'react';

interface SportCard {
  id: string;
  name: string;
  image: string;
  description: string;
  color: string;
  backgroundImage: string;
  features: string[];
  venues: string;
  players: string;
  rating: number;
}

const sportsData: SportCard[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    image: '🏸',
    description: 'Fast-paced racquet sport with precision and agility',
    color: 'from-green-500 to-emerald-600',
    backgroundImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: ['Indoor Courts', 'Professional Flooring', 'Shuttlecocks Included', 'Tournament Hosting'],
    venues: '200+',
    players: '6K+',
    rating: 4.6
  },
  {
    id: 'cricket',
    name: 'Box Cricket',
    image: '🏏',
    description: 'Indoor cricket experience with all the excitement',
    color: 'from-orange-500 to-red-600',
    backgroundImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: ['Indoor Pitches', 'Soft Ball', 'Equipment Provided', 'Team Tournaments'],
    venues: '150+',
    players: '4.5K+',
    rating: 4.7
  },
  {
    id: 'padel',
    name: 'Padel',
    image: '🎾',
    description: 'Exciting racquet sport combining tennis and squash',
    color: 'from-blue-500 to-cyan-600',
    backgroundImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: ['Glass Courts', 'Professional Equipment', 'Coaching Available', 'Doubles Play'],
    venues: '80+',
    players: '2.5K+',
    rating: 4.8
  },
  {
    id: 'football',
    name: 'Football',
    image: '⚽',
    description: 'The beautiful game on premium turf fields',
    color: 'from-purple-500 to-pink-600',
    backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: ['Professional Turf', 'Floodlights', 'Changing Rooms', 'Equipment Rental'],
    venues: '180+',
    players: '8K+',
    rating: 4.9
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    image: '🏓',
    description: 'Fun paddle sport thats easy to learn and addictive',
    color: 'from-pink-500 to-rose-600',
    backgroundImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: ['Outdoor Courts', 'Paddle Rental', 'Beginner Classes', 'Tournament Play'],
    venues: '120+',
    players: '3.5K+',
    rating: 4.5
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    image: '🏐',
    description: 'Team sport excitement with beach and indoor options',
    color: 'from-yellow-500 to-orange-600',
    backgroundImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    features: ['Beach & Indoor', 'Professional Nets', 'Team Building', 'League Play'],
    venues: '90+',
    players: '4K+',
    rating: 4.6
  }
];

const SportsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !sectionRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if we're in the sticky zone
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      
      const shouldBeSticky = containerTop <= 0 && containerBottom > windowHeight;
      setIsSticky(shouldBeSticky);

      if (shouldBeSticky) {
        // Calculate scroll progress within the container
        const scrollProgress = Math.abs(containerTop) / (containerRect.height - windowHeight);
        const cardIndex = Math.min(
          sportsData.length - 1,
          Math.floor(scrollProgress * sportsData.length)
        );
        setCurrentCard(cardIndex);

        // Update card transforms for smooth stacking effect
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          let translateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = sportsData.length - index;

          if (index < cardIndex) {
            // Cards that have been revealed - stack them up with smooth sliding
            const stackOffset = (cardIndex - index) * 60; // Reduced stack offset for smoother effect
            translateY = -stackOffset;
            scale = 1 - (cardIndex - index) * 0.03; // Subtle scale reduction
            opacity = 0.8 - (cardIndex - index) * 0.1; // Gradual opacity fade
            zIndex = index;
          } else if (index === cardIndex) {
            // Current active card - fully visible
            translateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = sportsData.length;
          } else {
            // Cards not yet revealed - positioned below with smooth entrance
            translateY = (index - cardIndex) * 20; // Subtle offset for upcoming cards
            scale = 0.95;
            opacity = 0;
            zIndex = sportsData.length - index;
          }

          card.style.transform = `translateY(${translateY}px) scale(${scale})`;
          card.style.opacity = opacity.toString();
          card.style.zIndex = zIndex.toString();
        });
      } else {
        // Reset cards when not sticky
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          card.style.transform = 'translateY(20px) scale(0.95)';
          card.style.opacity = '0';
          card.style.zIndex = (sportsData.length - index).toString();
        });
        setCurrentCard(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: `${sportsData.length * 100}vh` }}>
      <div
        ref={sectionRef}
        className={`${
          isSticky ? 'fixed top-0 left-0 w-full' : 'relative'
        } h-screen overflow-hidden bg-gray-900`}
        style={{ zIndex: isSticky ? 10 : 1 }}
      >
        {/* Full-Screen Sport Cards */}
        {sportsData.map((sport, index) => (
          <div
            key={sport.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="absolute inset-0 transition-all duration-1000 ease-out"
            style={{
              opacity: 0,
              transform: 'translateY(20px) scale(0.95)',
              zIndex: sportsData.length - index,
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${sport.backgroundImage})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-20`}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center pt-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Left Content */}
                  <div className="text-white space-y-6 text-center lg:text-left">
                    {/* Sport Icon */}
                    <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 transform hover:scale-110 transition-transform duration-300">
                      {sport.image}
                    </div>

                    {/* Sport Name */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {sport.name}
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      {sport.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white">{sport.venues}</div>
                        <div className="text-sm text-gray-300">Venues</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white">{sport.players}</div>
                        <div className="text-sm text-gray-300">Players</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white">{sport.rating}</div>
                        <div className="text-sm text-gray-300">Rating</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button className="group inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                        <span>Book {sport.name} Now</span>
                        <svg className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Right Content - Features Card */}
                  <div className="hidden lg:block">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6">Why Choose {sport.name}?</h3>
                      
                      <div className="space-y-4">
                        {sport.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                            <div className={`w-3 h-3 bg-gradient-to-r ${sport.color} rounded-full`}></div>
                            <span className="text-white font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/20">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Starting from</span>
                          <span className="text-2xl font-bold text-white">₹199/hr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Number Indicator */}
            <div className="absolute top-20 right-8 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {index + 1}
            </div>
          </div>
        ))}

        {/* Section Header - Fixed at top */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 px-4 drop-shadow-lg">
            Choose from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              40+ Sports
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 px-4 drop-shadow-md">
            Discover your perfect sport from our extensive collection of activities
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex justify-center items-center space-x-2 mb-4">
            {sportsData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentCard 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-white/60 text-center text-sm">
            {currentCard + 1} of {sportsData.length} sports
          </p>
        </div>

        {/* Scroll Indicator */}
        {isSticky && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 z-50">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2 text-center px-4">
                {currentCard < sportsData.length - 1 ? 'Scroll to see next sport' : 'Scroll to continue'}
              </span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full relative">
                <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsSection; 