# JWT is a compact, secure way to transmit information (claims) between two parties (like client and server) as a JSON object.
# It's mainly used for authentication and authorization.
#  No need of store session in  server
# it's stateless the token contains all the information about the user
# it has 3 parts (header,payload,signature) all are separated by dot (.)
# header-> describe how the token is signed and tells the sever how to verify the token signature
# payload  -> information you want to transmit securely.
# signature -> it's a hash of header and payload
# two function jwt.encode(payload,SECRETE_KEY,algorithm ="HS256") 
#              jwt.decode(token,SECRETE_KEY, algorithm ="HS256")


import jwt 
from datetime import datetime ,timedelta


payload={
    "email" : "abc@gamil.com",
    "role" : "admin",
    "exp" : datetime.utcnow() + timedelta(hours = 24)
}

Secrete_key = "abcdefghijklmnopqrtuvwxyz1244567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
def generate_token(payload):
    return jwt.encode(payload, Secrete_key, algorithm="HS256")



def decode_token(token):
    try:
        decoded = jwt.decode(token,Secrete_key,algorithms="HS256")
        return decoded
    except jwt.ExpiredSignatureError:
        return  {"error":"Token is expired"}
    except jwt.InvalidTokenError:
        return{"error":"Invalid Token"}
    
token = generate_token(payload)
print(f"=================\n token is : {token}")

decoded_data = decode_token(token)
print("=======================\n decoded data is : ",decoded_data)  