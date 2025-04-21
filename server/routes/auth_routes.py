from flask import Blueprint, request, jsonify
from utils.jwt_helper import generate_token
from models import user_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token


auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    email = data.get("email")
    password = data.get("password")
 
    if not email or not password:
        return jsonify({"message": "Missing field"}), 400
    
    # Check user in database
    user = user_model.find_user(email)
    print("===================",user_model)
    if not user:
        return jsonify({"status": "ERROR", "message": "User not found"}), 401
    
    # Compare the hashed password
    if not bcrypt.check_password_hash(user["password"], data["password"]):
        return jsonify({"status": "ERROR", "message": "Invalid credentials"}), 401
    
    # Generate JWT token with 'sub' claim set to user ID
    token = create_access_token(identity=str(user["_id"]), additional_claims={"role": user.get("role")})
    
    print(token)
   
    user_data = {
        "_id": str(user["_id"]),
        "email": user["email"],
        "username": user["name"],
        "role":user["role"]
    }

    return jsonify({"token": token, "user": user_data}), 200

