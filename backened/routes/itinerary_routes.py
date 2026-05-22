


import os
import requests
import json
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Itinerary
from geopy.geocoders import Nominatim

itinerary_bp = Blueprint("itinerary", __name__)
geolocator = Nominatim(user_agent="ai-trip-planner")
UNSPLASH_KEY = os.getenv("UNSPLASH_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# -------------------- OpenRouter Helper -----------------------
# def generate_with_mistral(prompt):
#     """Generate response using Mistral via OpenRouter"""
#     url = "https://openrouter.ai/api/v1/chat/completions"
#     # 
    
#     headers = {
#     "Authorization": f"Bearer {OPENROUTER_API_KEY}",
#     "Content-Type": "application/json",
#     "HTTP-Referer": "http://localhost:5173",
#     "X-Title": "AI Trip Planner"
# }
    

#     payload = {
#         "model": "meta-llama/llama-3.3-8b-instruct:free",
#         "messages": [
#             {"role": "user", "content": prompt}
#         ],
#         "temperature": 0.7,
#         "max_tokens": 2000
#     }
    
#     try:
#         response = requests.post(url, headers=headers, json=payload, timeout=30)
#         response.raise_for_status()
#         data = response.json()
#         return data["choices"][0]["message"]["content"].strip()
#     except Exception as e:
#         print("❌ OpenRouter API error:", str(e))
#         raise Exception(f"OpenRouter API error: {str(e)}")




import urllib3
import time

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

FREE_MODELS = [
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-4-26b-a4b-it:free",
    "qwen/qwen3-next-80b-a3b-instruct:free",
    "nousresearch/hermes-3-405b-instruct:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "openrouter/auto",
]

def generate_itinerary(prompt):
    """Generate itinerary using OpenRouter with fallback models"""

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AI Trip Planner"
    }

    last_error = None

    for model in FREE_MODELS:
        print(f"🤖 Trying model: {model}")

        payload = {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a travel planning assistant that ALWAYS returns clean valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }

        try:
            response = requests.post(
                url,
                headers=headers,
                json=payload,
                timeout=30,
                verify=False
            )

            print(f"Status Code ({model}):", response.status_code)

            # Rate limited → skip to next model
            if response.status_code == 429:
                print(f"⚠️ Rate limited on {model}, trying next...")
                last_error = f"429 on {model}"
                time.sleep(1)
                continue

            response.raise_for_status()
            data = response.json()

            content = data["choices"][0]["message"]["content"].strip()
            print(f"✅ Success with model: {model}")
            return content

        except Exception as e:
            print(f"❌ Failed with {model}: {str(e)}")
            last_error = str(e)
            continue

    raise Exception(f"All models failed. Last error: {last_error}")
# -------------------- Helpers -----------------------
def clean_city_name(city):
    return city.split(",")[0].replace("district", "").strip()

def fetch_unsplash_image(query):
    """Fetch a representative image URL from Unsplash API"""
    if not UNSPLASH_KEY:
        return None
    url = f"https://api.unsplash.com/photos/random?query={query}&client_id={UNSPLASH_KEY}&orientation=landscape"
    try:
        res = requests.get(url, timeout=5)
        data = res.json()
        return data.get("urls", {}).get("regular")
    except Exception as e:
        print("❌ Unsplash fetch error:", e)
        return None

def get_hotel_suggestions(destination):
    clean_city = clean_city_name(destination)
    return [
        {"name": f"{clean_city} Grand Hotel", "hotelId": "mock1", "address": "Central Street", "city": clean_city, "rating": "4.5", "price": "$120"},
        {"name": f"{clean_city} Budget Inn", "hotelId": "mock2", "address": "Near Railway Station", "city": clean_city, "rating": "3.8", "price": "$60"},
    ]

def calculate_travel_days(total_days):
    """Calculate realistic travel days based on trip duration"""
    if total_days <= 3:
        return 2  # First and last days for travel
    elif total_days <= 7:
        return 1  # Only first day for travel
    else:
        return 1  # First day for travel, longer trips assume settled in

# -------------------- Routes -----------------------
@itinerary_bp.route('/plan-trip', methods=['POST'])
@jwt_required()
def generate_plan():
    current_user = get_jwt_identity()
    data = request.get_json()
    destination = data.get("destination")
    days = data.get("days")
    start_date = data.get("startDate")
    end_date = data.get("endDate")
    budget = data.get("budget")
    interests = data.get("interests")

    if not destination or not budget or not interests:
        return jsonify({"error": "Missing required fields: destination, budget, interests"}), 400

    # Calculate days and travel days based on dates
    travel_days = 0
    experience_days = 0
    
    if start_date and end_date:
        try:
            start = datetime.strptime(start_date, '%Y-%m-%d')
            end = datetime.strptime(end_date, '%Y-%m-%d')
            total_days = (end - start).days + 1
            
            if total_days <= 0:
                return jsonify({"error": "End date must be after start date"}), 400
                
            travel_days = calculate_travel_days(total_days)
            experience_days = total_days - travel_days
            days = total_days  # Set days for backward compatibility
            
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    elif days:
        try:
            days = int(days)
            travel_days = calculate_travel_days(days)
            experience_days = days - travel_days
            # Set default dates for display
            start_date = datetime.now().strftime('%Y-%m-%d')
            end_date = (datetime.now() + timedelta(days=days-1)).strftime('%Y-%m-%d')
        except ValueError:
            return jsonify({"error": "Days must be an integer"}), 400
    else:
        return jsonify({"error": "Either provide dates or number of days"}), 400

    if experience_days <= 0:
        return jsonify({"error": "Trip duration is too short for meaningful experience"}), 400

    # 🌟 Enhanced Prompt for Mistral with Travel Days
    prompt = f"""
You are an expert travel planner. Generate a {days}-day travel itinerary for {destination}.

Travel Dates: {start_date} to {end_date}
Total Days: {days} days ({travel_days} travel day(s), {experience_days} experience day(s))
Traveler interests: {interests}
Budget level: {budget}

Important: The first {travel_days} day(s) should focus on travel and settling in. 
For travel days, include lighter activities that account for travel fatigue.

Return ONLY a valid JSON object with this exact structure:
{{
  "itinerary": [
    {{
      "day": 1,
      "date": "{start_date}",
      "type": "travel", // or "experience" for non-travel days
      "theme": "day theme",
      "morning": {{"activity": "title", "details": "description", "duration": "2 hours", "notes": "tips"}},
      "afternoon": {{"activity": "title", "details": "description", "duration": "3 hours", "notes": "tips"}},
      "evening": {{"activity": "title", "details": "description", "duration": "2 hours", "notes": "tips"}}
    }}
  ]
}}

Rules for travel days (first {travel_days} day(s)):
- Include travel-related activities: airport transfers, hotel check-in, light local exploration
- Keep activities flexible and less time-consuming
- Account for potential travel fatigue
- Suggest nearby, easily accessible locations

Rules for experience days:
- Create logical daily themes based on interests: {interests}
- Balance sightseeing with relaxation time
- Make activities appropriate for budget: {budget}
- Ensure no activity repetition across days
- Include realistic durations and travel time between activities

Return ONLY the JSON, no explanations, no markdown, no extra text
"""

    try:
        # Use Mistral via OpenRouter
        raw_text = generate_itinerary(prompt)
        
        # Log raw AI response
        print("🌍 AI Response:", raw_text)

        if not raw_text:
            return jsonify({"error": "AI returned an empty response"}), 500

        # ✅ Parse the raw text safely
        try:
            itinerary_data = json.loads(raw_text)
        except json.JSONDecodeError:
            import re
            # Try to extract JSON from text if Mistral adds extra content
            match = re.search(r"\{.*\}", raw_text, re.DOTALL)
            if match:
                itinerary_data = json.loads(match.group())
            else:
                print("❌ Failed to decode Mistral response:", raw_text)
                return jsonify({"error": "Failed to decode AI response"}), 500

        if "itinerary" not in itinerary_data:
            return jsonify({"error": "Invalid itinerary structure in AI response"}), 500

        # Enhance itinerary with dates and types
        enhanced_itinerary = []
        current_date = datetime.strptime(start_date, '%Y-%m-%d')
        
        for i, day_plan in enumerate(itinerary_data.get("itinerary", [])):
            day_num = i + 1
            day_date = current_date.strftime('%Y-%m-%d')
            day_type = "travel" if day_num <= travel_days else "experience"
            
            enhanced_day = {
                **day_plan,
                "day": day_num,
                "date": day_date,
                "type": day_type
            }
            enhanced_itinerary.append(enhanced_day)
            current_date += timedelta(days=1)

    except Exception as e:
        print("❌ AI itinerary error:", str(e))
        return jsonify({"error": f"AI service error: {str(e)}"}), 500

    # Fetch hotel suggestions and image
    hotels = get_hotel_suggestions(destination)
    image = fetch_unsplash_image(destination)

    return jsonify({
        "user": current_user,
        "destination": destination,
        "days": days,
        "travelDays": travel_days,
        "experienceDays": experience_days,
        "startDate": start_date,
        "endDate": end_date,
        "budget": budget,
        "interests": interests,
        "itinerary": enhanced_itinerary,
        "hotels": hotels,
        "image": image
    })

#------------------------------------------------------------------------------------
# 
# 

# -------------------- Weather Route -----------------------
@itinerary_bp.route('/weather/<path:city>', methods=['GET'])
def get_weather(city):
    try:
        city = city.split(",")[0].strip()

        url = f"http://wttr.in/{city}"

        response = requests.get(
            url,
            params={
                "format": "%C %t"
            },
            headers={
                "User-Agent": "curl/7.68.0"
            },
            timeout=10
        )

        if response.status_code != 200:
            return jsonify({
                "error": "Weather unavailable"
            }), 500

        weather_text = response.text.strip()

        return jsonify({
            "weather": weather_text
        })

    except Exception as e:
        print("❌ Weather API error:", str(e))
        return jsonify({
            "error": str(e)
        }), 500

@itinerary_bp.route('/save-itinerary', methods=['POST'])
@jwt_required()
def save_itinerary():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    destination = data.get("destination")
    days = data.get("days")
    start_date = data.get("startDate")
    end_date = data.get("endDate")
    budget = data.get("budget")
    interests = data.get("interests")
    plan = data.get("plan")
    travel_days = data.get("travelDays")
    experience_days = data.get("experienceDays")

    if not destination or not days or not budget or not interests or not plan:
        return jsonify({"error": "Missing required fields"}), 400

    new_itinerary = Itinerary(
        user_email=current_user,
        destination=destination,
        days=days,
        start_date=start_date,
        end_date=end_date,
        budget=budget,
        interests=interests,
        travel_days=travel_days,
        experience_days=experience_days,
        plan_json=json.dumps(plan),
    )
    db.session.add(new_itinerary)
    db.session.commit()
    return jsonify({"message": "Itinerary saved successfully!"}), 201


@itinerary_bp.route('/itineraries', methods=['GET'])
@jwt_required()
def get_itineraries():
    current_user = get_jwt_identity()
    itineraries = Itinerary.query.filter_by(user_email=current_user).all()
    result = []
    for it in itineraries:
        result.append({
            "id": it.id,
            "destination": it.destination,
            "days": it.days,
            "start_date": it.start_date,
            "end_date": it.end_date,
            "budget": it.budget,
            "interests": it.interests,
            "travel_days": it.travel_days,
            "experience_days": it.experience_days,
            "plan": json.loads(it.plan_json),
        })
    return jsonify(result)


@itinerary_bp.route('/calculate-duration', methods=['POST'])
def calculate_duration():
    """Helper endpoint to calculate trip duration and travel days"""
    data = request.get_json()
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    
    if not start_date or not end_date:
        return jsonify({"error": "Start and end dates required"}), 400
    
    try:
        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        total_days = (end - start).days + 1
        
        if total_days <= 0:
            return jsonify({"error": "End date must be after start date"}), 400
            
        travel_days = calculate_travel_days(total_days)
        experience_days = total_days - travel_days
        
        return jsonify({
            "totalDays": total_days,
            "travelDays": travel_days,
            "experienceDays": experience_days,
            "isValid": experience_days > 0
        })
        
    except ValueError as e:
        return jsonify({"error": "Invalid date format"}), 400
    


# -------------------- Chatbot Route -----------------------
@itinerary_bp.route('/api/chat', methods=['POST'])
@jwt_required(optional=True)
def chat_assistant():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({
                "error": "Message is required"
            }), 400

        prompt = f"""
You are a smart and friendly AI Travel Assistant.

User Question:
{user_message}

Instructions:
- Answer like a real travel assistant chatting with a user
- Keep answers concise and easy to read
- Use emojis naturally
- Use short headings and bullet points
- Give practical travel advice
- Avoid very long paragraphs
- Sound conversational and friendly
- End with a recommendation if helpful
- Do NOT return JSON
- Do NOT sound like a textbook or article

Example style:

🌞 Agra in summer?

Agra gets very hot in summer (April–June), often reaching 40–45°C.

✅ Good things:
• Less crowd at Taj Mahal
• Hotels may be cheaper

❌ Challenges:
• Very hot weather
• Sightseeing becomes tiring

💡 My suggestion:
If possible, visit between October–March. But if going in summer, explore early morning and stay hydrated!

Now answer the user's question naturally.
"""

        ai_reply = generate_itinerary(prompt)

        return jsonify({
            "reply": ai_reply
        })

    except Exception as e:
        print("❌ Chatbot error:", str(e))
        return jsonify({
            "reply": "Sorry, I am having trouble responding right now 🌍"
        }), 500