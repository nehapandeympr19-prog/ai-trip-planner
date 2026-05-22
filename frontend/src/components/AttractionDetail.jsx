

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import NearbyPlaces from "./NearbyPlaces";

// const AttractionDetail = () => {
//   const { id } = useParams();
//   const [attraction, setAttraction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);

//   // Fetch attraction data
//   useEffect(() => {
//     const fetchAttractionDetails = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(`/api/attractions/${id}`);
//         if (!response.ok) throw new Error("Attraction not found.");
//         const data = await response.json();
//         setAttraction(data);

//         // Fetch Unsplash image
//         fetchImage(data.name);
//       } catch (err) {
//         setError("❌ Failed to load attraction details.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttractionDetails();
//   }, [id]);

//   // Fetch Unsplash image
//   const fetchImage = async (searchTerm) => {
//     try {
//       const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
//       const url = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;

//       const response = await axios.get(url);
//       const image = response.data.results[0]?.urls?.regular;
//       setImageUrl(image || "/default-attraction.jpg"); // fallback
//     } catch (err) {
//       console.error("Error fetching image:", err);
//       setImageUrl("/default-attraction.jpg"); // fallback
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-600">⏳ Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   if (!attraction) {
//     return <p className="text-center text-gray-600">No details found.</p>;
//   }

//   return (
//     <div className="p-8">
//       {/* Attraction Name */}
//       <h2 className="text-3xl font-bold text-purple-700">{attraction.name}</h2>

//       {/* Attraction Image */}
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt={attraction.name}
//           className="w-full h-60 object-cover rounded-lg mt-4 shadow-md"
//         />
//       )}

//       {/* Attraction Description */}
//       <p className="mt-4 text-lg text-gray-700">{attraction.description}</p>

//       {/* Extra Details */}
//       <div className="mt-6">
//         <h3 className="font-semibold text-xl text-purple-600">Details:</h3>
//         <ul className="list-disc pl-5 mt-2 text-gray-700">
//           <li><strong>Address:</strong> {attraction.address || "Not available"}</li>
//           <li><strong>Opening Hours:</strong> {attraction.openingHours || "Not specified"}</li>
//           <li><strong>Ticket Price:</strong> {attraction.ticketPrice || "Not specified"}</li>
//         </ul>
//       </div>

//       {/* Nearby Places */}
//       <div className="mt-10">
//         <NearbyPlaces city={attraction.name} />
//       </div>
//     </div>
//   );
// };

// export default AttractionDetail;





import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NearbyPlaces from "./NearbyPlaces";

const AttractionDetail = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch attraction data
  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/attractions/${id}`);
        if (!response.ok) throw new Error("Attraction not found.");
        const data = await response.json();
        setAttraction(data);

        // Fetch Unsplash image
        fetchImage(data.name);
      } catch (err) {
        setError("❌ Failed to load attraction details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractionDetails();
  }, [id]);

  // Fetch Unsplash image
  const fetchImage = async (searchTerm) => {
    try {
      const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
      const url = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;

      const response = await axios.get(url);
      const image = response.data.results[0]?.urls?.regular;
      setImageUrl(image || "/default-attraction.jpg"); // fallback
    } catch (err) {
      console.error("Error fetching image:", err);
      setImageUrl("/default-attraction.jpg"); // fallback
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 text-lg">⏳ Loading attraction details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-medium">{error}</p>;
  }

  if (!attraction) {
    return <p className="text-center text-gray-600">No details found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-purple-700 mb-4 text-center">
        {attraction.name}
      </h2>

      {/* Image */}
      {imageUrl && (
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={attraction.name}
            className="w-full h-80 object-cover"
          />
        </div>
      )}

      {/* Description */}
      <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center">
        {attraction.description || "No description available."}
      </p>

      {/* Extra Details */}
      <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-md">
        <h3 className="font-bold text-2xl text-purple-600 mb-4">📌 Details</h3>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong className="text-purple-700">Address:</strong>{" "}
            {attraction.address || "Not available"}
          </li>
          <li>
            <strong className="text-purple-700">Opening Hours:</strong>{" "}
            {attraction.openingHours || "Not specified"}
          </li>
          <li>
            <strong className="text-purple-700">Ticket Price:</strong>{" "}
            {attraction.ticketPrice || "Not specified"}
          </li>
        </ul>
      </div>

      {/* Nearby Places */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-purple-700 mb-4">
          🏞 Nearby Places
        </h3>
        {/* ✅ updated prop */}
        <NearbyPlaces locationName={attraction.name} />
      </div>
    </div>
  );
};

export default AttractionDetail;
