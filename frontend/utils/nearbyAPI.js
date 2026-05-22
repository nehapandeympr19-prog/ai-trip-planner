// // utils/nearbyAPI.js
// const API_HOST = "opentripmap-places-v1.p.rapidapi.com";
// const API_KEY = import.meta.env.VITE_OPENTRIPMAP_KEY; // ✅ from .env.local

// // Get coordinates of a city
// export async function getCityCoords(cityName) {
//   try {
//     const res = await fetch(
//       `https://${API_HOST}/en/places/geoname?name=${encodeURIComponent(cityName)}`,
//       {
//         headers: {
//           "x-rapidapi-host": API_HOST,
//           "x-rapidapi-key": API_KEY,
//         },
//       }
//     );
//     if (!res.ok) throw new Error("Failed to fetch geoname");
//     return await res.json(); // {lat, lon, name, country}
//   } catch (err) {
//     console.error("❌ Error fetching city coords:", err);
//     return null;
//   }
// }

// // Get nearby places within radius (default 3000m)
// export async function getNearbyPlaces(lat, lon, radius = 3000) {
//   try {
//     const res = await fetch(
//       `https://${API_HOST}/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&rate=2&limit=10&format=json`,
//       {
//         headers: {
//           "x-rapidapi-host": API_HOST,
//           "x-rapidapi-key": API_KEY,
//         },
//       }
//     );
//     if (!res.ok) throw new Error("Failed to fetch nearby places");
//     return await res.json(); // array of places
//   } catch (err) {
//     console.error("❌ Error fetching nearby places:", err);
//     return [];
//   }
// }



// // frontend/utils/nearbyAPI.js
// const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

// // ✅ Some default coordinates for fallback (city center points)
// const FALLBACK_COORDS = {
//   jaipur: { lat: 26.9124, lon: 75.7873 },
//   bhopal: { lat: 23.2599, lon: 77.4126 },
//   indore: { lat: 22.7196, lon: 75.8577 },
//   delhi: { lat: 28.6139, lon: 77.2090 },
//   mumbai: { lat: 19.0760, lon: 72.8777 },
// };

// // ✅ Clean up destination name (remove words like district, IN, state)
// function cleanCityName(city) {
//   if (!city) return "";
//   return city
//     .toLowerCase()
//     .replace(/district|state|,.*$/g, "") // remove "district", "state", and after comma
//     .trim();
// }

// // 🔹 Step 1: Get coordinates from OpenTripMap API
// export async function getCityCoords(city) {
//   const cleaned = cleanCityName(city);

//   try {
//     const res = await fetch(
//       `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(
//         cleaned
//       )}&apikey=${API_KEY}`
//     );
//     const data = await res.json();

//     if (data && data.lat && data.lon) {
//       console.log("✅ Geoname coords found:", data.lat, data.lon);
//       return { lat: data.lat, lon: data.lon };
//     }

//     // Fallback if geoname fails
//     if (FALLBACK_COORDS[cleaned]) {
//       console.log("⚠️ Using fallback coords for:", cleaned);
//       return FALLBACK_COORDS[cleaned];
//     }

//     console.warn("❌ No coords found for", cleaned);
//     return null;
//   } catch (err) {
//     console.error("Error fetching geoname:", err);

//     if (FALLBACK_COORDS[cleaned]) {
//       console.log("⚠️ Using fallback coords after error:", cleaned);
//       return FALLBACK_COORDS[cleaned];
//     }

//     return null;
//   }
// }

// // 🔹 Step 2: Get nearby attractions
// export async function getNearbyPlaces(lat, lon, radius = 5000) {
//   try {
//     const res = await fetch(
//       `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&rate=2&limit=10&apikey=${API_KEY}`
//     );
//     const data = await res.json();

//     if (data && data.features && data.features.length > 0) {
//       return data.features.map((place) => ({
//         id: place.properties.xid,
//         name: place.properties.name || "Unnamed Place",
//         kind: place.properties.kinds || "attraction",
//       }));
//     }

//     return [];
//   } catch (err) {
//     console.error("Error fetching nearby places:", err);
//     return [];
//   }
// }

// src/api/nearbyAPI.js
// Get city coordinates from backend geocode API
export async function getCityCoords(city) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/geocode?place=${encodeURIComponent(city)}`
    );
    if (!res.ok) throw new Error(`Geocode API error: ${res.status}`);

    const data = await res.json();
    if (data.lat && data.lon) {
      return { lat: data.lat, lon: data.lon };
    }
    return null;
  } catch (error) {
    console.error("getCityCoords error:", error);
    return null;
  }
}

// Get nearby places from backend nearby API by lat/lon
export async function getNearbyPlaces(lat, lon) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/nearby?lat=${lat}&lon=${lon}`
    );
    if (!res.ok) throw new Error(`Nearby API error: ${res.status}`);

    const data = await res.json();
    return data.places || [];
  } catch (error) {
    console.error("getNearbyPlaces error:", error);
    return [];
  }
}
