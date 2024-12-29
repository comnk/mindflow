from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

client = None

def get_db():
    global client
    if not client:
        client = MongoClient(MONGODB_URI)
    return client["mindflow"]

# from pymongo import MongoClient

# def get_db():
#     client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=5000)
#     return client["mindflow"]
