from pymongo import MongoClient
from flask_bcrypt import Bcrypt

MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client["mongo-practice"]
user_collection = db["users"]
pwd = "1234"
bcrypt = Bcrypt()

hash_pwd =  bcrypt.generate_password_hash(pwd).decode('utf-8')
# user_collection.insert_one({
#     "name":"robo",
#     "email":"robo@gmail.com",
#     "password" : hash_pwd
# })
email = "robo@gmail.com"
user_data = user_collection.find_one({"email":email})
is_valid = bcrypt.check_password_hash(user_data["password"],pwd)
print(is_valid)