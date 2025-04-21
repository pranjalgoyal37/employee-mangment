from pymongo import MongoClient
from config import Config

MONGO_URI = Config.MONGO_URI

def get_db():
    try:
        client = MongoClient(MONGO_URI)
        db = client["ems_db"]
        print("✅ Connected to MongoDB")
        return db
    except Exception as e:
        print("❌ MongoDB connection error:", e)
        return  None