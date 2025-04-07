from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from pymongo import MongoClient
from datetime import timedelta

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

jwt = JWTManager(app)

client = MongoClient("your-mongodb-uri")
db = client["employee_management"]
users = db["users"]

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"msg": "User already exists"}), 409
    users.insert_one(data)
    return jsonify({"msg": "User registered"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"email": data["email"], "password": data["password"]})
    if user:
        access_token = create_access_token(identity=data["email"])
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Invalid credentials"}), 401

@app.route("/api/employees", methods=["GET"])
@jwt_required()
def get_employees():
    emp_list = list(users.find({}, {"_id": 0, "password": 0}))
    return jsonify(emp_list), 200

if __name__ == "__main__":
    app.run(debug=True)
