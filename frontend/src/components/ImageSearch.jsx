// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ImageSearch = ({ searchTerm }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

//   useEffect(() => {
//     // Fetch images based on searchTerm
//     const fetchImages = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const url = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=5`; // Limit to 5 images

//         const response = await axios.get(url);
//         setImages(response.data.results); // Store images in the state
//       } catch (err) {
//         setError("Failed to load images.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchTerm) {
//       fetchImages();
//     }
//   }, [searchTerm]);

//   if (loading) return <p>Loading images...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h3>Images for: "{searchTerm}"</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {images.map((image) => (
//           <div key={image.id} className="border rounded-lg p-2">
//             <img
//               src={image.urls.small}  // Use small-sized images from Unsplash
//               alt={image.alt_description}
//               className="w-full h-auto object-cover rounded-lg"
//             />
//             <p className="mt-2 text-center">{image.alt_description || "No description"}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageSearch;


// src/components/ImageSearch.jsx
import { useEffect, useState } from "react";

export default function ImageSearch({ query }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Ensure env variable is correctly loaded
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    if (!query) return;

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError("");

        if (!ACCESS_KEY) {
          setError("⚠️ Unsplash Access Key is missing.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=1&client_id=${ACCESS_KEY}`
        );

        if (!res.ok) {
          throw new Error(`Unsplash API error: ${res.status}`);
        }

        const data = await res.json();

        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.small);
        } else {
          setImageUrl("");
        }
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("❌ Failed to fetch image.");
        setImageUrl("");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query, ACCESS_KEY]);

  if (loading) return <p className="text-gray-500">⏳ Loading image...</p>;

  if (error)
    return <p className="text-red-500 text-sm italic">{error}</p>;

  if (!imageUrl)
    return (
      <p className="text-gray-400 italic">
        No image found for "{query}"
      </p>
    );

  return (
    <img
      src={imageUrl}
      alt={query}
      className="w-full h-48 object-cover rounded-lg shadow-md"
    />
  );
}
