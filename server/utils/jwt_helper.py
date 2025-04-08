import jwt
from config import JWT_SECRET
from datetime import datetime, timedelta

def generate_token(payload):
    return jwt.encode(
        {"exp": datetime.utcnow() + timedelta(hours=2), **payload},
        JWT_SECRET,
        algorithm="HS256"
    )

def decode_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None