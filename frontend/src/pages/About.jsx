export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white px-6 py-12">
      
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center mb-6">About AI Trip Planner</h1>
      <p className="text-lg text-center max-w-3xl mx-auto text-gray-200 mb-12">
        AI Trip Planner helps you create personalized travel itineraries using Artificial Intelligence. 
        Simply enter your destination, preferences, and budget — and let our system craft the perfect trip for you!
      </p>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition">
          <div className="text-4xl mb-3">🧳</div>
          <h3 className="text-2xl font-semibold mb-2">Personalized Itineraries</h3>
          <p>Create trips based on your style — adventure, leisure, or cultural.</p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-2xl font-semibold mb-2">Smart Budgeting</h3>
          <p>Estimate expenses and stay within budget with AI suggestions.</p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-2xl font-semibold mb-2">Interactive Maps</h3>
          <p>Visualize your journey with maps highlighting destinations and routes.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-white text-indigo-900 p-6 rounded-full w-32 h-32 flex items-center justify-center shadow-xl text-lg font-bold">
            1️⃣ Enter Destination
          </div>
          <div className="text-4xl text-white">➡️</div>
          <div className="bg-white text-indigo-900 p-6 rounded-full w-32 h-32 flex items-center justify-center shadow-xl text-lg font-bold">
            2️⃣ Select Preferences
          </div>
          <div className="text-4xl text-white">➡️</div>
          <div className="bg-white text-indigo-900 p-6 rounded-full w-32 h-32 flex items-center justify-center shadow-xl text-lg font-bold">
            3️⃣ Get AI Itinerary
          </div>
        </div>
      </div>

    </div>
  );
}
