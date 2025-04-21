from utils.db import get_db  # ✅ import from utils
from bson import json_util
from bson.objectid import ObjectId

db = get_db()

users_collection = db["users"] 
tasks_collection =db["tasks"]

def convert_user(user):
    user["_id"] = str(user["_id"])  # Convert ObjectId to string
    return user


def insert_user(data):
    print(data)
    users_collection.insert_one(data)

def find_user(email):
    return users_collection.find_one({'email':email})

def task_collection(task):
    tasks_collection.insert_one(task)

# find(filter,exclude)
def find_all_user():
    try:
        # Fetch users from the database
        all_users = list(users_collection.find({}, {"password": 0}))
        formatted_users = [convert_user(user) for user in all_users]
        return formatted_users
    except Exception as e:
        print("Error in find_all_user:", e)
        return []


def delete_user(id):
    return users_collection.delete_one({"_id": ObjectId(id)})

def add_task(data):
    return tasks_collection.insert_one(data)

def get_tasks():
    return list(tasks_collection.find({}, {"_id": 0}))

def chat_users(current_user_id):
    users = list(users_collection.find({"_id": {"$ne": current_user_id}}, {"password": 0}))
    for user in users:
        user["_id"] = str(user["_id"])
    return users
