// import { useEffect, useState } from "react";

// export default function CityBackground({ city, children }) {
//   const [bgUrl, setBgUrl] = useState(null);

//   // ✅ use Vite env variable for Unsplash API key
//   const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

//   useEffect(() => {
//     async function fetchCityBackground() {
//       if (!city) {
//         console.warn("⚠️ No city provided for background");
//         return;
//       }

//       try {
//         console.log("🌆 Fetching background for:", city);

//         const res = await fetch(
//           `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
//             city
//           )}&orientation=landscape&client_id=${UNSPLASH_KEY}`
//         );

//         if (!res.ok) {
//           throw new Error(`Unsplash API error: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.results && data.results.length > 0) {
//           setBgUrl(data.results[0].urls.full);
//           console.log("✅ City background set:", data.results[0].urls.full);
//         } else {
//           console.warn("⚠️ No Unsplash results found for:", city);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching city background:", err);
//       }
//     }

//     fetchCityBackground();
//   }, [city, UNSPLASH_KEY]);

//   return (
//     <div className="relative min-h-screen w-full">
//       {/* Background Image */}
//       <img
//         src={bgUrl ? bgUrl : "default-image-url.jpg"} // Provide a default image URL if no background is fetched
//         alt="City Background"
//         className="absolute w-full h-full object-cover z-0"
//       />

//       {/* Dark Overlay with backdrop blur */}
//       <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

//       {/* Content Layer */}
//       <div className="relative z-20">{children}</div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function CityBackground({ city, children }) {
  const [bgUrl, setBgUrl] = useState(null);
  const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    async function fetchCityBackground() {
      if (!city) {
        console.warn("⚠️ No city provided for background");
        return;
      }

      try {
        console.log("🌆 Fetching background for:", city);

        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            city
          )}&orientation=landscape&client_id=${UNSPLASH_KEY}`
        );

        if (!res.ok) {
          throw new Error(`Unsplash API error: ${res.status}`);
        }

        const data = await res.json();

        if (data.results && data.results.length > 0) {
          setBgUrl(data.results[0].urls.full); 
          console.log("✅ City background set:", data.results[0].urls.full);
        } else {
          console.warn("⚠️ No Unsplash results found for:", city);
        }
      } catch (err) {
        console.error("❌ Error fetching city background:", err);
      }
    }

    fetchCityBackground();
  }, [city, UNSPLASH_KEY]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <img
        src={bgUrl || "default-image-url.jpg"}
        alt="City Background"
        className="absolute w-full h-full object-cover z-0 opacity-90"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"></div>

      {/* Content Layer */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
