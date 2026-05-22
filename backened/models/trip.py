from . import db
import json

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    destination = db.Column(db.String(120), nullable=False)
    days = db.Column(db.Integer, nullable=False)
    theme = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.String(50), nullable=False)
    interests = db.Column(db.String(250), nullable=True)
    plan_json = db.Column(db.Text, nullable=False)

    def plan(self):
        try:
            return json.loads(self.plan_json)
        except Exception:
            return []