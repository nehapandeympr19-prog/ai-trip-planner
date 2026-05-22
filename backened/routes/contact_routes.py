# # backened/routes/contact_routes.py

# from flask import Blueprint, request, jsonify

# contact_bp = Blueprint("contact", __name__)

# @contact_bp.route("/api/contact", methods=["POST"])
# def contact():
#     data = request.json
#     name = data.get("name")
#     email = data.get("email")
#     message = data.get("message")

#     if not name or not email or not message:
#         return jsonify({"error": "All fields required"}), 400

#     return jsonify({"success": True, "message": "Message saved successfully"})





from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Message

contact_bp = Blueprint("contact", __name__)

# Submit contact form
@contact_bp.route("/api/contact", methods=["POST"])
def contact():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "All fields required"}), 400

    try:
        # Save message to database
        new_message = Message(
            name=name,
            email=email,
            message=message
        )
        db.session.add(new_message)
        db.session.commit()
        
        return jsonify({"success": True, "message": "Message saved successfully"})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to save message"}), 500

# Admin route - Get all contact messages
@contact_bp.route("/api/admin/contact-messages", methods=["GET"])
@jwt_required()
def get_contact_messages():
    try:
        current_user = get_jwt_identity()
        # You can add admin role check here if needed
        
        messages = Message.query.order_by(Message.id.desc()).all()
        
        messages_data = []
        for msg in messages:
            messages_data.append({
                "id": msg.id,
                "name": msg.name,
                "email": msg.email,
                "message": msg.message,
                "created_at": msg.id  # Using ID as timestamp proxy for now
            })
        
        return jsonify({"messages": messages_data}), 200
        
    except Exception as e:
        return jsonify({"error": "Failed to fetch messages"}), 500

# Admin route - Delete message
@contact_bp.route("/api/admin/contact-messages/<int:message_id>", methods=["DELETE"])
@jwt_required()
def delete_message(message_id):
    try:
        current_user = get_jwt_identity()
        message = Message.query.get(message_id)
        
        if not message:
            return jsonify({"error": "Message not found"}), 404
            
        db.session.delete(message)
        db.session.commit()
        
        return jsonify({"success": True, "message": "Message deleted successfully"})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete message"}), 500