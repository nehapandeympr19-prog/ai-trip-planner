import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroVideoSection() {
  const navigate = useNavigate();

  // Sample itineraries to cycle
  const itineraries = [
    { days: "3 Days", budget: "$500", top: "Bali, Maldives" },
    { days: "5 Days", budget: "$800", top: "Swiss Alps, Nepal" },
    { days: "4 Days", budget: "$650", top: "Paris, Rome" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itineraries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      {/* Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://cdn.videvo.net/videvo_files/video/free/2017-07/small_watermarked/170625_Videvo_Travel_02_preview.mp4"
        type="video/mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      {/* Text + CTA */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-4">
          ✨ Plan Smarter. Travel Better.
        </h2>
        <p className="text-md md:text-xl max-w-2xl mb-8 text-gray-200">
          Your AI-powered trip planner creates custom itineraries, destination ideas, and budget insights — in seconds.
        </p>

        <Button
          className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 hover:shadow-xl transition"
          onClick={() => navigate("/plan")}
        >
          🚀 Start Planning Now
        </Button>

        {/* Animated Itinerary */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
          <AnimatePresence>
            {itineraries.map(
              (item, idx) =>
                idx === currentIndex && (
                  <motion.div
                    key={idx}
                    className="bg-white/20 backdrop-blur-lg text-black rounded-xl px-6 py-3 flex gap-6 items-center font-semibold shadow-lg"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span>🗓 {item.days}</span>
                    <span>💰 {item.budget}</span>
                    <span>🌍 {item.top}</span>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
