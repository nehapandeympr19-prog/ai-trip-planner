

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { getCityCoords, getNearbyPlaces } from "../../utils/nearbyAPI";
// import ImageSearch from "./ImageSearch";
// import { useNavigate } from "react-router-dom";

// export default function NearbyPlaces({ city, fallbackCity }) {
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchByCityName = async (cityName) => {
//     if (!cityName) return [];
//     const cleanCity = cityName.split(",")[0].trim().toLowerCase();

//     let coords = await getCityCoords(cleanCity);
//     if (!coords) {
//       if (cleanCity === "new york") {
//         coords = { lat: 40.7128, lon: -74.006 }; // fallback for NYC
//       } else {
//         return [];
//       }
//     }

//     const results = await getNearbyPlaces(coords.lat, coords.lon);
//     return results || [];
//   };

//   useEffect(() => {
//     const fetchPlaces = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         let results = await fetchByCityName(city);
//         if (!results?.length && fallbackCity && fallbackCity !== city) {
//           results = await fetchByCityName(fallbackCity);
//         }

//         if (!results?.length) {
//           setError("⚠️ No nearby attractions found. Try another city.");
//           setPlaces([]);
//         } else {
//           setPlaces(results.slice(0, 6));
//         }
//       } catch (err) {
//         console.error("Nearby fetch error:", err);
//         setError("❌ Failed to load nearby places.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (city) fetchPlaces();
//   }, [city, fallbackCity]);

//   if (loading) {
//     return <p className="text-center text-gray-600">⏳ Loading nearby places...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="mt-10">
//       <h3 className="text-2xl font-bold text-purple-700 mb-8 text-center">
//         📍 Nearby Attractions in {city || fallbackCity}
//       </h3>
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {places.map((place, idx) => {
//           const placeName = place.name || "Unnamed Place";
//           const category = place.kinds
//             ? place.kinds.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
//             : "Attraction";

//           return (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1 }}
//             >
//               <Card className="shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl bg-white overflow-hidden">
//                 {/* Image (click = navigate to attraction page) */}
//                 <div
//                   className="h-44 w-full overflow-hidden cursor-pointer group"
//                   onClick={() => navigate(`/attraction/${encodeURIComponent(placeName)}`)}
//                 >
//                   <div className="h-full w-full transform group-hover:scale-110 transition duration-300">
//                     <ImageSearch query={placeName} />
//                   </div>
//                 </div>

//                 <CardContent className="p-4 flex flex-col h-full">
//                   {/* Place Name */}
//                   <h4
//                     className="font-semibold text-lg text-purple-700 cursor-pointer hover:underline"
//                     onClick={() => navigate(`/attraction/${encodeURIComponent(placeName)}`)}
//                   >
//                     {placeName}
//                   </h4>

//                   {/* Category */}
//                   <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-2">
//                     {category}
//                   </p>

//                   {/* Google Maps Button */}
//                   <Button
//                     variant="outline"
//                     className="mt-auto border-purple-500 text-purple-600 hover:bg-purple-100"
//                     onClick={() =>
//                       window.open(
//                         `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`,
//                         "_blank"
//                       )
//                     }
//                   >
//                     🌍 View on Map
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCityCoords, getNearbyPlaces } from "../../utils/nearbyAPI";
import ImageSearch from "./ImageSearch";
import { useNavigate } from "react-router-dom";

export default function NearbyPlaces({ city, fallbackCity }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fetch coords from your Flask backend
  const fetchCoordsFromBackend = async (placeName) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/geocode?place=${encodeURIComponent(placeName)}`
      );
      const data = await res.json();
      if (data.lat && data.lon) {
        // Open Google Maps with exact lat/lon
        window.open(
          `https://www.google.com/maps?q=${data.lat},${data.lon}`,
          "_blank"
        );
      } else {
        alert("⚠️ Could not find coordinates for this place.");
      }
    } catch (err) {
      console.error("Geocode API error:", err);
      alert("❌ Failed to fetch location from backend.");
    }
  };

  const fetchByCityName = async (cityName) => {
    if (!cityName) return [];
    const cleanCity = cityName.split(",")[0].trim().toLowerCase();

    let coords = await getCityCoords(cleanCity);
    if (!coords) {
      if (cleanCity === "new york") {
        coords = { lat: 40.7128, lon: -74.006 }; // fallback for NYC
      } else {
        return [];
      }
    }

    const results = await getNearbyPlaces(coords.lat, coords.lon);
    return results || [];
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError("");

        let results = await fetchByCityName(city);
        if (!results?.length && fallbackCity && fallbackCity !== city) {
          results = await fetchByCityName(fallbackCity);
        }

        if (!results?.length) {
          setError("⚠️ No nearby attractions found. Try another city.");
          setPlaces([]);
        } else {
          setPlaces(results.slice(0, 6));
        }
      } catch (err) {
        console.error("Nearby fetch error:", err);
        setError("❌ Failed to load nearby places.");
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchPlaces();
  }, [city, fallbackCity]);

  if (loading) {
    return <p className="text-center text-gray-600">⏳ Loading nearby places...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-purple-700 mb-8 text-center">
        📍 Nearby Attractions in {city || fallbackCity}
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place, idx) => {
          const placeName = place.name || "Unnamed Place";
          const category = place.kinds
            ? place.kinds.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : "Attraction";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-xl bg-white overflow-hidden">
                {/* Image (click = navigate to attraction page) */}
                <div
                  className="h-44 w-full overflow-hidden cursor-pointer group"
                  onClick={() =>
                    navigate(`/attraction/${encodeURIComponent(placeName)}`)
                  }
                >
                  <div className="h-full w-full transform group-hover:scale-110 transition duration-300">
                    <ImageSearch query={placeName} />
                  </div>
                </div>

                <CardContent className="p-4 flex flex-col h-full">
                  {/* Place Name */}
                  <h4
                    className="font-semibold text-lg text-purple-700 cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/attraction/${encodeURIComponent(placeName)}`)
                    }
                  >
                    {placeName}
                  </h4>

                  {/* Category */}
                  <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-2">
                    {category}
                  </p>

                  {/* Google Maps Button (via backend API) */}
                  <Button
  variant="outline"
  className="mt-auto border-purple-500 text-purple-600 hover:bg-purple-100"
  onClick={() =>
    window.open(
      `https://www.google.com/maps?q=${place.lat},${place.lon}`,
      "_blank"
    )
  }
>
  🌍 View on Map
</Button>

                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
