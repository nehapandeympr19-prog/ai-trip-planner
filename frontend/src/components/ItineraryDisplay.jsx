
// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import HotelSuggestions from "@/components/HotelSuggestions";
// import { extractPlaceName } from "../../utils/placeUtils";
// import { motion, AnimatePresence } from "framer-motion";
// import CityBackground from "@/components/CityBackground";
// import HeadingHero from "@/components/ui/HeadingHero";

// const ICONS = {
//   morning: "🌅 Morning",
//   afternoon: "🛍️ Afternoon",
//   evening: "🍽️ Evening",
// };

// const ORDER = ["morning", "afternoon", "evening"];

// export default function ItineraryDisplay() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   let rawItinerary = location.state?.itinerary || [];
//   const itinerary = Array.isArray(rawItinerary)
//     ? rawItinerary.map((day, idx) => ({ day: day.day || idx + 1, ...day }))
//     : [{ day: 1, ...rawItinerary }];

//   const tripMeta = location.state?.tripMeta;
//   const hotels = location.state?.hotels || [];

//   const [showHotels, setShowHotels] = useState(false);
//   const [openDays, setOpenDays] = useState({});
//   const [recommendations, setRecommendations] = useState([]);

//   const getToken = () => localStorage.getItem("token");

//   // ✅ Fetch similar trip recommendations
//   useEffect(() => {
//     if (!tripMeta?.destination) return;

//     const fetchRecommendations = async () => {
//       try {
//         const requestBody = {
//           destination: tripMeta.destination,
//           days: Number(tripMeta.days || itinerary.length),
//           theme: (tripMeta.theme || "adventure").toLowerCase(),
//           budget: (tripMeta.budget || "medium").toLowerCase(),
//           interests: (tripMeta.interests || "general").toLowerCase(),
//         };

//         const res = await fetch("http://localhost:5000/recommend-trips", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestBody),
//         });

//         const data = await res.json();

//         if (Array.isArray(data.recommendations)) {
//           setRecommendations(data.recommendations);
//         } else {
//           setRecommendations([]);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching recommendations:", err);
//         setRecommendations([]);
//       }
//     };

//     fetchRecommendations();
//   }, [tripMeta, itinerary.length]);

//   // ✅ Save itinerary to backend
//   const saveItinerary = async () => {
//     const token = getToken();
//     if (!token) {
//       alert("⚠️ Please login first to save your itinerary!");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/save-itinerary", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           destination: tripMeta?.destination || "Unknown",
//           days: Number(tripMeta?.days || itinerary.length),
//           // budget: tripMeta?.budget || "Medium",
//           // interests: tripMeta?.interests || "General",
//           plan: { itinerary },
//         }),
//       });

//       const data = await res.json();
//       alert(data.message || "✅ Itinerary saved successfully!");
//     } catch (err) {
//       alert("❌ Failed to save itinerary. Please try again.");
//     }
//   };

//   const toggleDay = (dayIndex) => {
//     setOpenDays((prev) => ({
//       ...prev,
//       [dayIndex]: !prev[dayIndex],
//     }));
//   };

//   if (!itinerary || itinerary.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-xl">
//         No itinerary found. Please go back and generate one.
//       </div>
//     );
//   }

//   return (
//     <CityBackground
//       city={tripMeta?.destination || "Vrindavan"}
//       backgroundImageURL={tripMeta?.backgroundImage || "default-image-url"}
//     >
//       <div className="p-6">
//         <div className="max-w-4xl mx-auto">
//           <HeadingHero>
//             🗺️ Your Itinerary {tripMeta?.destination && `for ${tripMeta.destination}`}
//           </HeadingHero>

//           {/* Action Buttons */}
//           <div className="flex justify-center gap-4 mb-8 flex-wrap">
//             <Button
//               onClick={saveItinerary}
//               className="bg-blue-600 text-white hover:bg-blue-700 shadow-md"
//             >
//               💾 Save Itinerary
//             </Button>
//             <Button
//               onClick={() => navigate("/saved-itineraries")}
//               className="bg-blue-600 text-white hover:bg-blue-700 shadow-md"
//             >
//               📑 View Saved Itineraries
//             </Button>
//           </div>

//           {/* Collapsible Day Cards */}
//           <div className="space-y-4">
//             {itinerary.map((dayPlan, index) => {
//               const isOpen = !!openDays[index];

//               return (
//                 <motion.div
//                   key={index}
//                   className="bg-white rounded-2xl shadow-xl border border-purple-200 overflow-hidden"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <button
//                     onClick={() => toggleDay(index)}
//                     className="w-full bg-purple-600 text-white font-bold text-lg px-6 py-4 flex justify-between items-center cursor-pointer"
//                     aria-expanded={isOpen}
//                     aria-controls={`day-content-${index}`}
//                   >
//                     <span>📅 Day {dayPlan?.day || index + 1}</span>
//                     <span className="text-2xl">{isOpen ? "−" : "+"}</span>
//                   </button>

//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         id={`day-content-${index}`}
//                         role="region"
//                         aria-labelledby={`day-header-${index}`}
//                         initial="collapsed"
//                         animate="open"
//                         exit="collapsed"
//                         variants={{
//                           open: { height: "auto", opacity: 1 },
//                           collapsed: { height: 0, opacity: 0 },
//                         }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="px-6 py-5 overflow-hidden bg-gray-50"
//                       >
//                         {ORDER.map((timeKey) => {
//                           const activity = dayPlan?.[timeKey];
//                           if (!activity) return null;

//                           const placeName =
//                             extractPlaceName(activity.activity || activity.details || "") ||
//                             tripMeta?.destination;

//                           return (
//                             <motion.div
//                               key={timeKey}
//                               className="mb-5 rounded-xl border border-purple-300 bg-white p-5 shadow-sm hover:shadow-md transition"
//                               whileHover={{ scale: 1.02 }}
//                             >
//                               <h4 className="text-lg font-semibold text-purple-700 mb-2">
//                                 {ICONS[timeKey]}
//                               </h4>

//                               <p className="text-gray-700 font-medium mb-2">{activity.activity}</p>
//                               {activity.details && (
//                                 <p className="text-gray-600 mb-2">{activity.details}</p>
//                               )}
//                               {activity.duration && (
//                                 <p className="text-gray-500 text-sm">
//                                   ⏱️ {activity.duration}
//                                 </p>
//                               )}
//                               {activity.cost && (
//                                 <p className="text-gray-500 text-sm">
//                                   💰 {activity.cost}
//                                 </p>
//                               )}
//                               {activity.notes && (
//                                 <p className="text-gray-500 text-sm italic">
//                                   📝 {activity.notes}
//                                 </p>
//                               )}

//                               <Button
//                                 variant="outline"
//                                 className="mt-3 border-purple-500 text-purple-600 hover:bg-purple-100"
//                                 onClick={() =>
//                                   window.open(
//                                     `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                                       placeName
//                                     )}`,
//                                     "_blank"
//                                   )
//                                 }
//                               >
//                                 🌍 View on Map
//                               </Button>
//                             </motion.div>
//                           );
//                         })}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Hotel Suggestions */}
//           <div className="flex justify-center mt-10">
//             <Button
//               onClick={() => setShowHotels(!showHotels)}
//               className="bg-blue-600 text-white hover:bg-blue-700 shadow-md"
//             >
//               {showHotels ? "Hide Hotels" : "Show Recommended Hotels"}
//             </Button>
//           </div>

//           {showHotels && (
//             <motion.div
//               className="mt-8"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
//                 🏨 Recommended Hotels in {tripMeta?.destination || "your city"}
//               </h3>
//               {hotels.length > 0 ? (
//                 <HotelSuggestions destination={tripMeta?.destination} hotels={hotels} />
//               ) : (
//                 <p className="text-center text-gray-600 italic">
//                   No hotel suggestions available.
//                 </p>
//               )}
//             </motion.div>
//           )}

//           {/* Similar Trips Recommendations */}
//           <div className="mt-12">
//             <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
//               ✨ You may also like
//             </h3>

//             {recommendations.length > 0 ? (
//               <div className="grid md:grid-cols-2 gap-6">
//                 {recommendations.map((trip, idx) => (
//                   <motion.div
//                     key={idx}
//                     className="p-6 bg-white rounded-2xl shadow-md border border-purple-200 hover:shadow-xl transition cursor-pointer"
//                     whileHover={{ scale: 1.03 }}
//                     onClick={() =>
//                       navigate("/itinerary", {
//                         state: {
//                           itinerary: trip.plan?.itinerary || [],
//                           tripMeta: trip,
//                           hotels: [],
//                         },
//                       })
//                     }
//                   >
//                     <h4 className="text-lg font-semibold text-purple-700">
//                       {trip.destination} ({trip.days} days)
//                     </h4>
//                     <p className="text-gray-600">Budget: {trip.budget}</p>
//                     <p className="text-gray-600">Interests: {trip.interests}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500 italic">
//                 No similar trips found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </CityBackground>
//   );
// }





import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HotelSuggestions from "@/components/HotelSuggestions";
import { extractPlaceName } from "../../utils/placeUtils";
import { motion, AnimatePresence } from "framer-motion";
import CityBackground from "@/components/CityBackground";
import HeadingHero from "@/components/ui/HeadingHero";
import { 
  MapPin, 
  Calendar, 
  Wallet, 
  Heart, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Hotel,
  Plane,
  Utensils,
  Mountain,
  Palette,
  ShoppingBag
} from "lucide-react";

const TIME_ICONS = {
  morning: { icon: "🌅", label: "Morning", color: "from-amber-400 to-orange-500" },
  afternoon: { icon: "☀️", label: "Afternoon", color: "from-yellow-400 to-amber-500" },
  evening: { icon: "🌙", label: "Evening", color: "from-purple-500 to-indigo-600" }
};

const INTEREST_ICONS = {
  Cultural: { icon: "🏛️", color: "bg-purple-100 text-purple-700" },
  Adventure: { icon: "⛰️", color: "bg-green-100 text-green-700" },
  Food: { icon: "🍕", color: "bg-red-100 text-red-700" },
  Shopping: { icon: "🛍️", color: "bg-blue-100 text-blue-700" },
  Relaxation: { icon: "🌴", color: "bg-teal-100 text-teal-700" }
};

const ORDER = ["morning", "afternoon", "evening"];

export default function ItineraryDisplay() {
  const location = useLocation();
  const navigate = useNavigate();

  let rawItinerary = location.state?.itinerary || [];
  const itinerary = Array.isArray(rawItinerary)
    ? rawItinerary.map((day, idx) => ({ day: day.day || idx + 1, ...day }))
    : [{ day: 1, ...rawItinerary }];

  const tripMeta = location.state?.tripMeta;
  const hotels = location.state?.hotels || [];

  const [showHotels, setShowHotels] = useState(false);
  const [openDays, setOpenDays] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [saved, setSaved] = useState(false);

  const getToken = () => localStorage.getItem("token");

  // ✅ Fetch similar trip recommendations
  useEffect(() => {
    if (!tripMeta?.destination) return;

    const fetchRecommendations = async () => {
      try {
        const requestBody = {
          destination: tripMeta.destination,
          days: Number(tripMeta.days || itinerary.length),
          theme: (tripMeta.theme || "adventure").toLowerCase(),
          budget: (tripMeta.budget || "medium").toLowerCase(),
          interests: (tripMeta.interests || "general").toLowerCase(),
        };

        const res = await fetch("http://localhost:5000/recommend-trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await res.json();
        setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
      } catch (err) {
        console.error("❌ Error fetching recommendations:", err);
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [tripMeta, itinerary.length]);

  // ✅ Save itinerary to backend
  const saveItinerary = async () => {
    const token = getToken();
    if (!token) {
      alert("⚠️ Please login first to save your itinerary!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/save-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination: tripMeta?.destination || "Unknown",
          days: Number(tripMeta?.days || itinerary.length),
          plan: { itinerary },
        }),
      });

      const data = await res.json();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert("❌ Failed to save itinerary. Please try again.");
    }
  };

  const toggleDay = (dayIndex) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayIndex]: !prev[dayIndex],
    }));
  };

  const openAllDays = () => {
    const allOpen = {};
    itinerary.forEach((_, index) => {
      allOpen[index] = true;
    });
    setOpenDays(allOpen);
  };

  const closeAllDays = () => {
    setOpenDays({});
  };

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-3xl shadow-2xl"
        >
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Itinerary Found</h2>
          <p className="text-gray-600 mb-4">Please go back and generate your perfect trip!</p>
          <Button
            onClick={() => navigate("/plan-trip")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
          >
            ✨ Plan New Trip
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <CityBackground
      city={tripMeta?.destination || "Your Destination"}
      backgroundImageURL={tripMeta?.backgroundImage || "default-image-url"}
    >
      <div className="min-h-screen p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <HeadingHero className="mb-4">
              🌟 Your {itinerary.length}-Day Adventure in {tripMeta?.destination}
            </HeadingHero>
            
            {/* Trip Meta Info */}
            <div className="flex justify-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-gray-700">{tripMeta?.destination}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-700">{itinerary.length} Days</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Wallet className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-gray-700 capitalize">{tripMeta?.budget}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveItinerary}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
                  saved 
                    ? "bg-green-500 text-white" 
                    : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl"
                }`}
              >
                {saved ? "✅ Saved!" : "💾 Save Itinerary"}
              </motion.button>
              
              <Button
                onClick={openAllDays}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
              >
                📖 Expand All
              </Button>
              
              <Button
                onClick={closeAllDays}
                className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
              >
                📕 Collapse All
              </Button>
            </div>
          </motion.div>

          {/* Itinerary Days */}
          <div className="space-y-6">
            {itinerary.map((dayPlan, index) => {
              const isOpen = !!openDays[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-white/20 overflow-hidden hover:shadow-3xl transition-shadow duration-300"
                >
                  {/* Day Header */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleDay(index)}
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">📅</div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold">Day {dayPlan?.day || index + 1}</h3>
                        <p className="text-purple-200 text-sm">Click to {isOpen ? "collapse" : "expand"} details</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl group-hover:scale-110 transition-transform"
                    >
                      {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                    </motion.div>
                  </motion.button>

                  {/* Day Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: "auto", opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="p-6 bg-gradient-to-br from-gray-50 to-blue-50"
                      >
                        <div className="grid md:grid-cols-3 gap-6">
                          {ORDER.map((timeKey) => {
                            const activity = dayPlan?.[timeKey];
                            if (!activity) return null;

                            const timeConfig = TIME_ICONS[timeKey];
                            const placeName = extractPlaceName(activity.activity || activity.details || "") || tripMeta?.destination;

                            return (
                              <motion.div
                                key={timeKey}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-white/50 hover:shadow-2xl transition-all duration-300"
                              >
                                {/* Time Header */}
                                <div className={`bg-gradient-to-r ${timeConfig.color} text-white p-4 rounded-xl mb-4 text-center`}>
                                  <div className="text-2xl mb-1">{timeConfig.icon}</div>
                                  <h4 className="font-bold text-lg">{timeConfig.label}</h4>
                                </div>

                                {/* Activity Content */}
                                <div className="space-y-3">
                                  <h5 className="font-bold text-gray-800 text-lg leading-tight">
                                    {activity.activity}
                                  </h5>
                                  
                                  {activity.details && (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                      {activity.details}
                                    </p>
                                  )}

                                  <div className="space-y-2 pt-2">
                                    {activity.notes && (
                                      <div className="flex items-start gap-2 text-sm text-purple-600">
                                        <Star className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{activity.notes}</span>
                                      </div>
                                    )}
                                    
                                    {activity.duration && (
                                      <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <div>⏱️</div>
                                        <span>{activity.duration}</span>
                                      </div>
                                    )}
                                    
                                    {activity.cost && (
                                      <div className="flex items-center gap-2 text-sm text-green-600">
                                        <div>💰</div>
                                        <span>{activity.cost}</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Map Button */}
                                  <Button
                                    onClick={() => window.open(
                                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`,
                                      "_blank"
                                    )}
                                    className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 rounded-xl hover:shadow-lg transition-all"
                                  >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    View on Map
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Hotel Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => setShowHotels(!showHotels)}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
            >
              <Hotel className="w-5 h-5 mr-2" />
              {showHotels ? "🙈 Hide Hotels" : "🏨 Show Recommended Hotels"}
            </Button>

            <AnimatePresence>
              {showHotels && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
                    🏨 Luxury Stays in {tripMeta?.destination}
                  </h3>
                  {hotels.length > 0 ? (
                    <HotelSuggestions destination={tripMeta?.destination} hotels={hotels} />
                  ) : (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                      <p className="text-gray-600 text-lg">✨ Curated hotel recommendations coming soon!</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-16"
            >
              <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
                ✨ You Might Also Love
              </h3>
              
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map((trip, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-2xl border-2 border-white/30 cursor-pointer group"
                    onClick={() => navigate("/itinerary", { state: { itinerary: trip.plan?.itinerary || [], tripMeta: trip, hotels: [] } })}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✈️</div>
                      <h4 className="font-bold text-xl text-gray-800 mb-2">
                        {trip.destination}
                      </h4>
                      <div className="flex justify-center gap-3 text-sm text-gray-600 mb-3">
                        <span>📅 {trip.days} days</span>
                        <span>💰 {trip.budget}</span>
                      </div>
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold inline-block">
                        {trip.interests}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </CityBackground>
  );
}