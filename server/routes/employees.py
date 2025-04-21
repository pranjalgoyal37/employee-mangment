from flask import Blueprint, request, jsonify, current_app
from utils import mail_helper 
from models import user_model
from flask_bcrypt  import Bcrypt
import numpy as np
from openpyxl import Workbook, load_workbook
import face_recognition
import os
import base64
import cv2
import datetime

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
