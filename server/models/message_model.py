from utils.db import get_db

db = get_db()

message_collection = db["message_collection"]



def insert_message(message):
    result =  message_collection.insert_one(message)
    return result.inserted_id


def get_messages_between_users(sender_id, receiver_id):
    query = {
        "$or": [
            {"senderId": sender_id, "receiverId": receiver_id},
            {"senderId": receiver_id, "receiverId": sender_id}
        ]
    }
    print("QUERY:", query)  # ✅ DEBUG
    messages = message_collection.find(query).sort("timestamp", 1)
    result = [msg for msg in messages]
    print("RESULT:", result)  # ✅ DEBUG
    return result
