from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

client = MongoClient(os.getenv("MONGODB_URI"))

def get_db():
    return client["mindflow"]