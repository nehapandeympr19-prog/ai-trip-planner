// // // src/components/TripMap.jsx
// // import { useEffect, useRef } from "react";
// // import mapboxgl from "mapbox-gl";
// // import "mapbox-gl/dist/mapbox-gl.css";

// // mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // ✅ from .env.local

// // export default function TripMap({ coordinates = [] }) {
// //   const mapContainerRef = useRef(null);
// //   const mapRef = useRef(null);
// //   const markersRef = useRef([]);

// //   useEffect(() => {
// //     if (!mapContainerRef.current) return;

// //     if (!mapboxgl.accessToken) {
// //       console.error("Missing Mapbox token. Add VITE_MAPBOX_TOKEN in .env.local");
// //       return;
// //     }

// //     // Create map once
// //     if (!mapRef.current) {
// //       mapRef.current = new mapboxgl.Map({
// //         container: mapContainerRef.current,
// //         style: "mapbox://styles/mapbox/streets-v11",
// //         center: coordinates[0]
// //           ? [coordinates[0].lng, coordinates[0].lat]
// //           : [72.5714, 23.0225], // fallback: Ahmedabad
// //         zoom: coordinates[0] ? 11 : 4,
// //       });
// //     }

// //     const map = mapRef.current;

// //     // Clear old markers
// //     markersRef.current.forEach((m) => m.remove());
// //     markersRef.current = [];

// //     if (!coordinates.length) return;

// //     // Markers + bounds
// //     const bounds = new mapboxgl.LngLatBounds();
// //     coordinates.forEach((p) => {
// //       const m = new mapboxgl.Marker()
// //         .setLngLat([p.lng, p.lat])
// //         .setPopup(new mapboxgl.Popup({ offset: 8 }).setText(p.label ?? ""))
// //         .addTo(map);
// //       markersRef.current.push(m);
// //       bounds.extend([p.lng, p.lat]);
// //     });
// //     map.fitBounds(bounds, { padding: 60, animate: true });

// //     // LineString between points (free, straight line)
// //     const routeGeoJSON = {
// //       type: "Feature",
// //       geometry: {
// //         type: "LineString",
// //         coordinates: coordinates.map((p) => [p.lng, p.lat]),
// //       },
// //     };

// //     const upsertRoute = () => {
// //       if (map.getSource("route")) {
// //         map.getSource("route").setData(routeGeoJSON);
// //       } else {
// //         map.addSource("route", { type: "geojson", data: routeGeoJSON });
// //         map.addLayer({
// //           id: "route",
// //           type: "line",
// //           source: "route",
// //           layout: { "line-join": "round", "line-cap": "round" },
// //           paint: { "line-color": "#3b82f6", "line-width": 4 },
// //         });
// //       }
// //     };

// //     map.isStyleLoaded() ? upsertRoute() : map.once("load", upsertRoute);
// //   }, [coordinates]);

// //   return <div ref={mapContainerRef} className="w-full h-[400px] rounded-xl shadow-lg" />;
// // }



// // src/components/TripMap.jsx
// import { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // ✅ from .env.local

// export default function TripMap({ coordinates = [] }) {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const markersRef = useRef([]);

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     if (!mapboxgl.accessToken) {
//       console.error("Missing Mapbox token. Add VITE_MAPBOX_TOKEN in .env.local");
//       return;
//     }

//     // Create map once
//     if (!mapRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: coordinates[0]
//           ? [coordinates[0].lng, coordinates[0].lat]
//           : [72.5714, 23.0225], // fallback: Ahmedabad
//         zoom: coordinates[0] ? 11 : 4,
//       });
//     }

//     const map = mapRef.current;

//     // Clear old markers
//     markersRef.current.forEach((m) => m.remove());
//     markersRef.current = [];

//     if (!coordinates.length) return;

//     // Markers + bounds
//     const bounds = new mapboxgl.LngLatBounds();
//     coordinates.forEach((p) => {
//       const m = new mapboxgl.Marker()
//         .setLngLat([p.lng, p.lat])
//         .setPopup(new mapboxgl.Popup({ offset: 8 }).setText(p.label ?? ""))
//         .addTo(map);
//       markersRef.current.push(m);
//       bounds.extend([p.lng, p.lat]);
//     });
//     map.fitBounds(bounds, { padding: 60, animate: true });

//     // LineString between points
//     const routeGeoJSON = {
//       type: "Feature",
//       geometry: {
//         type: "LineString",
//         coordinates: coordinates.map((p) => [p.lng, p.lat]),
//       },
//     };

//     const upsertRoute = () => {
//       if (map.getSource("route")) {
//         map.getSource("route").setData(routeGeoJSON);
//       } else {
//         map.addSource("route", { type: "geojson", data: routeGeoJSON });
//         map.addLayer({
//           id: "route",
//           type: "line",
//           source: "route",
//           layout: { "line-join": "round", "line-cap": "round" },
//           paint: { "line-color": "#3b82f6", "line-width": 4 },
//         });
//       }
//     };

//     map.isStyleLoaded() ? upsertRoute() : map.once("load", upsertRoute);
//   }, [coordinates]);

//   return <div ref={mapContainerRef} className="w-full h-[400px] rounded-xl shadow-lg" />;
// }
