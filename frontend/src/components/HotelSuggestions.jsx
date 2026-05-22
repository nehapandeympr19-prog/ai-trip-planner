


// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function HotelSuggestions({ hotels: propHotels = [], destination }) {
//   const [hotels, setHotels] = useState(propHotels);
//   const [loading, setLoading] = useState(!propHotels.length);

//   useEffect(() => {
//     if (propHotels.length > 0 || !destination) return;

//     const fetchHotels = async () => {
//       try {
//         const res = await fetch(`http://127.0.0.1:5000/hotels?city=${destination}`);
//         const data = await res.json();
//         setHotels(data.hotels || []);
//       } catch (err) {
//         console.error("Error fetching hotels:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, [destination, propHotels]);

//   if (loading) return <p className="text-center text-gray-600">Loading hotels...</p>;
//   if (hotels.length === 0) return <p className="text-center text-gray-600">No hotels found.</p>;

//   return (
//     <div className="mt-10">
//       <h3 className="text-2xl font-bold text-purple-700 mb-4">🏨 Recommended Hotels</h3>
//       <div className="grid gap-4 md:grid-cols-2">
//         {hotels.map((hotel, idx) => (
//           <Card key={idx} className="p-4 bg-white shadow rounded-xl">
//             <CardContent>
//               <h4 className="text-lg font-semibold">{hotel.name}</h4>
//               <p className="text-gray-600">{hotel.address}</p>
//               <p className="text-indigo-700 font-bold">Hotel ID: {hotel.hotelId}</p>
//               <a
//                 href={`https://www.google.com/search?q=${encodeURIComponent(
//                   hotel.name + " hotel " + hotel.city
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button className="mt-3 bg-purple-600 text-white">Book Now</Button>
//               </a>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HotelSuggestions({ hotels: propHotels = [], destination }) {
  const [hotels, setHotels] = useState(propHotels);
  const [loading, setLoading] = useState(!propHotels.length);

  useEffect(() => {
    if (propHotels.length > 0 || !destination) return;

    const fetchHotels = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/hotels?city=${destination}`);
        const data = await res.json();
        setHotels(data.hotels || []);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, propHotels]);

  if (loading) return <p className="text-center text-gray-600">Loading hotels...</p>;
  if (hotels.length === 0) return <p className="text-center text-gray-600">No hotels found.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel, idx) => (
        <Card
          key={idx}
          className="bg-white shadow-xl hover:shadow-2xl transition rounded-xl border border-purple-200"
        >
          <CardContent className="p-5 space-y-3">
            <h4 className="text-xl font-semibold text-purple-800">{hotel.name}</h4>
            <p className="text-gray-700">{hotel.address}</p>
            <p className="text-indigo-600 font-medium">Hotel ID: {hotel.hotelId}</p>

            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                hotel.name + " hotel " + hotel.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-2">
                Book Now
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
