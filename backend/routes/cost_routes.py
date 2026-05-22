

# from flask import Blueprint, request, jsonify
# import sqlite3

# cost_routes = Blueprint("cost_routes", __name__)

# DB_PATH = "instance/tripplanner.db"


# def get_db_connection():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row
#     return conn


# @cost_routes.route("/api/get-cost-estimate", methods=["GET"])
# def get_cost_estimate():
#     try:
#         source = request.args.get("source")
#         destination = request.args.get("destination")
#         days = int(request.args.get("days", 1))
#         hotel_type = request.args.get("hotel_type", "budget")

#         print(f"Source: {source}, Destination: {destination}, Days: {days}, Hotel: {hotel_type}")

#         conn = get_db_connection()
#         cursor = conn.cursor()

#         # Transport cost
#         cursor.execute("""SELECT avg_cost FROM transport_costs 
#                           WHERE source = ? AND destination = ? AND mode = 'flight'""",
#                        (source, destination))
#         transport_row = cursor.fetchone()
#         transport_cost = transport_row["avg_cost"] if transport_row else 0

#         # Hotel cost
#         cursor.execute("""SELECT avg_cost FROM hotel_costs 
#                           WHERE city = ? AND hotel_type = ?""",
#                        (destination, hotel_type))
#         hotel_row = cursor.fetchone()
#         hotel_cost_per_day = hotel_row["avg_cost"] if hotel_row else 0
#         hotel_cost = hotel_cost_per_day * days

#         # Food cost
#         cursor.execute("SELECT avg_daily_cost FROM food_costs WHERE city = ?", (destination,))
#         food_row = cursor.fetchone()
#         food_cost_per_day = food_row["avg_daily_cost"] if food_row else 0
#         food_cost = food_cost_per_day * days

#         # Activities
#         cursor.execute("SELECT SUM(avg_cost) as total_activities FROM activity_costs WHERE city = ?", (destination,))
#         activities_row = cursor.fetchone()
#         activities_cost = activities_row["total_activities"] if activities_row and activities_row["total_activities"] else 0

#         conn.close()

#         total_cost = transport_cost + hotel_cost + food_cost + activities_cost

#         return jsonify({
#             "source": source,
#             "destination": destination,
#             "days": days,
#             "hotel_type": hotel_type,
#             "breakdown": {
#                 "transport": transport_cost,
#                 "hotel": hotel_cost,
#                 "food": food_cost,
#                 "activities": activities_cost
#             },
#             "total_estimated_cost": total_cost
#         })

#     except Exception as e:
#         print("Error in get_cost_estimate:", e)
#         return jsonify({"error": "Server error", "details": str(e)}), 500



# routes/cost_routes.py
# routes/cost_routes.py

from flask import Blueprint, request, jsonify
from budget_estimator import estimate_budget

cost_routes = Blueprint("cost_routes", __name__)  # ← exact name

@cost_routes.route("/api/get-cost-estimate", methods=["GET"])
def get_cost_estimate():
    try:
        source      = request.args.get("source", "")
        destination = request.args.get("destination", "")
        days        = request.args.get("days", 1)
        hotel_type  = request.args.get("hotel_type", "budget")

        if not source or not destination:
            return jsonify({"error": "source and destination are required"}), 400

        result = estimate_budget(source, destination, int(days), hotel_type)
        return jsonify(result)

    except Exception as e:
        print("Error in get_cost_estimate:", e)
        return jsonify({"error": str(e)}), 500