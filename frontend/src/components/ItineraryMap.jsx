
// import React, { useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { searchLocations } from "../../utils/mapboxAPI"; // Assuming this is the API function

// // Function to fetch coordinates for places
// async function geocodePlace(query) {
//   try {
//     const results = await searchLocations(query);
//     if (results.length > 0) {
//       return {
//         lat: results[0].coordinates[1], // Mapbox returns [lng, lat], so access lat at index 1
//         lng: results[0].coordinates[0], // lng is at index 0
//       };
//     } else {
//       console.warn(`No Mapbox results for "${query}"`);
//     }
//   } catch (err) {
//     console.error("Mapbox geocoding error:", err);
//   }

//   // Fallback to Mathura if geocoding fails
//   return { lat: 27.4924, lng: 77.6737 }; // Coordinates for Mathura (India)
// }

// // Itinerary map component
// function ItineraryMap({ places = [] }) {
//   const [geoPlaces, setGeoPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // This will store the map instance
//   const mapContainerRef = React.createRef();

//   useEffect(() => {
//     async function fetchCoordinates() {
//       const results = [];
//       for (let place of places) {
//         const coords = await geocodePlace(place.name || place.address);
//         results.push({
//           ...place,
//           lat: coords.lat,
//           lng: coords.lng,
//         });
//       }
//       setGeoPlaces(results);
//       setLoading(false); // Once all places are geocoded, set loading to false
//     }

//     if (places.length > 0) {
//       fetchCoordinates();
//     }
//   }, [places]);

//   useEffect(() => {
//     if (!geoPlaces.length) return;

//     mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


//     // Create a Mapbox map instance
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11", // You can change the style
//       center: [geoPlaces[0].lng, geoPlaces[0].lat], // Initial center based on the first place
//       zoom: 13,
//     });

//     // Add navigation controls (zoom, compass)
//     map.addControl(new mapboxgl.NavigationControl());

//     // Add markers for each place
//     geoPlaces.forEach((place) => {
//       new mapboxgl.Marker()
//         .setLngLat([place.lng, place.lat])
//         .setPopup(
//           new mapboxgl.Popup().setHTML(
//             `<strong>${place.name}</strong><br>${place.address}`
//           )
//         )
//         .addTo(map);
//     });

//     // Call the Directions API to create a route
//     if (geoPlaces.length > 1) {
//       const origin = geoPlaces[0];
//       const destination = geoPlaces[geoPlaces.length - 1];
//       const waypoints = geoPlaces.slice(1, -1);

//       // Mapbox Directions API URL
//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${mapboxgl.accessToken}&geometries=geojson&steps=true`;

//       // Fetch the directions
//       fetch(directionsUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           const route = data.routes[0].geometry.coordinates;
          
//           // Draw the route on the map
//           map.addSource("route", {
//             type: "geojson",
//             data: {
//               type: "Feature",
//               geometry: {
//                 type: "LineString",
//                 coordinates: route,
//               },
//             },
//           });

//           map.addLayer({
//             id: "route",
//             type: "line",
//             source: "route",
//             layout: {
//               "line-join": "round",
//               "line-cap": "round",
//             },
//             paint: {
//               "line-color": "#007cbf",
//               "line-width": 4,
//             },
//           });
//         })
//         .catch((error) => console.error("Error fetching directions:", error));
//     }

//     return () => map.remove(); // Cleanup on component unmount
//   }, [geoPlaces]);

//   if (loading) {
//     return <div>Loading map...</div>; // Show a loading message while coordinates are being fetched
//   }

//   return (
//     <div
//       ref={mapContainerRef}
//       style={{
//         width: "100%",
//         height: "400px",
//         borderRadius: "16px",
//       }}
//     />
//   );
// }

// export default ItineraryMap;







// import React, { useEffect, useState, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { searchLocations } from "../../utils/mapboxAPI"; // Updated with filters

// // Function to fetch coordinates for places
// async function geocodePlace(query) {
//   try {
//     const results = await searchLocations(query);
//     if (results.length > 0) {
//       return {
//         lat: results[0].coordinates[1], // Mapbox gives [lng, lat]
//         lng: results[0].coordinates[0],
//         name: results[0].name,
//         address: results[0].address,
//       };
//     } else {
//       console.warn(`No Mapbox results for "${query}"`);
//     }
//   } catch (err) {
//     console.error("Mapbox geocoding error:", err);
//   }

//   // ✅ Fallback: Mathura (India)
//   return { lat: 27.4924, lng: 77.6737, name: query, address: "Fallback" };
// }

// // Itinerary map component
// function ItineraryMap({ places = [] }) {
//   const [geoPlaces, setGeoPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Keep map instance persistent
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   // Step 1: Geocode all places
//   useEffect(() => {
//     async function fetchCoordinates() {
//       const results = [];
//       for (let place of places) {
//         const coords = await geocodePlace(place.name || place.address);
//         results.push({
//           ...place,
//           lat: coords.lat,
//           lng: coords.lng,
//           name: coords.name || place.name,
//           address: coords.address || place.address,
//         });
//       }
//       setGeoPlaces(results);
//       setLoading(false);
//     }

//     if (places.length > 0) {
//       fetchCoordinates();
//     }
//   }, [places]);

//   // Step 2: Initialize map only once
//   useEffect(() => {
//     if (!geoPlaces.length || mapRef.current) return;

//     mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [geoPlaces[0].lng, geoPlaces[0].lat],
//       zoom: 13,
//     });

//     mapRef.current.addControl(new mapboxgl.NavigationControl());
//   }, [geoPlaces]);

//   // Step 3: Add markers + route after map exists
//   useEffect(() => {
//     if (!geoPlaces.length || !mapRef.current) return;
//     const map = mapRef.current;

//     // Add markers
//     geoPlaces.forEach((place) => {
//       new mapboxgl.Marker()
//         .setLngLat([place.lng, place.lat])
//         .setPopup(
//           new mapboxgl.Popup().setHTML(
//             `<strong>${place.name}</strong><br>${place.address}`
//           )
//         )
//         .addTo(map);
//     });

//     // ✅ Build full directions with waypoints
//     if (geoPlaces.length > 1) {
//       const coordsString = geoPlaces
//         .map((p) => `${p.lng},${p.lat}`)
//         .join(";");

//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsString}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

//       fetch(directionsUrl)
//         .then((res) => res.json())
//         .then((data) => {
//           if (!data.routes || !data.routes[0]) return;

//           const route = data.routes[0].geometry.coordinates;

//           if (map.getSource("route")) {
//             map.getSource("route").setData({
//               type: "Feature",
//               geometry: { type: "LineString", coordinates: route },
//             });
//           } else {
//             map.addSource("route", {
//               type: "geojson",
//               data: {
//                 type: "Feature",
//                 geometry: { type: "LineString", coordinates: route },
//               },
//             });

//             map.addLayer({
//               id: "route",
//               type: "line",
//               source: "route",
//               layout: {
//                 "line-join": "round",
//                 "line-cap": "round",
//               },
//               paint: {
//                 "line-color": "#007cbf",
//                 "line-width": 4,
//               },
//             });
//           }

//           // Fit map bounds to route
//           const bounds = route.reduce(
//             (b, coord) => b.extend(coord),
//             new mapboxgl.LngLatBounds(route[0], route[0])
//           );
//           map.fitBounds(bounds, { padding: 50 });
//         })
//         .catch((err) => console.error("Directions error:", err));
//     }
//   }, [geoPlaces]);

//   if (loading) return <div>Loading map...</div>;

//   return (
//     <div
//       ref={mapContainerRef}
//       style={{ width: "100%", height: "400px", borderRadius: "16px" }}
//     />
//   );
// }

// export default ItineraryMap;





// import React, { useEffect, useState, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { searchLocations } from "../../utils/mapboxAPI"; 

// // Function to fetch coordinates for places
// async function geocodePlace(query) {
//   try {
//     const results = await searchLocations(query);
//     if (results.length > 0) {
//       return {
//         lat: results[0].coordinates[1], // [lng, lat]
//         lng: results[0].coordinates[0],
//         name: results[0].name,
//         address: results[0].address,
//       };
//     }
//   } catch (err) {
//     console.error("Geocoding error:", err);
//   }

//   // ❌ No more Mathura fallback
//   return null; 
// }

// function ItineraryMap({ places = [] }) {
//   const [geoPlaces, setGeoPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   // Convert all place names into coordinates
//   useEffect(() => {
//     async function fetchCoordinates() {
//       const results = [];
//       for (let place of places) {
//         const coords = await geocodePlace(place.name || place.address);
//         if (coords) {
//           results.push({ ...place, ...coords });
//         } else {
//           console.warn(`Skipping place: ${place.name || place.address}`);
//         }
//       }
//       console.log("Geocoded places:", results);
//       setGeoPlaces(results);
//       setLoading(false);
//     }

//     if (places.length > 0) {
//       fetchCoordinates();
//     }
//   }, [places]);

//   // Initialize map once
//   useEffect(() => {
//     if (!mapRef.current && geoPlaces.length > 0) {
//       mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [geoPlaces[0].lng, geoPlaces[0].lat],
//         zoom: 12,
//       });

//       mapRef.current.addControl(new mapboxgl.NavigationControl());
//     }
//   }, [geoPlaces]);

//   // Add markers and routes
//   useEffect(() => {
//     if (!mapRef.current || geoPlaces.length === 0) return;
//     const map = mapRef.current;

//     // Clear previous route if exists
//     if (map.getLayer("route")) map.removeLayer("route");
//     if (map.getSource("route")) map.removeSource("route");

//     // Add markers
//     geoPlaces.forEach((place) => {
//       new mapboxgl.Marker()
//         .setLngLat([place.lng, place.lat])
//         .setPopup(
//           new mapboxgl.Popup().setHTML(
//             `<strong>${place.name}</strong><br>${place.address}`
//           )
//         )
//         .addTo(map);
//     });

//     // Fit map to all markers
//     const bounds = new mapboxgl.LngLatBounds();
//     geoPlaces.forEach((p) => bounds.extend([p.lng, p.lat]));
//     map.fitBounds(bounds, { padding: 50 });

//     // Draw route if more than 1 place
//     if (geoPlaces.length > 1) {
//       const coordsString = geoPlaces.map((p) => `${p.lng},${p.lat}`).join(";");

//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsString}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

//       fetch(directionsUrl)
//         .then((res) => res.json())
//         .then((data) => {
//           if (!data.routes || data.routes.length === 0) return;

//           try {
//             // Remove old route if still exists
//             if (map.getLayer("route")) map.removeLayer("route");
//             if (map.getSource("route")) map.removeSource("route");

//             map.addSource("route", {
//               type: "geojson",
//               data: {
//                 type: "Feature",
//                 geometry: data.routes[0].geometry,
//               },
//             });

//             map.addLayer({
//               id: "route",
//               type: "line",
//               source: "route",
//               layout: { "line-join": "round", "line-cap": "round" },
//               paint: { "line-color": "#007cbf", "line-width": 4 },
//             });
//           } catch (err) {
//             console.error("Directions error:", err);
//           }
//         })
//         .catch((err) => console.error("Directions error:", err));
//     }
//   }, [geoPlaces]);

//   if (loading) return <div>Loading map...</div>;

//   return (
//     <div
//       ref={mapContainerRef}
//       style={{ width: "100%", height: "400px", borderRadius: "16px" }}
//     />
//   );
// }

// export default ItineraryMap;



// ItineraryMap.jsx
import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// 🔹 Fetch famous attractions dynamically using Mapbox
async function fetchCityAttractions(city) {
  try {
    const query = `top tourist attractions in ${city}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?limit=6&access_token=${mapboxgl.accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features.map((f) => ({
        name: f.text,
        address: f.place_name,
        coordinates: f.center, // [lng, lat]
      }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching attractions:", err);
    return [];
  }
}

function ItineraryMap({ destination }) {
  const [geoPlaces, setGeoPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Fetch attractions when destination changes
  useEffect(() => {
    if (!destination) return;

    async function loadAttractions() {
      const attractions = await fetchCityAttractions(destination);
      setGeoPlaces(attractions);
      setLoading(false);
    }

    loadAttractions();
  }, [destination]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current && geoPlaces.length > 0) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: geoPlaces[0].coordinates,
        zoom: 12,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, [geoPlaces]);

  // Add markers
  useEffect(() => {
    if (!mapRef.current || geoPlaces.length === 0) return;
    const map = mapRef.current;

    // Clear old markers
    document.querySelectorAll(".mapboxgl-marker").forEach((m) => m.remove());

    // Add new markers
    geoPlaces.forEach((place) => {
      new mapboxgl.Marker()
        .setLngLat(place.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<strong>${place.name}</strong><br>${place.address}`
          )
        )
        .addTo(map);
    });

    // Fit bounds
    const bounds = new mapboxgl.LngLatBounds();
    geoPlaces.forEach((p) => bounds.extend(p.coordinates));
    map.fitBounds(bounds, { padding: 50 });
  }, [geoPlaces]);

  if (loading) return <div>Loading attractions map...</div>;

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "400px", borderRadius: "16px" }}
    />
  );
}

export default ItineraryMap;
