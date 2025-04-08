from pymongo import MongoClient
from config import MONGO_URI

try:
    client = MongoClient(MONGO_URI)
    db = client.get_database()
    print("✅ Connected to MongoDB")
except Exception as e:
    print(" MongoDB connection error:", e)
    db = None