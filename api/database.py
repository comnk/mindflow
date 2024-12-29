from pymongo import MongoClient
from dotenv import load_dotenv

import os

load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

def get_db():
    client = MongoClient(MONGODB_URI)
    return client["mindflow"]