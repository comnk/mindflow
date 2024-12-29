from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

client = MongoClient(os.getenv("MONGODB_URI"))

def get_db():
    return client["mindflow"]


# from pymongo import MongoClient

# def get_db():
#     client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=5000)
#     return client["mindflow"]
