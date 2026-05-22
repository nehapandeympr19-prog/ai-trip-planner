import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

places_bp = Blueprint("places", __name__)

# API Keys
OPENCAGE_KEY = os.getenv("OPENCAGE_API_KEY")
OPENTRIPMAP_KEY = os.getenv("OPENTRIPMAP_API_KEY")

# ==============================
# 🔹 Step 1: Get coordinates via OpenCage
# ==============================
def get_coords(city):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={city}&key={OPENCAGE_KEY}"
    try:
        res = requests.get(url).json()
        if res.get("results"):
            coords = res["results"][0]["geometry"]
            return coords["lat"], coords["lng"]
    except Exception as e:
        print("OpenCage error:", e)
    return None, None

# ==============================
# 🔹 Step 2: Get nearby attractions from OpenTripMap
# ==============================
@places_bp.route("/api/nearby", methods=["GET"])
def nearby_places():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City is required"}), 400

    lat, lon = get_coords(city)
    if not lat or not lon:
        return jsonify({"error": "Coordinates not found"}), 404

    url = f"https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon={lon}&lat={lat}&rate=2&limit=10&apikey={OPENTRIPMAP_KEY}"
    try:
        res = requests.get(url).json()
        if res.get("features"):
            places = [
                {
                    "id": p["properties"]["xid"],
                    "name": p["properties"].get("name", "Unnamed Place"),
                    "kind": p["properties"].get("kinds", "Attraction"),
                }
                for p in res["features"]
            ]
            return jsonify({"city": city, "lat": lat, "lon": lon, "places": places})
    except Exception as e:
        print("OpenTripMap error:", e)

    return jsonify({"city": city, "lat": lat, "lon": lon, "places": []})
