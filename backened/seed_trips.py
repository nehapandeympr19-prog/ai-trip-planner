import json
from app import app, db
from models import Trip

with app.app_context():
    db.create_all()

    trips = [
        {
            "title": "4-Day Manali Adventure",
            "destination": "Manali",
            "days": 4,
            "theme": "Adventure",
            "budget": "Medium",
            "interests": "Hiking",
            "plan": [
                {"day": 1, "morning": {"description": "Rohtang Pass"}, "afternoon": {"description": "Solang Valley"}, "evening": {"description": "Mall Road"}},
                {"day": 2, "morning": {"description": "Hadimba Temple"}, "afternoon": {"description": "Old Manali"}, "evening": {"description": "Café hopping"}},
                {"day": 3, "morning": {"description": "Jogini Waterfall"}, "afternoon": {"description": "Paragliding"}, "evening": {"description": "Local market"}},
                {"day": 4, "morning": {"description": "Vashisht Baths"}, "afternoon": {"description": "Departure"}, "evening": {"description": "Travel back"}}
            ]
        },
        {
            "title": "5-Day Goa Beach Trip",
            "destination": "Goa",
            "days": 5,
            "theme": "Beach",
            "budget": "High",
            "interests": "Relaxation",
            "plan": [
                {"day": 1, "morning": {"description": "Baga Beach"}, "afternoon": {"description": "Calangute"}, "evening": {"description": "Sunset cruise"}},
                {"day": 2, "morning": {"description": "Dudhsagar Waterfalls"}, "afternoon": {"description": "Spice Plantation"}, "evening": {"description": "Night market"}},
                {"day": 3, "morning": {"description": "Colva Beach"}, "afternoon": {"description": "Fort Aguada"}, "evening": {"description": "Beach party"}},
                {"day": 4, "morning": {"description": "Palolem Beach"}, "afternoon": {"description": "Kayaking"}, "evening": {"description": "Local cuisine"}},
                {"day": 5, "morning": {"description": "Relax at hotel"}, "afternoon": {"description": "Departure"}, "evening": {"description": "Travel back"}}
            ]
        }
    ]

    for t in trips:
        trip = Trip(
            title=t["title"],
            destination=t["destination"],
            days=t["days"],
            theme=t["theme"],
            budget=t["budget"],
            interests=t["interests"],
            plan_json=json.dumps(t["plan"])
        )
        db.session.add(trip)

    db.session.commit()
    print("✅ Sample trips added to SQLite!")
