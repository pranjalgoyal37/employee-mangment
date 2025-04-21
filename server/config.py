import os
from dotenv import load_dotenv

load_dotenv()
class Config:
    # JWT
    SECRET_KEY = os.getenv("JWT_SECRET", "default-secret-key")
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # MongoDB
    MONGO_URI =os.getenv("MONGO_URI")
    
    # Mail
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_USERNAME")