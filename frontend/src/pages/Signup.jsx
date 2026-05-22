// Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const data = await registerUser(name, email, password);

      if (data.message) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-100 p-4 relative overflow-hidden">
      {/* Travel-themed background with subtle animation */}
      <div className="absolute inset-0 z-0">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-blue-900/30"></div>
        
        {/* Animated travel icons */}
        <div className="absolute top-12 left-12 text-white/20 text-4xl animate-bounce">🧳</div>
        <div className="absolute top-24 right-24 text-white/20 text-3xl animate-pulse delay-300">🌍</div>
        <div className="absolute bottom-24 left-24 text-white/20 text-4xl animate-bounce delay-500">📸</div>
        <div className="absolute bottom-12 right-12 text-white/20 text-3xl animate-pulse delay-700">🏨</div>
        <div className="absolute top-1/3 left-1/3 text-white/20 text-4xl animate-pulse delay-1000">🚗</div>
        <div className="absolute bottom-1/3 right-1/3 text-white/20 text-3xl animate-bounce delay-700">🗺️</div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-teal-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-cyan-300/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Signup form container */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 w-full max-w-md overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
        {/* Header with travel theme */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 p-6 text-center relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          
          <div className="flex items-center justify-center space-x-3 mb-2 relative z-10">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold text-white tracking-wide">AI Trip Planner</h1>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
          </div>
          <p className="text-teal-100 text-sm font-medium">Start Your Adventure</p>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-teal-700 to-blue-800 bg-clip-text text-transparent">
            Join Us Today
          </h2>
          <p className="text-gray-600 text-center mb-6">Create your account and start planning</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center animate-shake">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-center animate-pulse">
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{success}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-teal-600 hover:text-blue-700 font-semibold transition-colors duration-300 hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}