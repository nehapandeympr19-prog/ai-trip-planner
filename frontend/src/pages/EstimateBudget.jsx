// import { useState } from "react";

// export default function EstimateBudget() {
//   const [startLocation, setStartLocation] = useState("");
//   const [destination, setDestination] = useState("");
//   const [days, setDays] = useState("");
//   const [budget, setBudget] = useState("medium");
//   const [userBudget, setUserBudget] = useState(""); // Custom user-entered budget
//   const [currency, setCurrency] = useState("USD");
//   const [estimatedBudget, setEstimatedBudget] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const currencySymbols = {
//     USD: "$",
//     EUR: "€",
//     GBP: "£",
//     JPY: "¥",
//     INR: "₹",
//   };

//   const symbol = currencySymbols[currency] || "$";

//   const handleEstimate = async () => {
//     setError("");
//     setLoading(true);
//     setEstimatedBudget(null);

//     if (!startLocation || !destination || !days || !budget) {
//       setError("Please fill all fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const formData = {
//         start_location: startLocation,
//         destination,
//         start_date: new Date().toISOString().split("T")[0],
//         end_date: new Date(
//           new Date().setDate(new Date().getDate() + parseInt(days))
//         )
//           .toISOString()
//           .split("T")[0],
//         travelers: 1,
//         travel_style: budget,
//         currency,
//       };

//       if (userBudget) {
//         formData.user_budget = parseFloat(userBudget);
//       }

//       // ✅ Using fetch instead of axios
//       const response = await fetch("http://127.0.0.1:5000/estimate-budget", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }

//       setEstimatedBudget(data);
//     } catch (err) {
//       setError(`Failed to estimate: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Estimate Your Budget 💸
//       </h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
//           <p className="font-semibold">{error}</p>
//         </div>
//       )}

//       <input
//         className="w-full p-3 border rounded mb-3 text-lg"
//         placeholder="Start Location"
//         value={startLocation}
//         onChange={(e) => setStartLocation(e.target.value)}
//       />

//       <input
//         className="w-full p-3 border rounded mb-3 text-lg"
//         placeholder="Destination"
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//       />

//       <input
//         type="number"
//         min="1"
//         className="w-full p-3 border rounded mb-3 text-lg"
//         placeholder="Number of Days"
//         value={days}
//         onChange={(e) => setDays(e.target.value)}
//       />

//       <select
//         className="w-full p-3 border rounded mb-4 text-lg"
//         value={budget}
//         onChange={(e) => setBudget(e.target.value)}
//       >
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>

//       <select
//         className="w-full p-3 border rounded mb-4 text-lg"
//         value={currency}
//         onChange={(e) => setCurrency(e.target.value)}
//       >
//         <option value="USD">USD - US Dollar</option>
//         <option value="EUR">EUR - Euro</option>
//         <option value="GBP">GBP - British Pound</option>
//         <option value="JPY">JPY - Japanese Yen</option>
//         <option value="INR">INR - Indian Rupee</option>
//       </select>

//       {/* Custom Budget Input */}
//       <div className="mb-6">
//         <label className="block text-gray-700 mb-2 font-semibold text-lg">
//           Optional: Enter Your Budget ({symbol})
//         </label>
//         <input
//           type="number"
//           min="0"
//           placeholder={`e.g., 500`}
//           className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200 hover:shadow-md text-lg"
//           value={userBudget}
//           onChange={(e) => setUserBudget(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleEstimate}
//         className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Estimating..." : "Estimate Budget"}
//       </button>

//       {estimatedBudget && (
//         <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
//           <h3 className="font-bold text-xl mb-2">Estimated Budget:</h3>
//           <p className="text-lg">
//             Flight: <strong>{symbol}{estimatedBudget.flight_cost}</strong>
//           </p>
//           <p className="text-lg">
//             Hotel: <strong>{symbol}{estimatedBudget.hotel_cost}</strong>
//           </p>
//           <p className="text-lg">
//             Daily: <strong>{symbol}{estimatedBudget.daily_expenses}</strong>
//           </p>
//           <p className="mt-4 text-2xl font-semibold">
//             Total: {symbol}{estimatedBudget.total_cost}
//           </p>

//           {/* Show comparison */}
//           {userBudget && estimatedBudget && (
//             <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
//               <h4 className="font-semibold text-xl">Your Budget vs Estimated</h4>
//               <p className="text-lg">
//                 Your Budget: <strong>{symbol}{userBudget}</strong>
//               </p>
//               <p className="text-lg">
//                 Estimated Budget: <strong>{symbol}{estimatedBudget.total_cost}</strong>
//               </p>
//               {parseFloat(userBudget) >= estimatedBudget.total_cost ? (
//                 <p className="text-green-700 mt-2 font-medium">
//                   ✅ Your budget covers the estimated trip cost.
//                 </p>
//               ) : (
//                 <p className="text-red-600 mt-2 font-medium">
//                   ⚠️ Your budget is below the estimated trip cost.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// src/components/EstimateBudget.jsx
// import React, { useState } from "react";

// export default function EstimateBudget() {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [days, setDays] = useState(1);
//   const [hotelType, setHotelType] = useState("budget");
//   const [costData, setCostData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchCost = async () => {
//     if (!source || !destination) {
//       setError("Please enter both source and destination.");
//       return;
//     }
//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:5000/api/get-cost-estimate?source=${source}&destination=${destination}&days=${days}&hotel_type=${hotelType}`
//       );
//       const data = await response.json();
//       setCostData(data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch cost. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Estimate Your Budget</h2>

//       <div className="space-y-3 mb-4">
//         <input
//           type="text"
//           placeholder="Source city"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Destination city"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           type="number"
//           min="1"
//           value={days}
//           onChange={(e) => setDays(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <select
//           value={hotelType}
//           onChange={(e) => setHotelType(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="budget">Budget</option>
//           <option value="midrange">Midrange</option>
//           <option value="luxury">Luxury</option>
//         </select>
//       </div>

//       <button
//         onClick={fetchCost}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Calculating..." : "Estimate Cost"}
//       </button>

//       {error && <p className="text-red-500 mt-3">{error}</p>}

//       {costData && (
//         <div className="mt-6 p-4 border rounded bg-gray-50">
//           <h3 className="text-xl font-semibold mb-3">Cost Breakdown</h3>
//           <ul className="space-y-2">
//             <li>Transport: ₹{costData.breakdown.transport}</li>
//             <li>Hotel ({days} days): ₹{costData.breakdown.hotel}</li>
//             <li>Food ({days} days): ₹{costData.breakdown.food}</li>
//             <li>Activities: ₹{costData.breakdown.activities}</li>
//           </ul>
//           <h3 className="mt-4 text-lg font-bold">
//             Total Estimated Cost: ₹{costData.total_estimated_cost}
//           </h3>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EstimateBudget() {
  const [startCity, setStartCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [days, setDays] = useState(1);
  const [hotelType, setHotelType] = useState("budget");
  const [loading, setLoading] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstimatedCost(null);

    try {
      const queryParams = new URLSearchParams({
        source: startCity,
        destination: destinationCity,
        days: days.toString(),
        hotel_type: hotelType,
      });

      const response = await fetch(
        `http://localhost:5000/api/get-cost-estimate?${queryParams}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setEstimatedCost(data);
    } catch (error) {
      console.error("Error estimating budget:", error);
      alert("Failed to estimate budget. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Estimate Your Trip Budget
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Start City */}
          <div>
            <label
              htmlFor="startCity"
              className="block text-sm font-medium text-gray-600"
            >
              Start City
            </label>
            <Input
              id="startCity"
              type="text"
              placeholder="Enter your starting city"
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Destination City */}
          <div>
            <label
              htmlFor="destinationCity"
              className="block text-sm font-medium text-gray-600"
            >
              Destination City
            </label>
            <Input
              id="destinationCity"
              type="text"
              placeholder="Enter your destination city"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Number of Days */}
          <div>
            <label
              htmlFor="days"
              className="block text-sm font-medium text-gray-600"
            >
              Number of Days
            </label>
            <Input
              id="days"
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="mt-1"
              required
            />
          </div>

          {/* Hotel Type */}
          <div>
            <label
              htmlFor="hotelType"
              className="block text-sm font-medium text-gray-600"
            >
              Hotel Type
            </label>
            <Select value={hotelType} onValueChange={setHotelType}>
              <SelectTrigger id="hotelType" className="mt-1">
                <SelectValue placeholder="Select hotel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Estimating..." : "Estimate"}
          </Button>
        </form>

        {/* Result Display */}
        {estimatedCost && (
          <div className="mt-8 p-6 bg-green-50 rounded-xl shadow-md border border-green-200">
            <h3 className="font-bold text-xl mb-4 text-green-800">
              Estimated Budget
            </h3>
            <p className="text-lg font-extrabold text-gray-900 mb-3">
              💰 Total: ₹{estimatedCost.total_estimated_cost}
            </p>

            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p>🚗 <strong>Transport:</strong> ₹{estimatedCost.breakdown.transport}</p>
              <p>🏨 <strong>Hotel:</strong> ₹{estimatedCost.breakdown.hotel}</p>
              <p>🍴 <strong>Food:</strong> ₹{estimatedCost.breakdown.food}</p>
              <p>🎯 <strong>Activities:</strong> ₹{estimatedCost.breakdown.activities}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
