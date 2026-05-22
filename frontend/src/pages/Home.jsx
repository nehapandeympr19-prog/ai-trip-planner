

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IntroVideoSection from "@/components/IntroVideoSection";
import DestinationModal from "@/components/DestinationModal"; // New component

export default function Home() {
  const [bg, setBg] = useState(
    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
  );
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [recentTrips, setRecentTrips] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Track scroll for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load recent trips from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentTrips")) || [];
    setRecentTrips(stored);
  }, []);

  const backgrounds = {
    beach: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    mountain: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
    culture: "url('https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba')",
  };

  // Enhanced destinations with AI-generated content
  const destinations = {
    beach: [
      { 
        id: "bali", 
        name: "Bali", 
        country: "Indonesia", 
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", 
        type: "Relaxing",
        highlights: ["Stunning beaches with black sand", "Vibrant coral reefs for snorkeling", "Ancient temples and rich culture"],
        photos: [
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2",
          "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
          "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
        ],
        cost: { budget: "$800", midRange: "$1500", luxury: "$3000" },
        experiences: ["Sunset at Uluwatu Temple", "Rice terrace trekking", "Traditional Balinese massage"]
      },
      { 
        id: "maldives", 
        name: "Maldives", 
        country: "Maldives", 
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", 
        type: "Luxury",
        highlights: ["Overwater bungalows", "Crystal clear turquoise waters", "Private island resorts"],
        photos: [
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
        ],
        cost: { budget: "$1200", midRange: "$2500", luxury: "$5000" },
        experiences: ["Snorkeling with manta rays", "Private sandbank picnic", "Underwater restaurant dining"]
      },
      { 
        id: "santorini", 
        name: "Santorini", 
        country: "Greece", 
        img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff", 
        type: "Romantic",
        highlights: ["Iconic blue-domed churches", "Spectacular sunset views", "Volcanic beaches with unique colors"],
        photos: [
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
          "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
          "https://images.unsplash.com/photo-1536152470836-b943b246224c"
        ],
        cost: { budget: "$1000", midRange: "$2000", luxury: "$4000" },
        experiences: ["Wine tasting in ancient vineyards", "Sunset cruise around caldera", "Exploring ancient Akrotiri ruins"]
      }
    ],
    mountain: [
      { 
        id: "swiss-alps", 
        name: "Swiss Alps", 
        country: "Switzerland", 
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", 
        type: "Adventure",
        highlights: ["Majestic Matterhorn views", "World-class ski resorts", "Picturesque alpine villages"],
        photos: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          "https://images.unsplash.com/photo-1578632749014-ca77efd052eb",
          "https://images.unsplash.com/photo-1578632749014-ca77efd052eb"
        ],
        cost: { budget: "$1500", midRange: "$3000", luxury: "$6000" },
        experiences: ["Cogwheel train to Jungfraujoch", "Hiking the Eiger Trail", "Chocolate factory tour"]
      },
      { 
        id: "nepal", 
        name: "Nepal Himalayas", 
        country: "Nepal", 
        img: "https://images.unsplash.com/photo-1505731132164-cca3e6ec4b7a", 
        type: "Adventure",
        highlights: ["Everest Base Camp trek", "Ancient Buddhist monasteries", "Rich Sherpa culture"],
        photos: [
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
          "https://images.unsplash.com/photo-1580651315530-69c7e11a2d93",
          "https://images.unsplash.com/photo-1564507592333-c60657eea523"
        ],
        cost: { budget: "$800", midRange: "$1500", luxury: "$3000" },
        experiences: ["Trek to Annapurna Base Camp", "Explore Kathmandu's Durbar Square", "White water rafting in Trishuli River"]
      },
      { 
        id: "rockies", 
        name: "Rocky Mountains", 
        country: "USA", 
        img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad", 
        type: "Adventure",
        highlights: ["Banff National Park beauty", "Wildlife spotting opportunities", "Stunning glacial lakes"],
        photos: [
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
          "https://images.unsplash.com/photo-1464822759844-d150ae4d4dd6"
        ],
        cost: { budget: "$1000", midRange: "$2000", luxury: "$3500" },
        experiences: ["Lake Louise canoeing", "Wildlife safari in Jasper", "Icefields Parkway scenic drive"]
      },
      { 
        id: "dolomites", 
        name: "Italian Dolomites", 
        country: "Italy", 
        img: "https://images.unsplash.com/photo-1594736797933-d0d69e0f8d78", 
        type: "Scenic",
        highlights: ["Dramatic limestone peaks", "UNESCO World Heritage site", "Alpine lakes with emerald waters"],
        photos: [
          "https://images.unsplash.com/photo-1594736797933-d0d69e0f8d78",
          "https://images.unsplash.com/photo-1570804433746-4e0e4a7c6acf",
          "https://images.unsplash.com/photo-1551632811-561732d1e306"
        ],
        cost: { budget: "$1200", midRange: "$2500", luxury: "$4500" },
        experiences: ["Via Ferrata climbing routes", "Cable car to Seceda peaks", "Tasting South Tyrolean cuisine"]
      }
    ],
    culture: [
      { 
        id: "paris", 
        name: "Paris", 
        country: "France", 
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", 
        type: "Romantic",
        highlights: ["Eiffel Tower and Louvre Museum", "Champs-Élysées shopping", "Bohemian Montmartre district"],
        photos: [
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
          "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f"
        ],
        cost: { budget: "$1200", midRange: "$2500", luxury: "$4500" },
        experiences: ["Seine River dinner cruise", "Montmartre artists' square", "Versailles Palace day trip"]
      },
      { 
        id: "kyoto", 
        name: "Kyoto", 
        country: "Japan", 
        img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba", 
        type: "Traditional",
        highlights: ["Ancient temples and shrines", "Geisha culture in Gion", "Beautiful cherry blossoms"],
        photos: [
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
          "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1"
        ],
        cost: { budget: "$1000", midRange: "$2000", luxury: "$3500" },
        experiences: ["Tea ceremony with maiko", "Fushimi Inari shrine hike", "Traditional kaiseki meal"]
      },
      { 
        id: "rome", 
        name: "Rome", 
        country: "Italy", 
        img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5", 
        type: "Historical",
        highlights: ["Colosseum and Roman Forum", "Vatican City and Sistine Chapel", "Trevi Fountain legends"],
        photos: [
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
          "https://images.unsplash.com/photo-1531572753322-ad063cecc140",
          "https://images.unsplash.com/photo-1555992826-5b7bc038c3a8"
        ],
        cost: { budget: "$1000", midRange: "$2000", luxury: "$4000" },
        experiences: ["Gladiator school experience", "Vatican museums early access", "Cooking class in Trastevere"]
      },
      { 
        id: "istanbul", 
        name: "Istanbul", 
        country: "Turkey", 
        img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200", 
        type: "Cultural",
        highlights: ["Hagia Sophia and Blue Mosque", "Grand Bazaar shopping experience", "Bosphorus Strait cruise"],
        photos: [
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
          "https://images.unsplash.com/photo-1586611296783-141dD69b42d9",
          "https://images.unsplash.com/photo-1594223274512-ad4803739b7c"
        ],
        cost: { budget: "$800", midRange: "$1500", luxury: "$2800" },
        experiences: ["Turkish bath experience", "Spice Market tasting tour", "Whirling Dervishes ceremony"]
      }
    ],
  };

  const filters = ["Relaxing", "Adventure", "Family", "Luxury", "Romantic", "Historical", "Scenic", "Traditional"];

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const handleStartPlanning = (destination) => {
    // Pre-fill the trip planner with destination info
    navigate("/plan", { 
      state: { 
        prefill: {
          destination: destination.name,
          days: "7", // Default 7 days
          budget: "medium",
          interests: [destination.type]
        }
      }
    });
  };

  return (
    <div className="w-full">
      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartPlanning={handleStartPlanning}
      />

      {/* Hero Section */}
      <div
        className="h-screen w-full bg-cover bg-center relative text-white transition-all duration-700"
        style={{ backgroundImage: bg }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4">
            Plan Your Dream Trip Today
          </h1>
          <p className="mt-4 text-lg lg:text-xl max-w-2xl">
            Tell us your preferences, and we'll create a personalized travel plan for you.
          </p>

          {/* Theme Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {Object.keys(backgrounds).map((theme, index) => (
              <motion.div
                key={theme}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              >
                <Button
                  className={`px-8 py-3 text-lg rounded-full transition-all duration-300 ${
                    selectedTheme === theme 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl scale-110" 
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  }`}
                  onClick={() => {
                    setBg(backgrounds[theme]);
                    setSelectedTheme(theme);
                    setSelectedFilter(null);
                  }}
                >
                  {theme === 'mountain' ? '🏔️ ' : theme === 'beach' ? '🏖️ ' : '🏛️ '}
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Filters */}
          {selectedTheme && (
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {filters.map((filter, index) => (
                <motion.div
                  key={filter}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Button
                    variant={selectedFilter === filter ? "default" : "outline"}
                    className={`rounded-full px-6 py-2 transition-all ${
                      selectedFilter === filter 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                        : "bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                    }`}
                    onClick={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
                  >
                    {filter}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Button
              className="px-12 py-6 text-lg rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-110 hover:shadow-2xl transition-all duration-300 font-bold"
              onClick={() => navigate("/plan")}
            >
              🚀 Plan My Trip
            </Button>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-10 text-white text-3xl animate-bounce"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ⬇️
          </motion.div>
        </div>
      </div>

      {/* Intro Video Section */}
      <IntroVideoSection />

      {/* Recent Trips Section */}
      {recentTrips.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ✈️ Your Recent Trips
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {recentTrips.map((trip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={trip.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828"}
                    alt={trip.destination}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{trip.destination}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      <span className="font-semibold">{trip.days} days</span> • 
                      <span className="capitalize"> {trip.budget} budget</span>
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-lg transition-all"
                      onClick={() => navigate("/itinerary", { state: { itinerary: trip.plan, tripMeta: trip, hotels: trip.hotels || [] } })}
                    >
                      View Itinerary
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Theme-Specific Destinations */}
      <AnimatePresence>
        {selectedTheme && (
          <motion.section
            key={selectedTheme}
            className="py-16 bg-gradient-to-b from-white to-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <motion.h2 
                className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                🌍 Popular {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Destinations
              </motion.h2>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                animate="show"
              >
                {destinations[selectedTheme]
                  .filter((d) => (selectedFilter ? d.type === selectedFilter : true))
                  .map((destination) => (
                    <motion.div
                      key={destination.id}
                      className="relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-white"
                      onClick={() => handleDestinationClick(destination)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={destination.img}
                        alt={destination.name}
                        className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                        <p className="text-white/80 text-sm">{destination.country}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                          {destination.type}
                        </span>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white text-gray-900 hover:bg-gray-100">
                          Explore Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

