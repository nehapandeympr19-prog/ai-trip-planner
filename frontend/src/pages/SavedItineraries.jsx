
// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// // ✅ Helper: Get token from localStorage
// const getToken = () => localStorage.getItem("token");

// export default function SavedItineraries() {
//   const [savedTrips, setSavedTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch saved itineraries from backend
//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/itineraries", {
//       headers: {
//         Authorization: `Bearer ${getToken()}`
//       }
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setSavedTrips(data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching saved itineraries:", err);
//         setLoading(false);
//       });
//   }, []);

//   // ✅ Delete itinerary
// const handleDelete = async (id) => {
//   // Show confirmation popup
//   const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
  
//   if (!confirmDelete) return; // ❌ stop if user cancels

//   try {
//     const res = await fetch(`http://127.0.0.1:5000/itineraries/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${getToken()}` }
//     });

//     if (res.ok) {
//       // ✅ Remove deleted trip from state
//       setSavedTrips((prev) => prev.filter((trip) => trip.id !== id));
//     } else {
//       console.error("Failed to delete itinerary");
//     }
//   } catch (err) {
//     console.error("Error deleting itinerary:", err);
//   }
// };



//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-xl">
//         Loading saved itineraries...
//       </div>
//     );
//   }

//   if (savedTrips.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-xl">
//         No saved itineraries found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
//           📂 Saved Itineraries
//         </h2>

//         <div className="grid gap-6">
//           {savedTrips.map((trip) => {
//             // 🛠 Ensure plan is parsed correctly
//             let itinerary = [];
//             try {
//               itinerary =
//                 typeof trip.plan === "string"
//                   ? JSON.parse(trip.plan)
//                   : trip.plan;
//             } catch (err) {
//               console.error("Error parsing itinerary:", err);
//             }

//             return (
//               <Card
//                 key={trip.id}
//                 className="p-4 shadow-lg border border-green-200 bg-white rounded-xl"
//               >
//                 <CardContent>
//                   <h3 className="text-2xl font-semibold text-green-800 mb-2">
//                     {trip.destination}
//                   </h3>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Budget:</strong> {trip.budget}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Interests:</strong>{" "}
//                     {Array.isArray(trip.interests)
//                       ? trip.interests.join(", ")
//                       : trip.interests}
//                   </p>
//                   <p className="text-gray-600 mb-4">
//                     <strong>Duration:</strong> {trip.days} days
//                   </p>

//                   {/* ✅ Show Itinerary */}
//                   {itinerary && itinerary.length > 0 ? (
//                     <div className="space-y-4">
//                       {itinerary.map((day, i) => (
//                         <div
//                           key={i}
//                           className="p-3 bg-gray-50 rounded-lg border"
//                         >
//                           <h4 className="font-bold text-green-600 mb-2">
//                             Day {day.day}
//                           </h4>
//                           {day.morning && (
//                             <p>🌅 <strong>Morning:</strong> {day.morning}</p>
//                           )}
//                           {day.afternoon && (
//                             <p>🌞 <strong>Afternoon:</strong> {day.afternoon}</p>
//                           )}
//                           {day.evening && (
//                             <p>🌙 <strong>Evening:</strong> {day.evening}</p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 italic">
//                       No itinerary details available.
//                     </p>
//                   )}

//                   <Button
//                     variant="destructive"
//                     className="mt-4"
//                     onClick={() => handleDelete(trip.id)}
//                   >
//                     ❌ Delete
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ Get token from localStorage
const getToken = () => localStorage.getItem("token");

export default function SavedItineraries() {
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch saved itineraries from backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/itineraries", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedTrips(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching saved itineraries:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Delete itinerary
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this itinerary?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/itineraries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        setSavedTrips((prev) => prev.filter((trip) => trip.id !== id));
      } else {
        console.error("Failed to delete itinerary");
      }
    } catch (err) {
      console.error("Error deleting itinerary:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-xl">
        Loading saved itineraries...
      </div>
    );
  }

  if (savedTrips.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-xl">
        No saved itineraries found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
          📂 Saved Itineraries
        </h2>

        <div className="grid gap-6">
          {savedTrips.map((trip) => {
            let itineraryParsed;

            // ✅ Try to parse plan
            try {
              const parsed =
                typeof trip.plan === "string"
                  ? JSON.parse(trip.plan)
                  : trip.plan;

              // Support both `plan = []` or `plan = { itinerary: [] }`
              if (Array.isArray(parsed)) {
                itineraryParsed = parsed;
              } else if (Array.isArray(parsed?.itinerary)) {
                itineraryParsed = parsed.itinerary;
              } else {
                itineraryParsed = [];
              }
            } catch (err) {
              console.error("Error parsing itinerary:", err);
              itineraryParsed = [];
            }

            return (
              <Card
                key={trip.id}
                className="p-4 shadow-lg border border-green-200 bg-white rounded-xl"
              >
                <CardContent>
                  <h3 className="text-2xl font-semibold text-green-800 mb-2">
                    {trip.destination}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Budget:</strong> {trip.budget}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Interests:</strong>{" "}
                    {Array.isArray(trip.interests)
                      ? trip.interests.join(", ")
                      : trip.interests}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Duration:</strong> {trip.days} days
                  </p>

                  {/* ✅ Render itinerary */}
                  {itineraryParsed.length > 0 ? (
                    <div className="space-y-4">
                      {itineraryParsed.map((day, i) => (
                        <div
                          key={i}
                          className="p-3 bg-gray-50 rounded-lg border"
                        >
                          <h4 className="font-bold text-green-600 mb-2">
                            Day {day.day || i + 1}
                          </h4>

                          {day.morning && (
                            <div className="mb-2">
                              <p>
                                🌅 <strong>Morning:</strong>{" "}
                                {typeof day.morning === "string"
                                  ? day.morning
                                  : day.morning.title || "Untitled"}
                              </p>
                              {typeof day.morning !== "string" && (
                                <p className="text-sm text-gray-600">
                                  {day.morning.description}
                                </p>
                              )}
                            </div>
                          )}

                          {day.afternoon && (
                            <div className="mb-2">
                              <p>
                                🌞 <strong>Afternoon:</strong>{" "}
                                {typeof day.afternoon === "string"
                                  ? day.afternoon
                                  : day.afternoon.title || "Untitled"}
                              </p>
                              {typeof day.afternoon !== "string" && (
                                <p className="text-sm text-gray-600">
                                  {day.afternoon.description}
                                </p>
                              )}
                            </div>
                          )}

                          {day.evening && (
                            <div className="mb-2">
                              <p>
                                🌙 <strong>Evening:</strong>{" "}
                                {typeof day.evening === "string"
                                  ? day.evening
                                  : day.evening.title || "Untitled"}
                              </p>
                              {typeof day.evening !== "string" && (
                                <p className="text-sm text-gray-600">
                                  {day.evening.description}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No itinerary details available.
                    </p>
                  )}

                  <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={() => handleDelete(trip.id)}
                  >
                    ❌ Delete
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
