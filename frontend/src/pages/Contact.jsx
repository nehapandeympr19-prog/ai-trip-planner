// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

// export default function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [status, setStatus] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("Sending...");

//     try {
//       const res = await fetch("http://localhost:5000/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         setStatus("✅ Message sent successfully!");
//         setForm({ name: "", email: "", message: "" });
//       } else {
//         setStatus("❌ Failed to send message. Try again.");
//       }
//     } catch (err) {
//       setStatus("⚠️ Server error.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-gray-900 mb-4">
//             Get In Touch
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Have questions about planning your dream trip? We're here to help! 
//             Reach out and we'll get back to you within 24 hours.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Contact Information */}
//           <div className="lg:col-span-1 space-y-6">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Contact Information
//                 </h2>
                
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="bg-blue-100 p-2 rounded-full">
//                       <Mail className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Email</h3>
//                       <p className="text-gray-600">support@aitripplanner.com</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-3">
//                     <div className="bg-green-100 p-2 rounded-full">
//                       <Phone className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Phone</h3>
//                       <p className="text-gray-600">+1 (555) 123-4567</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-3">
//                     <div className="bg-purple-100 p-2 rounded-full">
//                       <MapPin className="w-5 h-5 text-purple-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Address</h3>
//                       <p className="text-gray-600">123 Travel Street, Adventure City, AC 12345</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-3">
//                     <div className="bg-orange-100 p-2 rounded-full">
//                       <Clock className="w-5 h-5 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Response Time</h3>
//                       <p className="text-gray-600">Within 24 hours</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* FAQ Quick Links */}
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">
//                   Quick Help
//                 </h3>
//                 <ul className="space-y-2 text-sm">
//                   <li className="text-blue-600 hover:text-blue-800 cursor-pointer">
//                     • How to plan my first trip?
//                   </li>
//                   <li className="text-blue-600 hover:text-blue-800 cursor-pointer">
//                     • Can I modify my itinerary?
//                   </li>
//                   <li className="text-blue-600 hover:text-blue-800 cursor-pointer">
//                     • Payment and refund policies
//                   </li>
//                   <li className="text-blue-600 hover:text-blue-800 cursor-pointer">
//                     • Group travel planning
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
//               <CardContent className="p-8">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                   Send us a Message
//                 </h2>
//                 <p className="text-gray-600 mb-8">
//                   Fill out the form below and we'll help you plan your perfect journey
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Name *
//                       </label>
//                       <Input
//                         type="text"
//                         name="name"
//                         placeholder="Enter your full name"
//                         value={form.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Your Email *
//                       </label>
//                       <Input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email address"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Message *
//                     </label>
//                     <Textarea
//                       name="message"
//                       placeholder="Tell us about your travel plans, questions, or how we can help you..."
//                       rows={6}
//                       value={form.message}
//                       onChange={handleChange}
//                       required
//                       className="w-full resize-none"
//                     />
//                   </div>

//                   <Button 
//                     type="submit" 
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Send Message
//                   </Button>
//                 </form>

//                 {/* Status Message */}
//                 {status && (
//                   <div className={`mt-4 p-4 rounded-lg text-center ${
//                     status.includes("✅") 
//                       ? "bg-green-100 text-green-700 border border-green-200" 
//                       : status.includes("❌") || status.includes("⚠️")
//                       ? "bg-red-100 text-red-700 border border-red-200"
//                       : "bg-blue-100 text-blue-700 border border-blue-200"
//                   }`}>
//                     {status}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Additional Sections */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Clock className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
//             <p className="text-gray-600">Round-the-clock assistance for your travel needs</p>
//           </Card>

//           <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
//               <MapPin className="w-6 h-6 text-green-600" />
//             </div>
//             <h3 className="font-bold text-lg mb-2">Global Coverage</h3>
//             <p className="text-gray-600">Travel planning for destinations worldwide</p>
//           </Card>

//           <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Send className="w-6 h-6 text-purple-600" />
//             </div>
//             <h3 className="font-bold text-lg mb-2">Quick Response</h3>
//             <p className="text-gray-600">Get answers to your queries within hours</p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, Phone, MapPin, Clock, Send, HelpCircle,
  Globe, Zap, Heart, Star, Users, Calendar
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again.");
      }
    } catch (err) {
      setStatus("⚠️ Server error.");
    }
  };

  const faqItems = [
    {
      question: "How long does trip planning take?",
      answer: "We typically deliver custom itineraries within 24-48 hours. Complex multi-destination trips may take up to 72 hours."
    },
    {
      question: "Can I modify my itinerary after receiving it?",
      answer: "Yes! We offer 2 free revisions within 7 days of receiving your itinerary to ensure it's perfect for you."
    },
    {
      question: "Do you handle hotel and flight bookings?",
      answer: "We provide personalized recommendations and can integrate with booking platforms, but actual bookings are made through our trusted partners."
    },
    {
      question: "What makes your AI trip planner special?",
      answer: "Our AI combines local expertise with machine learning to create truly personalized itineraries based on your preferences, budget, and travel style."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to plan your dream vacation? We're here to help you create unforgettable memories. 
            Reach out and let's start your journey!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Email Us</h3>
                      <p className="text-gray-600 group-hover:text-gray-700">support@aitripplanner.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Call Us</h3>
                      <p className="text-gray-600 group-hover:text-gray-700">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Visit Us</h3>
                      <p className="text-gray-600 group-hover:text-gray-700">123 Travel Street, Adventure City</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group cursor-pointer">
                    <div className="bg-orange-100 p-3 rounded-xl group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                      <Clock className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Response Time</h3>
                      <p className="text-gray-600 group-hover:text-gray-700">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Help Guide
                </h3>
                <ul className="space-y-3">
                  {[
                    "How to plan my first trip?",
                    "Can I modify my itinerary?",
                    "Payment and refund policies",
                    "Group travel planning",
                    "Budget travel options"
                  ].map((item, index) => (
                    <li 
                      key={index}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer transition-all duration-200 hover:translate-x-2 hover:font-medium flex items-center"
                    >
                      <Star className="w-3 h-3 mr-2 text-yellow-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Tell us about your dream destination and we'll create magic together ✨
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full transition-all duration-300 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-3 px-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Your Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full transition-all duration-300 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-3 px-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Your Message *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your travel dreams... Where do you want to go? What experiences are you looking for? Any special requirements?"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full resize-none transition-all duration-300 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-3 px-4"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Send Your Message
                  </Button>
                </form>

                {/* Status Message */}
                {status && (
                  <div className={`mt-6 p-4 rounded-xl text-center border-2 transition-all duration-300 ${
                    status.includes("✅") 
                      ? "bg-green-50 text-green-700 border-green-200 shadow-lg" 
                      : status.includes("❌") || status.includes("⚠️")
                      ? "bg-red-50 text-red-700 border-red-200 shadow-lg"
                      : "bg-blue-50 text-blue-700 border-blue-200 shadow-lg"
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      {status.includes("✅") && <span className="text-2xl">🎉</span>}
                      <span className="font-medium">{status}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="bg-blue-100 group-hover:bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
              <Clock className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">24/7 Support</h3>
            <p className="text-gray-600 leading-relaxed">Round-the-clock assistance for all your travel needs and emergencies</p>
          </Card>

          <Card className="text-center p-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="bg-green-100 group-hover:bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
              <Globe className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Global Coverage</h3>
            <p className="text-gray-600 leading-relaxed">Expert travel planning for destinations across all continents</p>
          </Card>

          <Card className="text-center p-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="bg-purple-100 group-hover:bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
              <Zap className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">Get personalized itineraries and responses in record time</p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-0">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our AI trip planning service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqItems.map((faq, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-xl ${
                  activeFaq === index 
                    ? 'border-blue-300 bg-blue-50 shadow-lg' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-lg pr-4 transition-colors ${
                      activeFaq === index ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                    <span className={`text-2xl transition-transform duration-300 ${
                      activeFaq === index ? 'rotate-180 text-blue-600' : 'text-gray-400'
                    }`}>
                      {activeFaq === index ? '−' : '+'}
                    </span>
                  </div>
                  {activeFaq === index && (
                    <p className="text-gray-700 mt-4 leading-relaxed bg-white p-4 rounded-xl border border-blue-100">
                      {faq.answer}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-2xl">
            <Calendar className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-blue-100 text-xl mb-6 max-w-2xl mx-auto">
              Let's create your perfect itinerary together. Your dream vacation is just a message away!
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Plan Your Trip Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}