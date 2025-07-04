import React, { useEffect, useRef, useState } from 'react';

interface SportCard {
  id: string;
  name: string;
  image: string;
  description: string;
  color: string;
}

const sportsData: SportCard[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    image: '🏸',
    description: 'Fast-paced racquet sport',
    color: 'bg-gradient-to-br from-green-400 to-green-600'
  },
  {
    id: 'cricket',
    name: 'Box Cricket',
    image: '🏏',
    description: 'Indoor cricket experience',
    color: 'bg-gradient-to-br from-orange-400 to-orange-600'
  },
  {
    id: 'padel',
    name: 'Padel',
    image: '🎾',
    description: 'Exciting racquet sport',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600'
  },
  {
    id: 'football',
    name: 'Football',
    image: '⚽',
    description: 'The beautiful game',
    color: 'bg-gradient-to-br from-purple-400 to-purple-600'
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    image: '🏓',
    description: 'Fun paddle sport',
    color: 'bg-gradient-to-br from-pink-400 to-pink-600'
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    image: '🏐',
    description: 'Team sport excitement',
    color: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
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

        // Update card transforms for stacking effect
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          let translateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = sportsData.length - index;

          if (index < cardIndex) {
            // Cards that have been revealed - stack them up
            translateY = -(cardIndex - index) * 20;
            scale = 0.95 - (cardIndex - index) * 0.05;
            opacity = 0.7;
            zIndex = index;
          } else if (index === cardIndex) {
            // Current active card
            translateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = sportsData.length;
          } else {
            // Cards not yet revealed - keep them below
            translateY = (index - cardIndex) * 100;
            scale = 0.8;
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
          card.style.transform = 'translateY(100px) scale(0.8)';
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
        } h-screen bg-gray-900 overflow-hidden`}
        style={{ zIndex: isSticky ? 10 : 1 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                40+ Sports
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover your perfect sport from our extensive collection of activities
            </p>
          </div>

          {/* Stacking Cards Container */}
          <div className="relative w-80 h-[500px] perspective-1000">
            {sportsData.map((sport, index) => (
              <div
                key={sport.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`absolute inset-0 rounded-2xl shadow-2xl transform-gpu transition-all duration-700 ease-out ${sport.color}`}
                style={{
                  transform: 'translateY(100px) scale(0.8)',
                  opacity: 0,
                  zIndex: sportsData.length - index,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative h-full p-8 flex flex-col items-center justify-center text-white">
                  {/* Sport Icon */}
                  <div className="text-7xl mb-6 transform hover:scale-110 transition-transform duration-300">
                    {sport.image}
                  </div>
                  
                  {/* Sport Name */}
                  <h3 className="text-3xl font-bold mb-3 text-center">
                    {sport.name}
                  </h3>
                  
                  {/* Sport Description */}
                  <p className="text-center text-white/90 mb-8 text-lg">
                    {sport.description}
                  </p>
                  
                  {/* Action Button */}
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    Book Now
                  </button>

                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
                  
                  {/* Card Number Indicator */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-12">
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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">
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
    </div>
  );
};

export default SportsSection; 