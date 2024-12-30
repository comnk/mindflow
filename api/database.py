from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

_client = None  # Use a global variable to cache the client

def get_db():
    global _client
    if _client is None:
        # Initialize MongoClient only when called
        _client = MongoClient(os.getenv("MONGODB_URI"))
    
    return _client["mindflow"]