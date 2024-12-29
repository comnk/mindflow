from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from database import get_db

bcrypt = Bcrypt()
auth = Blueprint("auth", __name__)
db = get_db()
users = db["mindflow_users"]

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if (users.find_one({"email": email})):
      return jsonify({"error": "That user already exists"}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users.insert_one({"name":name, "email":email, "password":hashed_password})

    return jsonify({"message": "User registered successfully"}), 201

@auth.route("/login", methods=["POST"])
def login():
   data = request.get_json()
   email = data.get("email")
   password = data.get("password")

   user = users.find_one({"email":email})

   if (user and bcrypt.check_password_hash(user["password"], password)):
      access_token = create_access_token(identity={"email": email})
      return jsonify({"access_token": access_token}), 200
   
   return jsonify({"error": "Email or password incorrect"}), 401