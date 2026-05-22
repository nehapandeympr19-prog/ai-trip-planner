


import os
from datetime import timedelta
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Import db from models package
from models import db

# Import blueprints
from routes.auth_routes import auth_bp
from routes.itinerary_routes import itinerary_bp
from routes.contact_routes import contact_bp
from routes.places_routes import places_bp
from routes.recommend_routes import recommend_bp
from routes.cost_routes import cost_routes

load_dotenv()

app = Flask(__name__)

# Config
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "supersecretkey")
# Change this line in app.py:
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../instance/tripplanner.db"
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "jwtsecretkey")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

# CORS
CORS(app, supports_credentials=True)
# Initialize extensions
db.init_app(app)  # Important: init_app instead of passing app to SQLAlchemy()
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(itinerary_bp)
app.register_blueprint(contact_bp)
app.register_blueprint(places_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(cost_routes)

@app.route("/")
def home():
    return jsonify({"message": "AI Trip Planner Backend is running!"})

# Create database tables automatically for Render
with app.app_context():
    db.create_all()
    print("Database tables created!")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))