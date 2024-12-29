from flask import g
from pymongo import MongoClient
import os

def get_db():
    if "db" not in g:
        client = MongoClient(os.getenv("MONGODB_URI"))
        g.db = client["mindflow"]
    return g.db

def close_db(error=None):
    db = g.pop("db", None)
    if db is not None:
        db.client.close()
