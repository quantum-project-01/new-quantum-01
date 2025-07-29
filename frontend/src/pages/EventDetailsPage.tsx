import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  // Users, 
  // Ticket, 
  Star, 
  ArrowLeft, 
  Share2, 
  Heart,
  User,
  Building,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  venue: string;
  capacity: number;
  registeredUsers: number;
  ticketPrice: number;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
  organizer: string;
  organizerContact: {
    phone: string;
    email: string;
  };
  agenda: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  requirements: string[];
  benefits: string[];
  speakers?: Array<{
    name: string;
    title: string;
    bio: string;
    image: string;
  }>;
}

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const {  isAuthenticated } = useAuthStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock data for event details
  const mockEventDetails: Record<string, Event> = {
    '1': {
      id: '1',
      title: 'Quantum Gaming Championship',
      description: 'Join the ultimate gaming tournament featuring the latest esports titles. Compete with the best players and win exciting prizes.',
      longDescription: 'The Quantum Gaming Championship is the premier esports tournament in the region, bringing together the most skilled players from various gaming disciplines. This year\'s championship features multiple game titles including Valorant, CS:GO, League of Legends, and Dota 2. Participants will compete in a series of elimination rounds leading to the grand finale where winners will take home cash prizes worth over ₹500,000. The event also includes workshops on gaming strategies, meet-and-greet sessions with professional gamers, and exclusive merchandise stalls.',
      date: '2024-08-15',
      time: '18:00',
      endTime: '23:00',
      location: 'Quantum Arena, Sector 18',
      venue: 'Main Gaming Hall',
      capacity: 200,
      registeredUsers: 156,
      ticketPrice: 1500,
      category: 'Gaming',
      image: '/api/placeholder/800/400',
      featured: true,
      tags: ['Esports', 'Tournament', 'Gaming'],
      organizer: 'Quantum Events',
      organizerContact: {
        phone: '+91 98765 43210',
        email: 'events@quantum.com'
      },
      agenda: [
        { time: '18:00', title: 'Registration & Check-in', description: 'Player registration and equipment setup' },
        { time: '18:30', title: 'Opening Ceremony', description: 'Welcome address and tournament rules briefing' },
        { time: '19:00', title: 'Qualifying Rounds', description: 'Initial elimination rounds across all game titles' },
        { time: '21:00', title: 'Semi-Finals', description: 'Top players compete for final spots' },
        { time: '22:00', title: 'Grand Finals', description: 'Championship matches and prize distribution' },
        { time: '23:00', title: 'Closing Ceremony', description: 'Winner announcements and networking' }
      ],
      requirements: [
        'Valid ID proof for registration',
        'Own gaming peripherals (mouse, keyboard, headset)',
        'Age 16+ (minors need guardian consent)',
        'Basic gaming experience in chosen title'
      ],
      benefits: [
        'Cash prizes up to ₹100,000 for winners',
        'Gaming merchandise and goodies',
        'Networking with professional gamers',
        'Free refreshments and snacks',
        'Certificate of participation',
        'Exclusive tournament t-shirt'
      ],
      speakers: [
        {
          name: 'Alex "ProGamer" Singh',
          title: 'Professional Esports Player',
          bio: 'Former world champion with 5+ years of competitive gaming experience',
          image: '/api/placeholder/100/100'
        },
        {
          name: 'Sarah "StratMaster" Patel',
          title: 'Gaming Strategy Coach',
          bio: 'Renowned coach who has trained multiple championship-winning teams',
          image: '/api/placeholder/100/100'
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Tech Innovation Summit',
      description: 'Discover the latest trends in technology and innovation. Network with industry leaders and entrepreneurs.',
      longDescription: 'The Tech Innovation Summit brings together the brightest minds in technology, startups, and innovation. This comprehensive event features keynote speeches from industry leaders, panel discussions on emerging technologies, startup pitch competitions, and extensive networking opportunities. Attendees will gain insights into AI, blockchain, IoT, and other cutting-edge technologies shaping our future. The summit also includes hands-on workshops, product demonstrations, and exclusive access to beta technologies from leading tech companies.',
      date: '2024-08-20',
      time: '09:00',
      endTime: '18:00',
      location: 'Quantum Convention Center',
      venue: 'Conference Hall A',
      capacity: 500,
      registeredUsers: 342,
      ticketPrice: 2500,
      category: 'Technology',
      image: '/api/placeholder/800/400',
      featured: false,
      tags: ['Tech', 'Innovation', 'Networking'],
      organizer: 'Tech Hub',
      organizerContact: {
        phone: '+91 98765 43211',
        email: 'summit@techhub.com'
      },
      agenda: [
        { time: '09:00', title: 'Registration & Welcome Coffee', description: 'Check-in and networking breakfast' },
        { time: '10:00', title: 'Keynote: Future of AI', description: 'Opening keynote on artificial intelligence trends' },
        { time: '11:30', title: 'Panel: Startup Ecosystem', description: 'Discussion on startup challenges and opportunities' },
        { time: '13:00', title: 'Lunch & Networking', description: 'Networking lunch with industry leaders' },
        { time: '14:30', title: 'Tech Workshops', description: 'Hands-on workshops on emerging technologies' },
        { time: '16:00', title: 'Pitch Competition', description: 'Startup pitch presentations' },
        { time: '17:00', title: 'Closing & Awards', description: 'Award ceremony and closing remarks' }
      ],
      requirements: [
        'Valid ID for registration',
        'Laptop for workshop participation',
        'Business cards for networking',
        'Professional attire recommended'
      ],
      benefits: [
        'Access to exclusive tech demos',
        'Networking with 500+ professionals',
        'Certificate of attendance',
        'Free lunch and refreshments',
        'Workshop materials and resources',
        'Access to presentation slides'
      ],
      speakers: [
        {
          name: 'Dr. Rajesh Kumar',
          title: 'AI Research Director',
          bio: 'Leading AI researcher with 15+ years in machine learning',
          image: '/api/placeholder/100/100'
        },
        {
          name: 'Priya Sharma',
          title: 'Tech Entrepreneur',
          bio: 'Serial entrepreneur and founder of 3 successful tech startups',
          image: '/api/placeholder/100/100'
        }
      ]
    },
    '3': {
      id: '3',
      title: 'Music Festival 2024',
      description: 'Experience an unforgettable night of music with top artists and bands. Dance the night away under the stars.',
      longDescription: 'The Music Festival 2024 is the biggest musical celebration of the year, featuring a diverse lineup of artists across multiple genres. From indie rock to electronic dance music, classical to contemporary, this festival offers something for every music lover. The event spans multiple stages with continuous performances, food trucks offering international cuisine, art installations, and interactive experiences. Special VIP packages include backstage access, meet-and-greet opportunities, and premium viewing areas.',
      date: '2024-08-25',
      time: '19:00',
      endTime: '02:00',
      location: 'Quantum Outdoor Arena',
      venue: 'Main Stage',
      capacity: 1000,
      registeredUsers: 823,
      ticketPrice: 3000,
      category: 'Music',
      image: '/api/placeholder/800/400',
      featured: true,
      tags: ['Music', 'Festival', 'Entertainment'],
      organizer: 'Melody Productions',
      organizerContact: {
        phone: '+91 98765 43212',
        email: 'info@melodyproductions.com'
      },
      agenda: [
        { time: '19:00', title: 'Gates Open', description: 'Entry and setup time' },
        { time: '19:30', title: 'Opening Act', description: 'Local band performance' },
        { time: '20:30', title: 'Indie Rock Set', description: 'Featured indie rock performances' },
        { time: '22:00', title: 'Headliner Performance', description: 'Main artist performance' },
        { time: '23:30', title: 'DJ Set', description: 'Electronic dance music' },
        { time: '01:00', title: 'Closing Performance', description: 'Final acts and closing ceremony' }
      ],
      requirements: [
        'Valid ID and ticket',
        'No outside food or drinks',
        'Comfortable shoes recommended',
        'Weather-appropriate clothing'
      ],
      benefits: [
        'Access to all stages',
        'Food and beverage vendors',
        'Merchandise stalls',
        'Free parking',
        'Photo opportunities',
        'Festival souvenir'
      ]
    },
    '4': {
      id: '4',
      title: 'Startup Pitch Competition',
      description: 'Watch innovative startups pitch their ideas to investors. Be part of the next big breakthrough.',
      longDescription: 'The Startup Pitch Competition is where the next generation of entrepreneurs showcase their groundbreaking ideas to a panel of seasoned investors and industry experts. This high-energy event features 20 carefully selected startups across various sectors including fintech, healthtech, edtech, and sustainability. Each startup gets 5 minutes to pitch followed by Q&A from judges. The winning startup receives ₹500,000 in funding plus mentorship opportunities. Attendees witness innovation in action and network with the entrepreneurial ecosystem.',
      date: '2024-08-30',
      time: '14:00',
      endTime: '19:00',
      location: 'Quantum Business Center',
      venue: 'Auditorium',
      capacity: 300,
      registeredUsers: 187,
      ticketPrice: 1000,
      category: 'Business',
      image: '/api/placeholder/800/400',
      featured: false,
      tags: ['Startup', 'Business', 'Investment'],
      organizer: 'Startup Hub',
      organizerContact: {
        phone: '+91 98765 43213',
        email: 'events@startuphub.com'
      },
      agenda: [
        { time: '14:00', title: 'Registration & Networking', description: 'Check-in and pre-event networking' },
        { time: '14:30', title: 'Opening Remarks', description: 'Welcome and competition rules' },
        { time: '15:00', title: 'First Round Pitches', description: '10 startup presentations (Round 1)' },
        { time: '16:30', title: 'Break & Networking', description: 'Refreshments and networking break' },
        { time: '17:00', title: 'Second Round Pitches', description: '10 startup presentations (Round 2)' },
        { time: '18:30', title: 'Judging & Awards', description: 'Deliberation and winner announcement' }
      ],
      requirements: [
        'Business professional attire',
        'Valid ID for entry',
        'Business cards for networking',
        'Note-taking materials'
      ],
      benefits: [
        'Witness innovative pitches',
        'Network with investors',
        'Learn about new startups',
        'Free refreshments',
        'Access to pitch decks',
        'Networking directory'
      ],
      speakers: [
        {
          name: 'Vikram Agarwal',
          title: 'Venture Capitalist',
          bio: 'Managing Partner at leading VC firm with 50+ investments',
          image: '/api/placeholder/100/100'
        },
        {
          name: 'Anita Desai',
          title: 'Serial Entrepreneur',
          bio: 'Founded and exited 2 successful startups, now angel investor',
          image: '/api/placeholder/100/100'
        }
      ]
    },
    '5': {
      id: '5',
      title: 'Fitness Bootcamp',
      description: 'High-intensity workout session with professional trainers. Push your limits and achieve your fitness goals.',
      longDescription: 'The Fitness Bootcamp is an intensive, high-energy workout session designed to challenge participants of all fitness levels. Led by certified personal trainers, this outdoor bootcamp combines cardio, strength training, and functional movements in a motivating group environment. The session includes warm-up exercises, circuit training, team challenges, and cool-down stretches. Participants will learn proper form, get personalized tips, and be part of a supportive fitness community. All equipment is provided, and modifications are available for different fitness levels.',
      date: '2024-09-05',
      time: '06:00',
      endTime: '08:00',
      location: 'Quantum Fitness Center',
      venue: 'Outdoor Training Ground',
      capacity: 50,
      registeredUsers: 38,
      ticketPrice: 500,
      category: 'Fitness',
      image: '/api/placeholder/800/400',
      featured: false,
      tags: ['Fitness', 'Health', 'Training'],
      organizer: 'FitLife',
      organizerContact: {
        phone: '+91 98765 43214',
        email: 'bootcamp@fitlife.com'
      },
      agenda: [
        { time: '06:00', title: 'Check-in & Warm-up', description: 'Registration and dynamic warm-up exercises' },
        { time: '06:15', title: 'Circuit Training', description: 'High-intensity circuit workouts' },
        { time: '06:45', title: 'Team Challenges', description: 'Group fitness challenges and competitions' },
        { time: '07:15', title: 'Strength Training', description: 'Functional strength exercises' },
        { time: '07:45', title: 'Cool Down & Stretch', description: 'Recovery stretches and breathing exercises' }
      ],
      requirements: [
        'Comfortable workout attire',
        'Athletic shoes required',
        'Water bottle (mandatory)',
        'Towel for sweat',
        'Basic fitness level recommended'
      ],
      benefits: [
        'Professional trainer guidance',
        'All equipment provided',
        'Fitness assessment',
        'Workout plan recommendations',
        'Healthy snack after session',
        'Access to fitness community group'
      ],
      speakers: [
        {
          name: 'Coach Mike Thompson',
          title: 'Certified Personal Trainer',
          bio: 'NASM certified trainer with 8+ years experience in group fitness',
          image: '/api/placeholder/100/100'
        },
        {
          name: 'Sarah Williams',
          title: 'Nutrition Specialist',
          bio: 'Registered dietitian specializing in sports nutrition',
          image: '/api/placeholder/100/100'
        }
      ]
    },
    '6': {
      id: '6',
      title: 'Art Exhibition Gala',
      description: 'Explore contemporary art from local and international artists. An evening of culture and creativity.',
      longDescription: 'The Art Exhibition Gala is an elegant evening celebrating contemporary art and creativity. This exclusive event showcases works from both emerging local artists and established international creators, spanning various mediums including paintings, sculptures, digital art, and interactive installations. The gala includes guided tours by art curators, wine and cheese reception, live art demonstrations, and opportunities to meet the artists. Guests can purchase artwork with proceeds supporting local art education programs. The evening concludes with an awards ceremony recognizing outstanding artistic achievements.',
      date: '2024-09-10',
      time: '18:30',
      endTime: '22:00',
      location: 'Quantum Art Gallery',
      venue: 'Main Exhibition Hall',
      capacity: 150,
      registeredUsers: 89,
      ticketPrice: 800,
      category: 'Art',
      image: '/api/placeholder/800/400',
      featured: false,
      tags: ['Art', 'Culture', 'Exhibition'],
      organizer: 'Art Collective',
      organizerContact: {
        phone: '+91 98765 43215',
        email: 'gala@artcollective.com'
      },
      agenda: [
        { time: '18:30', title: 'Welcome Reception', description: 'Check-in with welcome drinks and appetizers' },
        { time: '19:00', title: 'Gallery Opening', description: 'Official opening and curator introduction' },
        { time: '19:30', title: 'Guided Tours', description: 'Curated tours of featured exhibitions' },
        { time: '20:30', title: 'Artist Meet & Greet', description: 'Interaction with featured artists' },
        { time: '21:00', title: 'Live Art Demo', description: 'Live painting and sculpture demonstrations' },
        { time: '21:30', title: 'Awards Ceremony', description: 'Recognition of outstanding artworks' }
      ],
      requirements: [
        'Smart casual or formal attire',
        'Valid ID for entry',
        'Photography restrictions apply',
        'Respectful gallery etiquette'
      ],
      benefits: [
        'Access to exclusive artworks',
        'Meet renowned artists',
        'Complimentary wine and appetizers',
        'Art purchase opportunities',
        'Curator-led tours',
        'Exhibition catalog'
      ],
      speakers: [
        {
          name: 'Isabella Rodriguez',
          title: 'Art Curator',
          bio: 'International art curator with 12+ years in contemporary art',
          image: '/api/placeholder/100/100'
        },
        {
          name: 'David Chen',
          title: 'Featured Artist',
          bio: 'Award-winning contemporary artist known for mixed-media installations',
          image: '/api/placeholder/100/100'
        }
      ]
    }
    // Add more mock events as needed
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (eventId && mockEventDetails[eventId]) {
        setEvent(mockEventDetails[eventId]);
        // Simulate checking if user is registered
        setIsRegistered(Math.random() > 0.7);
        setIsFavorited(Math.random() > 0.5);
      }
      setLoading(false);
    }, 1000);
  }, [eventId]);

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Handle registration logic
    setIsRegistered(true);
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getAvailabilityStatus = () => {
    if (!event) return { text: '', color: '', icon: null };
    
    const percentage = (event.registeredUsers / event.capacity) * 100;
    if (percentage >= 100) {
      return { text: 'Sold Out', color: 'text-red-400', icon: <AlertCircle className="h-4 w-4" /> };
    } else if (percentage >= 90) {
      return { text: 'Almost Full', color: 'text-yellow-400', icon: <AlertCircle className="h-4 w-4" /> };
    } else {
      return { text: 'Available', color: 'text-green-400', icon: <CheckCircle className="h-4 w-4" /> };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
            <Link to="/events" className="text-blue-400 hover:text-blue-300">
              ← Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availabilityStatus = getAvailabilityStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-gray-700/50">
              {/* Event Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <Calendar className="h-24 w-24 text-blue-400 opacity-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                
                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      <Star className="h-4 w-4" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={handleFavorite}
                    className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                      isFavorited 
                        ? 'bg-red-500/80 text-white' 
                        : 'bg-gray-800/80 text-gray-300 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-gray-800/80 backdrop-blur-md rounded-full text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {event.title}
                </h1>

                <p className="text-gray-300 text-lg mb-6">
                  {event.description}
                </p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{event.time} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Building className="h-5 w-5 mr-3 text-blue-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Long Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">About This Event</h3>
                  <div className="text-gray-300 leading-relaxed">
                    <p className={showFullDescription ? '' : 'line-clamp-3'}>
                      {event.longDescription}
                    </p>
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-400 hover:text-blue-300 mt-2 text-sm"
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Agenda */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Event Agenda</h3>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex-shrink-0 w-16 text-blue-400 font-semibold">
                      {item.time}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Featured Speakers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{speaker.name}</h4>
                        <p className="text-blue-400 text-sm mb-2">{speaker.title}</p>
                        <p className="text-gray-400 text-sm">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">What You'll Get</h3>
                <ul className="space-y-2">
                  {event.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">₹{event.ticketPrice}</div>
                <div className="text-gray-400">per ticket</div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                {availabilityStatus.icon}
                <span className={`font-semibold ${availabilityStatus.color}`}>
                  {availabilityStatus.text}
                </span>
              </div>

              {/* Capacity Info */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                <span>Registered</span>
                <span>{event.registeredUsers}/{event.capacity}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((event.registeredUsers / event.capacity) * 100, 100)}%` }}
                ></div>
              </div>

              {/* Registration Button */}
              {isRegistered ? (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">You're Registered!</span>
                  </div>
                  <button className="w-full py-3 bg-gray-600 text-gray-400 rounded-xl font-semibold cursor-not-allowed">
                    Already Registered
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={event.registeredUsers >= event.capacity}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    event.registeredUsers >= event.capacity
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105'
                  }`}
                >
                  {event.registeredUsers >= event.capacity ? 'Sold Out' : 'Register Now'}
                </button>
              )}

              {!isAuthenticated && (
                <p className="text-center text-gray-400 text-sm mt-3">
                  <Link to="/login" className="text-blue-400 hover:text-blue-300">
                    Login
                  </Link>{' '}
                  required to register
                </p>
              )}
            </div>

            {/* Organizer Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Organizer</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <User className="h-5 w-5 mr-3 text-blue-400" />
                  <span>{event.organizer}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  <span>{event.organizerContact.phone}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <span>{event.organizerContact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventDetailsPage;
