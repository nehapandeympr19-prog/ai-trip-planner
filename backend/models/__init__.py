from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .itinerary import Itinerary
from .message import Message
from .trip import Trip