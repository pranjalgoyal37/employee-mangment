# server/app.py
from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from config import Config
from extensions import socketio  # Import from extensions.py
from flask_socketio import join_room
from flask_jwt_extended import JWTManager 
# Blueprints
from routes.auth_routes import auth_bp
from routes.employees import employees
from routes.task import tasks_bp
from routes.attendance_route import attendance_bp
from routes.chat_route import chat_bp
from flask_socketio import join_room, leave_room, emit
from flask import request

connected_users = {}


# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Init mail
mail = Mail(app)
app.mail = mail

jwt = JWTManager(app)

# Init SocketIO
socketio.init_app(app, cors_allowed_origins="*")

@socketio.on("connect")
def handle_connect():
    print("A user connected")

@socketio.on("join")
def handle_join(data):
    user_id = data.get("userId")
    if user_id:
        connected_users[user_id] = request.sid
        join_room(user_id)
        emit("user_online", {"userId": user_id}, broadcast=True)

@socketio.on("disconnect")
def handle_disconnect():
    for user_id, sid in list(connected_users.items()):
        if sid == request.sid:
            leave_room(user_id)
            emit("user_offline", {"userId": user_id}, broadcast=True)
            del connected_users[user_id]
            break

@socketio.on("typing")
def handle_typing(data):
    receiver_id = data.get("receiverId")
    sender_id = data.get("senderId")
    emit("typing", {"senderId": sender_id}, room=receiver_id)

@socketio.on("stop_typing")
def handle_stop_typing(data):
    receiver_id = data.get("receiverId")
    sender_id = data.get("senderId")
    emit("stop_typing", {"senderId": sender_id}, room=receiver_id)


# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(employees, url_prefix="/api")
app.register_blueprint(tasks_bp)
app.register_blueprint(attendance_bp,url_prefix="/api")
app.register_blueprint(chat_bp, url_prefix="/api")

# Run the server
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5050, debug=True)
