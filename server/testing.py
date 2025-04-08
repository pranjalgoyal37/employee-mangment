from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow all origins and credentials (for testing only)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/api/login_admin", methods=["POST"])
def login_admin():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No JSON data received"}), 400

    email = data.get("email")
    password = data.get("password")

    if email == "admin@test.com" and password == "admin123":
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)