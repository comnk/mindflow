from pymongo import MongoClient
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import get_db

profile_bp = Blueprint('profile', __name__)

db = get_db()
users_collection = db["mindflow_users"]

@profile_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    user = users_collection.find_one({"email": current_user_email}, {"_id": 0, "name": 1, "email": 1})
    
    if user:
        return jsonify(user), 200
    return jsonify({"msg": "User not found"}), 404

@profile_bp.route('/profile/update-name', methods=['PUT'])
@jwt_required()
def update_name():
    current_user_email = get_jwt_identity()
    new_name = request.json.get("name")

    if new_name:
        result = users_collection.update_one({"email": current_user_email}, {"$set": {"name": new_name}})
        if result.matched_count:
            return jsonify({"msg": "Name updated successfully"}), 200
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"msg": "Invalid name"}), 400

@profile_bp.route('/profile/update-email', methods=['PUT'])
@jwt_required()
def update_email():
    current_user_email = get_jwt_identity()
    new_email = request.json.get("email")

    if new_email:
        if users_collection.find_one({"email": new_email}):
            return jsonify({"msg": "Email already in use"}), 400
        
        result = users_collection.update_one({"email": current_user_email}, {"$set": {"email": new_email}})
        if result.matched_count:
            return jsonify({"msg": "Email updated successfully"}), 200
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"msg": "Invalid email"}), 400

@profile_bp.route('/profile/update-password', methods=['PUT'])
@jwt_required()
def update_password():
    current_user_email = get_jwt_identity()
    current_password = request.json.get("currentPassword")
    new_password = request.json.get("newPassword")

    user = users_collection.find_one({"email": current_user_email})
    if user and check_password_hash(user["password"], current_password):
        hashed_password = generate_password_hash(new_password)
        result = users_collection.update_one({"email": current_user_email}, {"$set": {"password": hashed_password}})
        if result.matched_count:
            return jsonify({"msg": "Password updated successfully"}), 200
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"msg": "Invalid current password"}), 400
