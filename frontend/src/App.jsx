import React, { useState, useEffect } from "react"; // ✅ Import React and useState
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Routing
import Navbar from "./components/Navbar"; // Navbar component
import Footer from "./components/Footer"; // Footer component
import Home from "./pages/Home"; // Home page
import PlanTrip from "./pages/PlanTrip"; // Plan trip page
import About from "./pages/About"; // About page
import Contact from "./pages/Contact"; // Contact page
import ItineraryDisplay from "./components/ItineraryDisplay"; // Itinerary display component
import SavedItineraries from "./pages/SavedItineraries"; // Saved itineraries page
import Login from "./pages/Login"; // Login page
import Signup from "./pages/Signup"; // Signup page
import Chatbot from "./pages/Chatbot"; // Chatbot page
import AttractionDetail from "./components/AttractionDetail"; // Attraction details
import DestinationDetail from "./pages/DestinationDetail"; // Destination details page
import EstimateBudget from "./pages/EstimateBudget"; // Budget estimation page
// ....................
import AdminContactMessages from './components/AdminContactMessages';
// ;;;;;;;;;;;;;;;;;;
import { AuthProvider, useAuth } from "./context/AuthContext"; // Auth context for user authentication

function ProtectedRoute({ children }) {
  const { token } = useAuth(); // Check if user is authenticated
  return token ? children : <Navigate to="/login" />; // If not, redirect to login
}

function App() {
  const [backgroundImage, setBackgroundImage] = useState(""); // State for dynamic background image

  useEffect(() => {
    const city = "Udaipur"; // Example city, can be dynamic
    setBackgroundImage(`url('https://source.unsplash.com/1600x900/?${city}')`); // Set background dynamically based on city
  }, []);

  return (
    <AuthProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover", // Make background cover the entire screen
          backgroundPosition: "center", // Center the background image
          backgroundColor: "#f9f9f9", // Fallback color while loading
          transition: "background-image 0.5s ease-in-out", // Smooth transition while loading image
        }}
      >
        <Router>
          <Navbar /> {/* Navbar at the top */}

          <main className="flex-grow pb-0 mb-0"> {/* Main content area, no bottom padding or margin */}
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/estimate-budget" element={<EstimateBudget />} />
              <Route path="/attraction/:id" element={<AttractionDetail />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/chatbot" element={<Chatbot />} />

              // Add this route along with your other routes
<Route path="/admin/messages" element={<AdminContactMessages />} />

              {/* Protected routes */}
              <Route
                path="/plan"
                element={
                  <ProtectedRoute>
                    <PlanTrip />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/itinerary"
                element={
                  <ProtectedRoute>
                    <ItineraryDisplay />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-itineraries"
                element={
                  <ProtectedRoute>
                    <SavedItineraries />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer /> {/* Footer at the bottom */}
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
