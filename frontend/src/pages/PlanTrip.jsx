


// plantrip.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Weather from "../components/Weather";
import { searchCities } from "../../utils/cityAPI"; 
import { generatePlan, calculateDuration } from "../../utils/api";

export default function PlanTrip() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripDuration, setTripDuration] = useState(0);
  const [travelDays, setTravelDays] = useState(0);
  const [experienceDays, setExperienceDays] = useState(0);
  const [budget, setBudget] = useState("medium");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Interest options with beautiful emojis and colors
  const interestOptions = [
    { id: "cultural", label: "Cultural", emoji: "🏛️", color: "from-purple-500 to-indigo-600" },
    { id: "adventure", label: "Adventure", emoji: "⛰️", color: "from-green-500 to-emerald-600" },
    { id: "food", label: "Food", emoji: "🍕", color: "from-red-500 to-orange-500" },
    { id: "shopping", label: "Shopping", emoji: "🛍️", color: "from-blue-500 to-cyan-500" },
    { id: "relaxation", label: "Relaxation", emoji: "🌴", color: "from-teal-500 to-green-500" },
    { id: "nature", label: "Nature", emoji: "🌿", color: "from-lime-500 to-green-600" },
    { id: "history", label: "History", emoji: "🏺", color: "from-amber-500 to-orange-500" },
    { id: "beach", label: "Beach", emoji: "🏖️", color: "from-sky-500 to-blue-500" },
    { id: "nightlife", label: "Nightlife", emoji: "🌃", color: "from-violet-500 to-purple-600" },
    { id: "photography", label: "Photography", emoji: "📸", color: "from-pink-500 to-rose-500" }
  ];

  // 🔎 Fetch city suggestions (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (destination.length > 2) {
        searchCities(destination)
          .then(setSuggestions)
          .catch(() => setSuggestions([]));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [destination]);

  // Calculate trip duration and travel days when dates change
  useEffect(() => {
    const calculateTripDetails = async () => {
      if (startDate && endDate) {
        try {
          const result = await calculateDuration(startDate, endDate);
          if (result.isValid) {
            setTripDuration(result.totalDays);
            setTravelDays(result.travelDays);
            setExperienceDays(result.experienceDays);
          } else {
            setTripDuration(0);
            setTravelDays(0);
            setExperienceDays(0);
          }
        } catch (error) {
          console.error("Error calculating duration:", error);
          setTripDuration(0);
          setTravelDays(0);
          setExperienceDays(0);
        }
      } else {
        setTripDuration(0);
        setTravelDays(0);
        setExperienceDays(0);
      }
    };

    calculateTripDetails();
  }, [startDate, endDate]);

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Get minimum end date (start date or today)
  const getMinEndDate = () => {
    return startDate || getTodayDate();
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!destination || !startDate || !endDate || !budget || selectedInterests.length === 0) {
      setError("Please fill in all fields and select at least one interest.");
      setLoading(false);
      return;
    }

    if (tripDuration <= 0) {
      setError("End date must be after start date.");
      setLoading(false);
      return;
    }

    if (experienceDays <= 0) {
      setError("Trip duration is too short for meaningful experience. Please select more days.");
      setLoading(false);
      return;
    }

    if (tripDuration > 30) {
      setError("Trip duration cannot exceed 30 days.");
      setLoading(false);
      return;
    }

    try {
      const formData = {
        destination,
        days: tripDuration,
        startDate,
        endDate,
        budget,
        interests: selectedInterests.join(", "),
        travelDays,
        experienceDays
      };

      const data = await generatePlan(formData, token);
      console.log("🌍 AI Response:", data);

      if (!data || data.error) {
        throw new Error(data?.error || "Invalid response from server");
      }

      if (!data.itinerary || !Array.isArray(data.itinerary)) {
        throw new Error("Invalid itinerary format received from server");
      }

      // ✅ Build trip object
      const newTrip = {
        destination,
        budget,
        days: tripDuration,
        startDate,
        endDate,
        travelDays,
        experienceDays,
        interests: selectedInterests,
        plan: data.itinerary,
        hotels: data.hotels || [],
        image: data.image || null
      };

      // ✅ Save trip to localStorage
      let storedTrips = JSON.parse(localStorage.getItem("recentTrips")) || [];
      
      storedTrips = storedTrips.filter(
        (trip) => !(trip.destination === newTrip.destination && trip.days === newTrip.days && trip.budget === newTrip.budget)
      );

      storedTrips.unshift(newTrip);
      if (storedTrips.length > 10) storedTrips = storedTrips.slice(0, 10);
      localStorage.setItem("recentTrips", JSON.stringify(storedTrips));

      // ✅ Navigate to itinerary page
      navigate("/itinerary", { 
        state: { 
          itinerary: data.itinerary,
          tripMeta: formData,
          hotels: data.hotels 
        } 
      });

    } catch (err) {
      setError(err.message || "Failed to generate itinerary. Please try again.");
      console.error("PlanTrip error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle interest toggle with beautiful animation
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* Live Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600">
        {/* Animated Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Circles */}
          <motion.div
            className="absolute w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
            animate={{
              x: [100, 0, 100],
              y: [-50, 100, -50],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
            animate={{
              x: [-100, 50, -100],
              y: [100, -100, 100],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                x: [0, Math.random() * 400 - 200],
                y: [0, Math.random() * 400 - 200],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px),
                                linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden relative z-10"
      >
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 p-8 text-center relative overflow-hidden">
          {/* Header Background Animation */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute w-full h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4 relative z-10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-6xl mb-2"
            >
              ✈️
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              Plan Your Dream Trip
            </h1>
            <p className="text-blue-100 text-lg lg:text-xl drop-shadow">
              Where would you like to explore today?
            </p>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="p-8 lg:p-10">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/30 text-red-100 p-4 rounded-xl mb-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white text-lg font-semibold mb-3 drop-shadow">
                🌍 Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-lg"
                  placeholder="Enter your dream destination..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                  🔍
                </div>
              </div>

              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl mt-2 overflow-hidden"
                  >
                    {suggestions.map((city, index) => (
                      <motion.li
                        key={city}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 hover:bg-white/30 cursor-pointer border-b border-white/10 last:border-b-0 transition-colors duration-200 flex items-center gap-3"
                        onClick={() => {
                          setDestination(city);
                          setSuggestions([]);
                        }}
                      >
                        <span className="text-lg">📍</span>
                        <span className="text-white font-medium">{city}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Weather Component */}
            {destination && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Weather city={destination} />
              </motion.div>
            )}

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-white text-lg font-semibold mb-3 drop-shadow">
                📅 Trip Dates
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* Start Date */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={getTodayDate()}
                      className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-lg"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                      📅
                    </div>
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={getMinEndDate()}
                      className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-lg"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                      📅
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Duration Display */}
              {tripDuration > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 text-center"
                >
                  <div className="text-white font-semibold">
                    <span className="text-yellow-300">{tripDuration}</span> day{tripDuration > 1 ? 's' : ''} trip
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    {startDate} to {endDate}
                  </div>
                  <div className="text-white/80 text-xs mt-2 flex justify-center gap-4">
                    <span>🚗 {travelDays} travel day{travelDays > 1 ? 's' : ''}</span>
                    <span>🎯 {experienceDays} experience day{experienceDays > 1 ? 's' : ''}</span>
                  </div>
                  {experienceDays <= 0 && (
                    <div className="text-red-300 text-xs mt-2">
                      ⚠️ Not enough days for actual experience
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Budget Selection - Updated with Luxury */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-white text-lg font-semibold mb-3 drop-shadow">
                💰 Budget Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "low", label: "Budget", emoji: "💸", color: "from-green-500 to-emerald-500", desc: "Save money" },
                  { value: "medium", label: "Comfort", emoji: "💰", color: "from-blue-500 to-cyan-500", desc: "Good value" },
                  { value: "high", label: "Luxury", emoji: "💎", color: "from-purple-500 to-pink-500", desc: "Premium experience" }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBudget(option.value)}
                    className={`bg-gradient-to-r ${option.color} text-white p-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                      budget === option.value 
                        ? "ring-4 ring-white/50 transform scale-105 shadow-2xl" 
                        : "opacity-80 hover:opacity-100 hover:shadow-xl"
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="font-bold text-sm lg:text-base">{option.label}</div>
                    <div className="text-white/80 text-xs mt-1">{option.desc}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Interests Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-white text-lg font-semibold mb-4 drop-shadow">
                🎯 What are you interested in?
                <span className="text-white/70 text-sm font-normal block mt-1">
                  Select {Math.max(1, 3 - selectedInterests.length)} more to continue
                </span>
              </label>
              
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {interestOptions.map((interest) => (
                  <motion.button
                    key={interest.id}
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest.label)}
                    className={`bg-gradient-to-r ${interest.color} text-white p-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                      selectedInterests.includes(interest.label)
                        ? "ring-4 ring-white/50 transform scale-105 shadow-xl"
                        : "opacity-80 hover:opacity-100 hover:shadow-lg"
                    }`}
                  >
                    <div className="text-lg mb-1">{interest.emoji}</div>
                    <div className="text-sm">{interest.label}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: selectedInterests.length === 0 ? 1 : 1.05,
                  boxShadow: selectedInterests.length === 0 ? "none" : "0 20px 40px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                disabled={loading || selectedInterests.length === 0 || tripDuration <= 0 || experienceDays <= 0}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
                  selectedInterests.length === 0 || loading || tripDuration <= 0 || experienceDays <= 0
                    ? "bg-gray-400/50 text-white/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white hover:shadow-3xl"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="text-xl"
                    >
                      ⏳
                    </motion.div>
                    Crafting Your Adventure...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl"
                    >
                      ✨
                    </motion.span>
                    Create My Dream Itinerary
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl"
                    >
                      🚀
                    </motion.span>
                  </div>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-center"
          >
            <div className="text-white/70 text-sm drop-shadow">
              {selectedInterests.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span>🎉 Great choices!</span>
                  <span className="text-yellow-300 font-semibold">
                    {selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''} selected
                  </span>
                </motion.div>
              ) : (
                "Select your interests to unlock your personalized itinerary"
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
