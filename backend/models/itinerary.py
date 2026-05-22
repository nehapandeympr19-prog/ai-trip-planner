from . import db
import json
from datetime import datetime

class Itinerary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(120), db.ForeignKey("user.email"), nullable=False)  # ✅ Correct
    destination = db.Column(db.String(120), nullable=False)
    days = db.Column(db.Integer, nullable=False)
    budget = db.Column(db.String(50), nullable=False)
    interests = db.Column(db.String(250), nullable=False)
    plan_json = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    travel_days = db.Column(db.Integer)
    experience_days = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def plan(self):
        try:
            return json.loads(self.plan_json)
        except Exception:
            return []