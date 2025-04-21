import jwt
from config import Config
from datetime import datetime, timedelta

SECRET_KEY = Config.SECRET_KEY

def generate_token(payload):
    token = jwt.encode(
        {"exp": datetime.utcnow() + timedelta(hours=24), **payload},
        SECRET_KEY,
        algorithm="HS256"
    )
    return token


def decode_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

