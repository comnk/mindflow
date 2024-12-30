from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/api/profile', methods=['POST'])
def get_profile():
    db = get_db()
    users_collection = db["mindflow_users"]
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"msg": "Email is required"}), 400

    user = users_collection.find_one({"email": email}, {"_id": 0, "name": 1, "email": 1})
    if user:
        return jsonify(user), 200
    return jsonify({"msg": "User not found"}), 404


@profile_bp.route('/api/profile/update-name', methods=['PUT'])
def update_name():
    db = get_db()
    users_collection = db["mindflow_users"]
    data = request.get_json()
    email = data.get("email")
    new_name = data.get("name")

    if not email or not new_name:
        return jsonify({"msg": "Email and name are required"}), 400

    result = users_collection.update_one(
        {"email": email},
        {"$set": {"name": new_name.strip()}}
    )

    if result.matched_count:
        return jsonify({"msg": "Name updated successfully"}), 200
    return jsonify({"msg": "User not found"}), 404


@profile_bp.route('/api/profile/update-email', methods=['PUT'])
def update_email():
    db = get_db()
    users_collection = db["mindflow_users"]
    data = request.get_json()
    current_email = data.get("currentEmail")
    new_email = data.get("newEmail")

    if not current_email or not new_email:
        return jsonify({"msg": "Both current and new emails are required"}), 400

    if users_collection.find_one({"email": new_email.strip()}):
        return jsonify({"msg": "Email already in use"}), 400

    result = users_collection.update_one(
        {"email": current_email},
        {"$set": {"email": new_email.strip()}}
    )

    if result.matched_count:
        return jsonify({"msg": "Email updated successfully"}), 200
    return jsonify({"msg": "User not found"}), 404


@profile_bp.route('/api/profile/update-password', methods=['PUT'])
def update_password():
    db = get_db()
    users_collection = db["mindflow_users"]
    data = request.get_json()
    email = data.get("email")
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    if not email or not current_password or not new_password:
        return jsonify({"msg": "Email, current password, and new password are required"}), 400

    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user.get("password"), current_password):
        hashed_password = generate_password_hash(new_password)
        result = users_collection.update_one(
            {"email": email},
            {"$set": {"password": hashed_password}}
        )
        if result.matched_count:
            return jsonify({"msg": "Password updated successfully"}), 200
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"msg": "Invalid current password"}), 400
