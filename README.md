# 🌍 AI Trip Planner

<p align="center">
  <img src="https://img.shields.io/badge/React-Vite-blue?logo=react" />
  <img src="https://img.shields.io/badge/Flask-Python-black?logo=flask" />
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/AI-Powered-purple" />
  <img src="https://img.shields.io/badge/Status-Completed-success" />
</p>

<h1 align="center">🌍 AI Trip Planner</h1>

<p align="center">
An AI-powered smart travel planning web application that generates personalized travel itineraries based on destination, duration, weather, interests, and budget preferences.
</p>

<p align="center">
Helping travelers plan smarter, faster, and more efficiently ✈️
</p>

---

# 📌 Table of Contents

- [Overview](#-overview)
- [Project Links](#-project-links)
- [Features](#-features)
- [Project Workflow](#-project-workflow)
- [Tech Stack](#-tech-stack)
- [APIs Used](#-apis-used)
- [Project Structure](#-project-structure)
- [Installation & Setup Guide](#️-installation--setup-guide)
- [Screenshots](#-project-screenshots)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 📌 Overview

**AI Trip Planner** is an intelligent travel planning platform designed to simplify trip planning using **Artificial Intelligence**.

Instead of manually searching for destinations, weather, hotels, and attractions, users can generate a complete personalized travel itinerary within seconds.

The platform helps users:

✅ Generate AI-powered personalized itineraries  
✅ Get live weather updates  
✅ Explore nearby attractions  
✅ Find hotel recommendations  
✅ Estimate travel budgets  
✅ Access flight booking integration  
✅ Chat with an AI travel assistant  
✅ Save itineraries for future use

The system creates a smart and customized travel experience according to user preferences.

---

# 🔗 Project Links

## 📂 GitHub Repository

**Repository Link:**  
https://github.com/nehapandeympr19-prog/ai-trip-planner

---

## 🎥 Demo Video

**Watch Project Demo:**  
(Add Demo Video Link Here)

Example:

```text
https://drive.google.com/your-demo-link
```

---

## 🌐 Live Project (Optional)

(Add Deployment Link Here)

Example:

```text
https://ai-trip-planner.vercel.app
```

---

# ✨ Features

## 🔐 User Authentication

- Secure Signup & Login
- JWT-based Authentication
- Protected Routes
- User Session Management

---

## 🗺️ Smart Trip Planning

Users can:

✅ Enter travel destination  
✅ Select travel dates  
✅ Automatically calculate trip duration  
✅ Choose travel interests/preferences

### Available Interests

- 🍜 Food
- 🏛️ Culture
- 🛍️ Shopping
- 🌿 Leisure
- 🏔️ Adventure
- 🏖️ Relaxation

---

## 🤖 AI Itinerary Generator

Generate a personalized **Dream Itinerary** using AI.

The AI creates:

✅ Day-wise itinerary  
✅ Morning activities  
✅ Afternoon activities  
✅ Evening activities  
✅ Travel recommendations  
✅ Suggested experiences

---

## 🌤️ Live Weather Updates

- Real-time weather information
- Temperature updates
- Weather condition insights
- Better travel planning assistance

---

## 🏨 Hotel Recommendations

Get destination-based hotel suggestions according to travel preferences.

---

## 📍 Nearby Attractions

Explore:

- Tourist attractions
- Historical landmarks
- Cultural places
- Popular sightseeing locations

---

## ✈️ Flight Booking Integration

Integrated flight booking support for easier travel planning and bookings.

---

## 💰 Budget Estimator

Estimate travel cost based on:

- Destination
- Travel duration
- Travel preferences
- Budget category

---

## 💬 AI Travel Chatbot

Users can ask travel-related questions like:

- Best places to visit
- Seasonal travel recommendations
- Food & culture suggestions
- Travel tips
- Weather guidance

---

## ❤️ Saved Itineraries

Users can:

✅ Save generated itineraries  
✅ View previous travel plans  
✅ Revisit saved trips anytime

---


# 🚀 Project Workflow

### Step 1: Plan Your Trip

User clicks on **"Plan My Trip"**

### Step 2: Enter Destination

User enters the desired destination.

### Step 3: Weather Fetching

The application automatically fetches live destination weather.

### Step 4: Select Travel Dates

User selects:

- Start Date
- End Date

The system automatically calculates trip duration.

### Step 5: Choose Interests

Users can choose one or multiple interests.

Examples:

- Food
- Adventure
- Shopping
- Culture
- Leisure

### Step 6: Generate Dream Itinerary

User clicks on **"Generate Dream Itinerary"**

The AI takes approximately **5–7 seconds** to generate a customized travel plan.

### Step 7: View Generated Itinerary

Generated itinerary includes:

📅 Day-wise schedule  
🎯 Daily activities  
🏨 Hotel recommendations  
📍 Nearby attractions  
🌤️ Weather details  
✈️ Flight booking support  
💡 Travel suggestions

### Step 8: Save Itinerary

Users can save their itinerary for future reference.

---

# 🛠️ Tech Stack

## Frontend

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Context API
- Framer Motion

## Backend

- Python Flask
- REST APIs
- SQLite Database
- JWT Authentication

---

# 🔌 APIs Used

## 🤖 AI API

- OpenRouter API

## 🌍 Travel & Location APIs

- GeoDB API
- OpenCage API
- OpenTripMap API

## 🖼️ Image API

- Unsplash API

## 🌤️ Weather API

- OpenWeather API

## ✈️ Travel Services

- Amadeus API
- Integrated Flight Booking Website

---

# 📂 Project Structure

```bash
AI_TRIP_PLANNER/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── instance/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   │
│   ├── .env.local
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│
└── README.md
```

---

# ⚙️ Installation & Setup Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/nehapandeympr19-prog/ai-trip-planner.git
```

Move into project folder:

```bash
cd ai-trip-planner
```

---

# 🔧 Backend Setup

Go to backend folder:

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
.\venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Create `.env` File

Add the following environment variables:

```env
AM_KEY=your_key
AM_SECRET_KEY=your_secret_key
GEODB_KEY=your_key
UNSPLASH_API_KEY=your_key
OPENCAGE_API_KEY=your_key
OPENTRIPMAP_API_KEY=your_key
OPENROUTER_API_KEY=your_key
JWT_SECRET_KEY=your_secret_key
```

---

## Run Backend Server

```bash
python app.py
```

Backend runs on:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create `.env.local`

Add:

```env
VITE_OPENWEATHER=your_key
VITE_GEODB=your_key
VITE_OPENTRIPMAP=your_key
VITE_UNSPLASH_ACCESS_KEY=your_key
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📸 Project Screenshots

## 🏠 Home Page

Add Screenshot Here

Example:

```md
![Home Page](screenshots/home.png)
```

---

## 🗺️ Plan Trip Page

Add Screenshot Here

---

## 📅 Generated Itinerary

Add Screenshot Here

---

## 💰 Budget Estimator

Add Screenshot Here

---

## 💬 AI Travel Chatbot

Add Screenshot Here

---

# 🔮 Future Improvements

📄 Download itinerary as PDF  
🏨 Direct hotel booking  
🌐 Multi-language support  
🎙️ AI voice assistant  
🌙 Dark/Light Mode  
📍 Real-time navigation integration

---

# 👩‍💻 Author

## Neha Pandey

**Final Year BE Artificial Intelligence & Data Science (AIDS) | 2026**

### Passionate About

- Full Stack Development
- Artificial Intelligence
- Web Development
- Problem Solving

### 🔗 GitHub

https://github.com/nehapandeympr19-prog

---

# ⭐ Support

If you liked this project, consider giving it a **star ⭐ on GitHub**.
