
# from flask import Blueprint, request, jsonify
# from models import Trip

# recommend_bp = Blueprint("recommend", __name__)

# @recommend_bp.route("/recommend-trips", methods=["POST"])
# def recommend_trips():
#     try:
#         data = request.json or {}
#         print(f"Received data: {data}")

#         destination = data.get("destination", "").strip().lower()
#         try:
#             days = int(data.get("days", 3))
#         except (ValueError, TypeError):
#             days = 3

#         min_days = max(1, days - 2)
#         max_days = days + 2

#         print(f"Filtering trips for destination containing '{destination}', days between {min_days} and {max_days}")

#         all_trips = Trip.query.all()
#         matching_trips = []

#         for trip in all_trips:
#             trip_dest = trip.destination.lower()
#             trip_days = trip.days

#             print(f"Checking trip: {trip.destination} (days: {trip_days})")

#             if destination in trip_dest and min_days <= trip_days <= max_days:
#                 matching_trips.append(trip)

#         print(f"Trips found after filtering: {len(matching_trips)}")

#         recommendations = []
#         for trip in matching_trips:
#             recommendations.append({
#                 "destination": trip.destination,
#                 "days": trip.days,
#                 "theme": getattr(trip, "theme", ""),
#                 "budget": getattr(trip, "budget", ""),
#                 "interests": getattr(trip, "interests", ""),
#                 # Add trip.plan() here if needed and serializable
#             })

#         return jsonify({"recommendations": recommendations})

#     except Exception as e:
#         print(f"Error in recommend-trips: {e}")
#         return jsonify({"error": str(e)}), 500




from flask import Blueprint, request, jsonify
from models import Trip, Itinerary

recommend_bp = Blueprint("recommend", __name__)

@recommend_bp.route("/recommend-trips", methods=["POST"])
def recommend_trips():
    try:
        data = request.json or {}
        print(f"Received data: {data}")

        destination = data.get("destination", "").strip().lower()
        theme = data.get("theme", "").strip().lower()
        budget = data.get("budget", "").strip().lower()
        
        try:
            days = int(data.get("days", 3))
        except (ValueError, TypeError):
            days = 3

        min_days = max(1, days - 2)
        max_days = days + 2

        # Define related themes mapping
        related_themes = {
            "adventure": ["nature", "outdoors", "wildlife"],
            "nature": ["adventure", "outdoors", "wildlife"],
            "culture": ["history", "art", "heritage", "temple"],
            "history": ["culture", "heritage"],
            "relaxation": ["wellness", "spa", "leisure"],
            "beach": ["relaxation", "water", "island"],
            # Add more as needed
        }

        # Build list of themes to match
        themes_to_match = [theme]
        if theme in related_themes:
            themes_to_match += related_themes[theme]

        print(f"Filtering trips for destination containing '{destination}', days between {min_days} and {max_days}, themes: {themes_to_match}")

        # --- Query Trip table ---
        all_trips = Trip.query.all()
        matching_trips = []
        for trip in all_trips:
            trip_dest = trip.destination.lower()
            trip_days = trip.days
            trip_theme = getattr(trip, "theme", "").lower()
            trip_budget = getattr(trip, "budget", "").lower()
            # Budget must match
            if trip_budget != budget:
                continue
            # Scoring: +2 for theme match, +1 for destination match, +1 for days match
            score = 0
            for t in themes_to_match:
                if t in trip_theme:
                    score += 2
                    break
            if destination in trip_dest:
                score += 1
            if min_days <= trip_days <= max_days:
                score += 1
            if score > 0:
                matching_trips.append({
                    "destination": trip.destination,
                    "days": trip.days,
                    "theme": getattr(trip, "theme", ""),
                    "budget": getattr(trip, "budget", ""),
                    "interests": getattr(trip, "interests", ""),
                    "plan": trip.plan(),
                    "source": "Trip",
                    "score": score
                })

        # --- Query Itinerary table ---
        all_itins = Itinerary.query.all()
        matching_itins = []
        for itin in all_itins:
            itin_dest = itin.destination.lower()
            itin_days = itin.days
            itin_budget = getattr(itin, "budget", "").lower()
            itin_interests = getattr(itin, "interests", "").lower()
            # Budget must match
            if itin_budget != budget:
                continue
            score = 0
            for t in themes_to_match:
                if t in itin_interests:
                    score += 2
                    break
            if destination in itin_dest:
                score += 1
            if min_days <= itin_days <= max_days:
                score += 1
            if score > 0:
                matching_itins.append({
                    "destination": itin.destination,
                    "days": itin_days,
                    "theme": theme,
                    "budget": getattr(itin, "budget", ""),
                    "interests": getattr(itin, "interests", ""),
                    "plan": itin.plan(),
                    "source": "Itinerary",
                    "score": score
                })

        # --- Combine and deduplicate ---
        combined = matching_trips + matching_itins
        # Deduplicate by destination, days, budget, theme
        seen = set()
        recommendations = []
        for rec in combined:
            key = (rec["destination"].lower(), rec["days"], rec["budget"].lower(), rec["theme"].lower())
            if key not in seen:
                recommendations.append(rec)
                seen.add(key)

        # Sort by score (descending) and limit to top 5
        recommendations = sorted(recommendations, key=lambda x: x["score"], reverse=True)[:5]

        print(f"Total recommendations found: {len(recommendations)}")
        return jsonify({"recommendations": recommendations})

    except Exception as e:
        print(f"Error in recommend-trips: {e}")
        return jsonify({"error": str(e)}), 500