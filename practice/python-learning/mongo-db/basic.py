# pip install pymongo

#   insert_one(document)
#   insert_many([document1,document2])
#   find_one(filter) return first matching document
#   find(filter)  return a cursor object(iterable document)
#   update_one(filter,update)
#   update_many(filter,update)
#   delete_one(filter)
#   delete_many(filter)
#   count_documents(filter)
#

from pymongo  import MongoClient



# by using local mogodb
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient("Mongo_URI")


# by mongodb server
Mongo_Atlas_URI = ""


# Create database
db = client["data-base"]  # database
user_collection = db["users"]  # collection


user ={
    "name" : "pg",
    "age" : 25,
    
}
# data insertion   parameter - dict , return object (_id)
user_collection.insert_one(user)


user_collection.insert_many([
    {
    "name":"pranjal",
    "age" : 30
    },
    {
        "name":"robo",
        "age" : 40
    }
    
    
    
    ])



# read data from db

user = user_collection.find({"name":"pg"})
print(user)

# for all user
for user in user_collection.find():
    print(user)

#update user
user_collection.update_one({
    "name":"Amit",},{"$set":{"age":36}}) 
user_collection.delete_one({"name":"Amit"})