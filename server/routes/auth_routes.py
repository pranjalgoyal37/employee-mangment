from flask import Blueprint, request, jsonify
from models.user_model import users_collection
from utils.jwt_helper import generate_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/login_admin', methods=['POST'])
def login():
    print("api calling")
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing credentials"}), 400

    user = users_collection.find_one({"email": email})
    if not user or user.get("password") != password:
        return jsonify({"message": "Invalid credentials"}), 401

    token = generate_token({"email": email, "role": user.get("role")})
    return jsonify({"token": token, "role": user.get("role")}), 200