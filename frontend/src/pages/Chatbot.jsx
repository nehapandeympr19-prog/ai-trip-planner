import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendChatMessage } from "../../utils/api";
import { MessageCircle, Send, X, Sparkles, Plane, MapPin, Hotel, Utensils, Globe } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot", 
      text: "Hello! I'm your AI travel assistant 🌍\nI can help you with:\n• Flight information ✈️\n• Hotel recommendations 🏨\n• Local cuisine 🍽️\n• Travel itineraries 📅\nWhat would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Travel destinations for background
  const featuredDestinations = [
    { name: "Bali", country: "Indonesia", icon: "🏝️", color: "from-emerald-400 to-cyan-500" },
    { name: "Paris", country: "France", icon: "🗼", color: "from-blue-400 to-indigo-500" },
    { name: "Tokyo", country: "Japan", icon: "🗾", color: "from-red-400 to-pink-500" },
    { name: "New York", country: "USA", icon: "🗽", color: "from-purple-400 to-blue-500" },
    { name: "Rome", country: "Italy", icon: "🏛️", color: "from-amber-400 to-orange-500" },
    { name: "Dubai", country: "UAE", icon: "🏙️", color: "from-yellow-400 to-red-500" }
  ];

  // Travel tips and facts
  const travelFacts = [
    "✈️ Best time to book flights: 6-8 weeks in advance",
    "🏨 Save 20% on hotels by booking directly",
    "🌍 Travel insurance can save you thousands",
    "🍽️ Local markets offer authentic food experiences",
    "📱 Use offline maps when traveling abroad",
    "💵 Always have local currency for small purchases"
  ];

  const quickActions = [
    { icon: "✈️", text: "Find flights to Paris", prompt: "Find cheap flights to Paris next month" },
    { icon: "🏨", text: "Hotels in Tokyo", prompt: "Recommend luxury hotels in Tokyo" },
    { icon: "🍽️", text: "Local food in Rome", prompt: "What are the must-try foods in Rome?" },
    { icon: "🗺️", text: "3-day Bali itinerary", prompt: "Create a 3-day itinerary for Bali" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const simulateTyping = async (callback) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);
    callback();
  };

  const sendMessage = async (customPrompt = null) => {
    const messageText = customPrompt || input.trim();
    if (!messageText) return;

    const userMessage = { 
      sender: "user", 
      text: messageText,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    await simulateTyping(async () => {
      try {
        const data = await sendChatMessage(messageText);
        
        if (data.reply) {
          setMessages(prev => [...prev, { 
            sender: "bot", 
            text: data.reply,
            timestamp: new Date()
          }]);
        } else {
          throw new Error("No reply from bot");
        }
      } catch (err) {
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: "I apologize, I'm having trouble connecting. Please try again! 🌟",
          timestamp: new Date()
        }]);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleQuickAction = (prompt) => {
    sendMessage(prompt);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <>
            {/* Enhanced Backdrop with Travel Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 overflow-hidden"
              onClick={() => setOpen(false)}
            >
              {/* Animated Travel Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                {/* Floating Destination Cards */}
                {featuredDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.name}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                    className={`absolute bg-gradient-to-r ${dest.color} rounded-2xl p-4 text-white shadow-2xl backdrop-blur-sm border border-white/20`}
                    style={{
                      top: `${20 + (index * 12)}%`,
                      left: `${10 + (index * 15)}%`,
                      width: '180px',
                      transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`
                    }}
                  >
                    <div className="text-2xl mb-2">{dest.icon}</div>
                    <div className="font-bold text-sm">{dest.name}</div>
                    <div className="text-xs opacity-80">{dest.country}</div>
                  </motion.div>
                ))}

                {/* Floating Travel Icons */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/4 right-1/4 text-4xl opacity-20"
                >
                  ✈️
                </motion.div>
                <motion.div
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-1/3 left-1/3 text-3xl opacity-20"
                >
                  🏨
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute top-2/3 right-1/3 text-2xl opacity-20"
                >
                  🌍
                </motion.div>

                {/* Travel Facts */}
                <div className="absolute bottom-10 left-10 max-w-md">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 text-white border border-white/10"
                  >
                    <h3 className="font-bold mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Travel Pro Tip
                    </h3>
                    <p className="text-sm">{travelFacts[Math.floor(Math.random() * travelFacts.length)]}</p>
                  </motion.div>
                </div>

                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center"
                >
                  <h1 className="text-4xl font-bold text-white mb-2">AI Travel Assistant</h1>
                  <p className="text-white/80">Your personal guide to the world 🌎</p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Chat Container - Semi-transparent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[85vh] max-h-[700px] flex flex-col bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
            >
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 p-4 flex justify-between items-center relative">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Travel Assistant</h2>
                    <p className="text-white/80 text-sm">AI-powered travel expert</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area - More Transparent */}
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-white/40 to-blue-50/20">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex max-w-[85%] space-x-2 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.sender === "user" 
                            ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                            : "bg-gradient-to-r from-gray-400/80 to-gray-500/80"
                        }`}>
                          {msg.sender === "user" ? (
                            <span className="text-white text-sm">👤</span>
                          ) : (
                            <Sparkles className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl p-3 shadow-lg backdrop-blur-sm ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white rounded-br-none"
                            : "bg-white/90 text-gray-800 border border-white/20 rounded-bl-none"
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
                          <div className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-600"}`}>
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400/80 to-gray-500/80 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/90 rounded-2xl rounded-bl-none p-3 shadow-lg backdrop-blur-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Actions */}
                  {messages.length === 1 && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <p className="text-center text-sm text-gray-700 font-medium">Quick suggestions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuickAction(action.prompt)}
                            className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl p-2 text-xs text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200 text-left"
                          >
                            <span className="text-lg">{action.icon}</span>
                            <div className="mt-1 font-medium">{action.text}</div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-white/30">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-xl p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/95"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about flights, hotels, itineraries..."
                      onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}

                      disabled={loading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
                <p className="text-center text-xs text-gray-600 mt-2">
                  Powered by AI • Real-time travel assistance
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}