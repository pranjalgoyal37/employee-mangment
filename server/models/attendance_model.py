from utils.db import get_db

db = get_db()

attendance_collection = db["attendance"]
leave_collection = db["leave_collection"]


def attendance(user_id):
    return list(attendance_collection.find({"userId": user_id}))