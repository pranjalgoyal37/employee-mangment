from flask import Blueprint, request, jsonify, current_app
from utils import mail_helper 
from models import user_model,attendance_model
from flask_bcrypt  import Bcrypt
from datetime import datetime
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
import os
UPLOAD_FOLDER = 'static/profile_pics'  # You can change this path
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Ensure folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


employees = Blueprint('employees', __name__)


# UPLOAD_FOLDER = 'known_faces'


# =============================
# Employee Routes
# =============================
bcrypt = Bcrypt()
# add employee in the db
@employees.route("/employees", methods=["POST", "OPTIONS"])
def add_employee():
    if request.method == "OPTIONS":
        return '', 200
    print(request.data)
    data = request.get_json()
    required_fields = ["name", "email", "department", "position", "joiningDate", "status", "password","role"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user = user_model.find_user(data["email"])
    if user :
        return jsonify({"message": "Employee already exists"}), 409
    
    hashed_pass = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
    data["password"] = hashed_pass
    user_model.insert_user(data)

    try:
        mail_helper.send_mail(data)

    except Exception as e:
        print(e)
        return jsonify({"message": "User created, but email sending failed", "error": str(e)}), 500

    return  jsonify({"message": "Employee created successfully"}), 201

today_date = datetime.now().strftime("%d-%m-%y")


#  show all employee in the table of admin dashboard
@employees.route("/employee-data", methods=["GET"])
def get_employees():
    try:
        print("calling all user ")
        all_emps = user_model.find_all_user()
        if not all_emps:
            print("No employees found.")
            return jsonify({"employees": []}), 200  # Return empty array if no users are found
        print(all_emps)
        return jsonify({"employees": all_emps}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@employees.route('/delete-employee/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        result = user_model.delete_user(id)
        print(result)
        if result.deleted_count == 1:
            return jsonify({"message": "Employee deleted successfully"}), 200
        else:
            return jsonify({"message": "Employee not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@employees.route('/dashboard-summary', methods=['GET'])
def dashboard_summary():
    try:
        # Total users 
        total_users = user_model.users_collection.count_documents({"role": "user"})
        active_tasks = user_model.tasks_collection.count_documents({"status": "completed"})
        present_user = attendance_model.attendance_collection.count_documents({"status": "Present", "date": today_date})
        return jsonify({
            "total_users": total_users,
            "active_tasks": active_tasks,
            "present_user" : present_user
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get user by ID
@employees.route("/user/<user_id>", methods=["GET"])
def get_user(user_id):
    user = user_model.users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return jsonify({
            "username": user.get("name", ""),
            "email": user.get("email", ""),
        }), 200
    return jsonify({"error": "User not found"}), 404


# get user profile pic
@employees.route("/user/profile-pic/<user_id>", methods=["GET"])
def get_profile_pic(user_id):
      # Pass userId as query param
    print(user_id)
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    user = user_model.users_collection.find_one({"_id": ObjectId(user_id)})

    if not user or "name" not in user:
        return jsonify({"error": "User not found"}), 404

    username = user["name"]
    # Construct filename
    for ext in ['png', 'jpg', 'jpeg', 'gif']:
        filename = f"{username}.{ext}"
        # print(filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        print(filepath)
        if os.path.exists(filepath):
            return jsonify({"profilePic": f"/{filepath}"})

    return jsonify({"error": "Profile picture not found"}), 404


@employees.route("/update-user/<user_id>", methods=["PUT"])
def update_user(user_id):

    data = request.get_json()

    # Fields to be updated
    update_fields = {}

    # Check if the fields are in the request data and add them to the update fields
    if "name" in data:
        update_fields["name"] = data["name"]
    if "email" in data:
        update_fields["email"] = data["email"]
    if "password" in data:
        hashed_pass = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
        update_fields["password"] = hashed_pass
    if "department" in data:
        update_fields["department"] = data["department"]
    if "position" in data:
        update_fields["position"] = data["position"]
    if "joiningDate" in data:
        update_fields["joiningDate"] = data["joiningDate"]
    if "status" in data:
        update_fields["status"] = data["status"]
    if "role" in data:
        update_fields["role"] = data["role"]

    # Update the user in the database
    result = user_model.users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})

    # Return response based on the result of the update
    if result.modified_count:
        return jsonify({"message": "Employee updated successfully"}), 200
    return jsonify({"message": "No changes made"}), 200


# Update user
@employees.route("/user/<user_id>", methods=["PUT"])
def user(user_id):
    print("///////////////////////////////////////////")
    data = request.form.to_dict()  # ✅ use form data instead of JSON
    image = request.files.get("profilePic")

    update_fields = {}
    if "username" in data:
        update_fields["name"] = data["username"]  # also correct field name
    if "email" in data:
        update_fields["email"] = data["email"]
    if "password" in data:
        hashed_pass = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
        update_fields["password"] = hashed_pass

    # Handle profile picture
    if image and allowed_file(image.filename):
        ext = image.filename.rsplit('.', 1)[1].lower() 
        filename = secure_filename(f"{data['username']}.{ext}" )
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        print(image_path)
        image.save(image_path)
        update_fields["profilePic"] = f"/{image_path}"

    result = user_model.users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
    if result.modified_count:
        return jsonify({"message": "User updated successfully"}), 200
    return jsonify({"message": "No changes made"}), 200



@employees.route('/usersName', methods=['GET'])
def get_users():
    try:
        # Fetch users with role: user
        users = list(user_model.users_collection.find({"role": "user"}, {"_id": 0}))
        names = []
        for user in users:
            names.append(user['name'])

        return jsonify({
            "names": names,
            "total_users": len(users)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =============================
# Task Routes
# =============================
@employees.route("/tasks/create", methods=["POST", "OPTIONS"])
def create_task():
    try:
        if request.method == "OPTIONS":
            return '', 200

        data = request.get_json()
        required_fields = ["title", "description", "assignee", "dueDate", "priority"]
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"success": False, "message": f"Missing field: {field}"}), 400

        result = user_model.add_task(data)
        return jsonify({
            "success": True,
            "message": "Task created successfully",
            "task_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@employees.route("/task-data", methods=["GET"])
def get_tasks():
    try:
        all_tasks = user_model.get_tasks()
        if not all_tasks:
            return
        return jsonify({"tasks": all_tasks}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
