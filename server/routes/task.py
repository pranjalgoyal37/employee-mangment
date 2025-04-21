from flask import Blueprint, request, jsonify
from models.user_model import tasks_collection


tasks_bp = Blueprint("task", __name__)

@tasks_bp.route("/api/tasks/create", methods=["POST","OPTIONS"])
def create_task():
    try:
        data = request.get_json()

        # Basic validation
        required_fields = ["title", "description", "assignee", "dueDate", "priority"]
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"success": False, "message": f"Missing field: {field}"}), 400

       
        result = tasks_collection.insert_one(data)

        return jsonify({
            "success": True,
            "message": "Task created successfully",
            "task_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500