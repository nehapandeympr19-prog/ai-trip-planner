// components/DestinationModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, DollarSign, Star } from "lucide-react";

export default function DestinationModal({ destination, isOpen, onClose, onStartPlanning }) {
  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-80">
              <img
                src={destination.img}
                alt={destination.name}
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{destination.name}</h2>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.country}</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {destination.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* AI-Generated Highlights */}
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  AI-Generated Highlights
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Photo Gallery */}
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4">📸 Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-4">
                  {destination.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg hover:scale-105 transition cursor-pointer"
                    />
                  ))}
                </div>
              </section>

              {/* Cost Breakdown */}
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Cost Breakdown (7 days)
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{destination.cost.budget}</div>
                    <div className="text-sm text-gray-600">Budget</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{destination.cost.midRange}</div>
                    <div className="text-sm text-gray-600">Comfort</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{destination.cost.luxury}</div>
                    <div className="text-sm text-gray-600">Luxury</div>
                  </div>
                </div>
              </section>

              {/* Local Experiences */}
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4">🌟 Unique Local Experiences</h3>
                <div className="space-y-3">
                  {destination.experiences.map((experience, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{experience}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => onStartPlanning(destination)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-lg py-3 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Start Planning This Trip
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 py-3 text-lg"
                >
                  Explore More
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}