// const API_URL = "http://127.0.0.1:5000"; // change this if backend is deployed

// // 🔹 Login
// export async function loginUser(email, password) {
//   const res = await fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json();
// }

// // 🔹 Signup / Register
// export async function registerUser(name, email, password) {
//   const res = await fetch(`${API_URL}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });
//   return res.json();
// }

// // 🔹 Generate AI Trip Plan
// export async function generatePlan(formData, token) {
//   const res = await fetch(`${API_URL}/plan-trip`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(formData),
//   });
//   return res.json();
// }



// src/api.js

// // ✅ Backend URL (switches automatically for dev/prod)
// const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// // 🔹 Login
// export async function loginUser(email, password) {
//   const res = await fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json();
// }

// // 🔹 Signup / Register
// export async function registerUser(name, email, password) {
//   const res = await fetch(`${API_URL}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });
//   return res.json();
// }

// // 🔹 Generate AI Trip Plan
// export async function generatePlan(formData, token) {
//   const res = await fetch(`${API_URL}/plan-trip`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(formData),
//   });
//   return res.json();
// }

// // 🔹 Save Itinerary
// export async function saveItinerary(itinerary, token) {
//   const res = await fetch(`${API_URL}/save_itinerary`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(itinerary),
//   });
//   return res.json();
// }

// // 🔹 Get Saved Itineraries
// export async function getSavedItineraries(token) {
//   const res = await fetch(`${API_URL}/get_itineraries`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// }

// // 🔹 Delete Itinerary
// export async function deleteItinerary(id, token) {
//   const res = await fetch(`${API_URL}/delete_itinerary/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// }


// ✅ Backend URL (switches automatically for dev/prod)
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// 🔹 Login
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// 🔹 Signup / Register
export async function registerUser(name, email, password) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

// 🔹 Generate AI Trip Plan
export async function generatePlan(formData, token) {
  const res = await fetch(`${API_URL}/plan-trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
}

// 🔹 Hotel Suggestions
export async function getHotelSuggestions(city, checkIn, checkOut) {
  const res = await fetch(
    `${API_URL}/hotels?city=${encodeURIComponent(city)}&checkIn=${checkIn}&checkOut=${checkOut}`
  );
  return res.json();
}

// 🔹 Save Itinerary
export async function saveItinerary(itinerary, token) {
  const res = await fetch(`${API_URL}/save_itinerary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itinerary),
  });
  return res.json();
}

// 🔹 Get Saved Itineraries
export async function getSavedItineraries(token) {
  const res = await fetch(`${API_URL}/get_itineraries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// 🔹 Delete Itinerary
export async function deleteItinerary(id, token) {
  const res = await fetch(`${API_URL}/delete_itinerary/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// 🔹 Chatbot Conversation
// Add this to your existing utils/api.js

export const sendChatMessage = async (message, history = []) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: message,
        history: history
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Add this to your existing api.js
export const calculateDuration = async (startDate, endDate) => {
  const response = await fetch(`${API_URL}/calculate-duration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startDate, endDate })
  });
  
  if (!response.ok) {
    throw new Error('Failed to calculate duration');
  }
  
  return await response.json();
};

// // Test connection to chat service
// export const testChatConnection = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/api/chat/test');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error testing chat connection:', error);
//     throw error;
//   }
// };