// // DestinationDetail.jsx
// import { useParams } from "react-router-dom";

// export default function DestinationDetail() {
//   const { id } = useParams();

//   // Hardcoded sample details
//   const details = {
//     "swiss-alps": {
//       name: "Swiss Alps",
//       bestPlaces: ["Zermatt", "Interlaken", "Grindelwald"],
//       food: ["Fondue", "Rösti", "Swiss Chocolate"],
//       activities: ["Skiing", "Hiking", "Cable Car Rides"],
//     },
//     bali: {
//       name: "Bali",
//       bestPlaces: ["Ubud", "Seminyak", "Tanah Lot Temple"],
//       food: ["Nasi Goreng", "Satay", "Babi Guling"],
//       activities: ["Surfing", "Beach Parties", "Temple Visits"],
//     },
//     paris: {
//       name: "Paris",
//       bestPlaces: ["Eiffel Tower", "Louvre Museum", "Notre Dame"],
//       food: ["Croissants", "Escargot", "Macarons"],
//       activities: ["River Seine Cruise", "Art Tours", "Fashion Shopping"],
//     },
//   };

//   const place = details[id];

//   if (!place) return <p className="p-10">No details available for {id}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <h1 className="text-4xl font-bold mb-6">{place.name}</h1>

//       <h2 className="text-2xl font-semibold mt-6">🏞 Best Places to Visit</h2>
//       <ul className="list-disc list-inside">
//         {place.bestPlaces.map((p) => <li key={p}>{p}</li>)}
//       </ul>

//       <h2 className="text-2xl font-semibold mt-6">🍲 Food to Try</h2>
//       <ul className="list-disc list-inside">
//         {place.food.map((f) => <li key={f}>{f}</li>)}
//       </ul>

//       <h2 className="text-2xl font-semibold mt-6">🎟 Activities</h2>
//       <ul className="list-disc list-inside">
//         {place.activities.map((a) => <li key={a}>{a}</li>)}
//       </ul>
//     </div>
//   );
// }



import { useParams } from "react-router-dom";

export default function DestinationDetail() {
  const { id } = useParams();

  // Hardcoded sample details
  const details = {
    "swiss-alps": {
      name: "Swiss Alps",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      bestPlaces: [
        { name: "Zermatt", img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad" },
        { name: "Interlaken", img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba" },
        { name: "Grindelwald", img: "https://images.unsplash.com/photo-1505731132164-cca3e6ec4b7a" },
      ],
      food: ["Fondue", "Rösti", "Swiss Chocolate"],
      activities: ["Skiing", "Hiking", "Cable Car Rides"],
    },
    // bali: {
    //   name: "Bali",
    //   img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    //   bestPlaces: [
    //     { name: "Ubud", img: "https://images.unsplash.com/photo-1549693578-d683be217e58" },
    //     { name: "Seminyak", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
    //     { name: "Tanah Lot Temple", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    //   ],
    //   food: ["Nasi Goreng", "Satay", "Babi Guling"],
    //   activities: ["Surfing", "Beach Parties", "Temple Visits"],
    // },
    bali: {
  name: "Bali",
  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  description: "Bali is a tropical paradise in Indonesia known for its serene beaches, vibrant culture, and stunning temples.",
  bestPlaces: [
    { name: "Ubud", img: "https://images.unsplash.com/photo-1549693578-d683be217e58" },
    { name: "Seminyak", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
    { name: "Tanah Lot Temple", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  ],
  food: ["Nasi Goreng", "Satay", "Babi Guling"],
  activities: ["Surfing", "Beach Parties", "Temple Visits"],
  accommodation: [
    {
      name: "The Legian Bali",
      type: "Luxury Resort",
      price: "$250+ / night",
      img: "https://example.com/luxury.jpg",
    },
    {
      name: "Kuta Backpackers",
      type: "Budget Hostel",
      price: "$25 / night",
      img: "https://example.com/hostel.jpg",
    },
  ],
  mapEmbed: "https://www.google.com/maps/embed?pb=...",
  travelTips: [
    "Best time to visit: April to October (dry season).",
    "Carry local currency (IDR) for local vendors.",
    "Respect customs when entering temples.",
  ],
},

maldives: {
  name: "Maldives",
  img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  description: "The Maldives is a tropical paradise in the Indian Ocean, famous for its crystal-clear waters, luxurious overwater bungalows, and world-class diving spots.",
  bestPlaces: [
    {
      name: "Maafushi Island",
      img: "https://images.unsplash.com/photo-1540206395-ad567bdb0c29"
    },
    {
      name: "Male",
      img: "https://images.unsplash.com/photo-1595261216485-bf6dbf2197d1"
    },
    {
      name: "Baros Maldives",
      img: "https://images.unsplash.com/photo-1576841071074-934e2c86fc36"
    },
  ],
  food: ["Mas Huni", "Garudhiya", "Reef Fish Curry"],
  activities: ["Snorkeling", "Scuba Diving", "Sunset Cruise"],
  accommodation: [
    {
      name: "Baros Maldives",
      type: "Luxury Resort",
      price: "$600+ / night",
      img: "https://images.unsplash.com/photo-1576841071074-934e2c86fc36",
    },
    {
      name: "Kaani Village & Spa",
      type: "Mid-range Hotel",
      price: "$120 / night",
      img: "https://images.unsplash.com/photo-1582719368743-4d89d10c78e0",
    },
  ],
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1988931.0967099592!2d71.29451570724905!3d3.2027785999999966!2m3!1f0!2f0!3f0!3m2...",
  travelTips: [
    "Best time to visit: November to April (dry season).",
    "Currency: Maldivian Rufiyaa (MVR), but USD is widely accepted.",
    "Dress modestly on local islands; bikinis allowed on resort islands.",
  ],
},


    paris: {
      name: "Paris",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      bestPlaces: [
        { name: "Eiffel Tower", img: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVpZmZlbHxlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Louvre Museum", img: "https://media.istockphoto.com/id/152159034/photo/tuileriess-gardens.webp?a=1&b=1&s=612x612&w=0&k=20&c=IWxwzwzKdT0DZFfaMZyAWMKmM-fcyN8nioAZ3sIMGQE=" },
        { name: "Notre Dame", img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad" },
      ],
      food: ["Croissants", "Escargot", "Macarons"],
      activities: ["River Seine Cruise", "Art Tours", "Fashion Shopping"],
    },
  };

  const place = details[id];

  if (!place) return <p className="p-10 text-center text-xl">No details available for {id}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Image */}
      <div className="relative h-96 rounded-xl overflow-hidden shadow-lg mb-8">
        <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{place.name}</h1>
        </div>
      </div>

      {/* Best Places */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🏞 Best Places to Visit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {place.bestPlaces.map((p) => (
            <div key={p.name} className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer">
              <img src={p.img} alt={p.name} className="h-48 w-full object-cover" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold">{p.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Food */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🍲 Food to Try</h2>
        <div className="flex flex-wrap gap-4">
          {place.food.map((f) => (
            <span key={f} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full shadow-sm">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🎟 Activities</h2>
        <div className="flex flex-wrap gap-4">
          {place.activities.map((a) => (
            <span key={a} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-sm">
              {a}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}





