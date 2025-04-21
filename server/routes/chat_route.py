# server/routes/chat_route.py
from flask import Blueprint, request, jsonify
from datetime import datetime
from extensions import socketio  # Import socketio from extensions.py
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import user_model, message_model

chat_bp = Blueprint('message', __name__)

@chat_bp.route("/chat-users", methods=["GET","OPTIONS"])
@jwt_required()
def get_user():
    if request.method == "OPTIONS":   
        return '', 200
    
    current_user_id = get_jwt_identity()
    print(f"Current User ID: {current_user_id}")  # Add a log to check the decoded token value
    
    users = user_model.chat_users(current_user_id)
    for user in users:
        user["_id"] = str(user["_id"])

    return jsonify(users), 200

@chat_bp.route('/messages/send', methods=['POST'])
def send_message():
    data = request.get_json()

    sender_id = data.get("senderId")
    receiver_id = data.get("receiverId")
    message_text = data.get("message")
    timestamp = data.get("timestamp") or datetime.utcnow().isoformat()

    if not sender_id or not receiver_id or not message_text:
        return jsonify({"error": "Missing required fields"}), 400

    message = {
        "senderId": sender_id,
        "receiverId": receiver_id,
        "message": message_text,
        "timestamp": timestamp
    }

    # Save message to database
    inserted_id = message_model.insert_message(message)
    
    message["_id"] = str(inserted_id)
    socketio.emit("new_message", message, room=str(sender_id))
    socketio.emit("new_message", message, room=str(receiver_id))  

    return jsonify({"msg": "Message sent successfully", "data": message}), 201

@chat_bp.route('/messages/<sender_id>/<receiver_id>', methods=['GET'])
def get_messages(sender_id, receiver_id):
    try:
        messages = message_model.get_messages_between_users(sender_id, receiver_id)
        # Convert ObjectId and datetime to string
        for msg in messages:
            msg["_id"] = str(msg["_id"])
            msg["timestamp"] = str(msg["timestamp"])
        return jsonify(messages), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
