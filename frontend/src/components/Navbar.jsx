import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Function to open external flight booking
  const handleBookFlight = () => {
    const fromCity = "DEL"; // Example: Delhi (can make dynamic later)
    const toCity = "VNS";   // Example: Varanasi
    const depDate = "2025-10-05"; // Example departure date

    const url = `https://www.makemytrip.com/flights/?fromCity=${fromCity}&toCity=${toCity}&tripType=O&depDate=${depDate}`;
    window.open(url, "_blank"); // Opens in new tab
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          AI Trip Planner
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/plan" className="hover:text-gray-200">Plan Trip</Link>
          <Link to="/saved-itineraries" className="hover:text-gray-200">Saved</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          <Link to="/estimate-budget" className="hover:text-gray-200">Estimate Budget</Link>
          <Link to="/chatbot" className="hover:text-gray-200">Chatbot</Link>

          {/* ✅ New Book Flight Button */}
          <button
            onClick={handleBookFlight}
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Book Flights
          </button>

          {/* Auth Buttons */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
