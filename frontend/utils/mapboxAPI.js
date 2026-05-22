
// // utils/mapboxAPI.js
// const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// // Function to interact with the Mapbox Geocoding API
// export async function searchLocations(query) {
//   const encodedQuery = encodeURIComponent(query);
//   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${MAPBOX_TOKEN}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Mapbox Geocoding API error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     if (data.features && data.features.length > 0) {
//       return data.features.map(feature => ({
//         name: feature.text,
//         address: feature.place_name,
//         coordinates: feature.geometry.coordinates, // [lng, lat]
//       }));
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching geolocation data:", error);
//     return [];
//   }
// }





// // utils/mapboxAPI.js

// // Function to search places using Mapbox Geocoding API
// export async function searchLocations(query) {
//   const token = import.meta.env.VITE_MAPBOX_TOKEN;

//   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     query
//   )}.json?access_token=${token}&country=IN&limit=1`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!data.features || data.features.length === 0) {
//       console.warn(`No results found for query: "${query}"`);
//       return [];
//     }

//     return data.features.map((f) => ({
//       name: f.text, // Short name like "Taj Mahal"
//       address: f.place_name, // Full formatted address
//       coordinates: f.center, // [lng, lat]
//     }));
//   } catch (err) {
//     console.error("Mapbox API error:", err);
//     return [];
//   }
// }



const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export async function geocodePlace(placeName) {
  if (!placeName) return null;

  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      placeName
    )}.json?limit=1&access_token=${MAPBOX_TOKEN}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      return {
        name: feature.text,
        address: feature.place_name,
        coordinates: feature.center, // [lng, lat]
      };
    }
    return null;
  } catch (error) {
    console.error("Geocode error:", error);
    return null;
  }
}
