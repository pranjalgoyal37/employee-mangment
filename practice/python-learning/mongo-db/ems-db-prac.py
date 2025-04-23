from pymongo  import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client["ems-db"]
user_collection = client["ems_db"]["users"]


# find(filter,include/exclude) 1 ->include the field  0 ->exclude 
# {} -> no filter
# 1 means include only this field
users_id = list(user_collection.find({},{"_id":1,"email":0}))

print(f"user id is :{users_id} ")
print("=========")
users = list(user_collection.find({},))
print(users)

for user in user_collection.find({},{"_id":1,"name":1}):
    print(user["_id"],user["name"])
