from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from routes.auth_routes import auth_bp

app = Flask(__name__)
CORS(app)



app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5050",debug=True)