from database import client
from models import Password
from bson import ObjectId
from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from flask_jwt_extended import jwt_required
from encryption import decrypt, encrypt
passwords_bp = Blueprint("passwords", __name__)
db = client["pm"]


# Create a Password
@passwords_bp.route("/password", methods=["POST"])
# @jwt_required()
def create_password():
    data = request.get_json()
    try:
        password = Password(**data)
    except ValidationError as e:
        return jsonify({"success": False, "message": e.errors()}), 400

    # Check if the vault_id exists in the database
    vault_id = ObjectId(password.vault_id)
    if not db["vault"].find_one({"_id": vault_id}):
        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Vault with ID {password.vault_id} not found",
                }
            ),
            400,
        )

    password_dict = password.dict()
    password_dict['encrypted_password'] = encrypt(password_dict['encrypted_password'])
    db["password"].insert_one(password_dict)
    password_dict["_id"] = str(password_dict["_id"])
    return (
        jsonify(
            {
                "success": True,
                "message": "Password created successfully!",
                "password": password_dict,
            }
        ),
        201,
    )


# Get a Password by ID
@passwords_bp.route("/password/<password_id>", methods=["POST"])
# @jwt_required()
def get_password(password_id):
    if not password_id:
        return jsonify({"success": False, "message": "Please provide password id"}), 400
    password_id = ObjectId(password_id)
    master_key = request.get_json()['master_key']
    if not request.get_json()['master_key']:
        return (
            jsonify(
                {"success": False, "message": f"Please provide master key to unlock the vault"}
            ),
            400,
        )
    password = db["password"].find_one({"_id": password_id})
    if not password:
        return (
            jsonify(
                {"success": False, "message": f"Password with {password_id} not found"}
            ),
            400,
        )
    vault_id = ObjectId(password["vault_id"])
    vault = db["vault"].find_one({"_id": vault_id})
    if not vault:
        return jsonify({"success": False, "message": f"Vault with {vault_id} not found"}), 400
    print(decrypt(vault['master_key']))
    print(decrypt(vault['master_key']) == master_key)
    password["_id"] = str(password["_id"])
    
    # If master key matches
    if decrypt(vault['master_key']) == master_key:
        password['encrypted_password'] = decrypt(password["encrypted_password"])
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Password fetched successfully",
                    "data": password,
                }
            ),
            200,
        )
    else:
        return jsonify({"success": False, "message": f"Please provide correct master key."}), 403
    



# Get All Passwords
@passwords_bp.route("/passwords", methods=["GET"])
# @jwt_required()
def get_all_passwords():
    passwords = list(db["password"].find())
    for password in passwords:
        password["_id"] = str(password["_id"])
    return jsonify(
        {
            "success": True,
            "message": "Passwords fetched successfully",
            "data": passwords,
        }
    )


# Update a Password by ID
@passwords_bp.route("/password/<password_id>", methods=["PATCH"])
# @jwt_required()
def update_password(password_id):
    data = request.get_json()
    if not password_id:
        return jsonify({"success": False, "message": "Please provide password id"}), 400
    try:
        password = Password(**data)
    except ValidationError as e:
        return jsonify({"success": False, "message": e.errors()}), 400

    password_dict = password.dict()
    try:
        password_id_obj = ObjectId(password_id)
    except Exception as e:
        return jsonify({"success": False, "message": "Failed to get password id"}), 400
    if not db["password"].find_one({"_id": password_id_obj}):
        return (
            jsonify(
                {"success": False, "message": f"Password with {password_id} not found"}
            ),
            400,
        )
    result = db["password"].update_one(
        {"_id": password_id_obj}, {"$set": password_dict}
    )
    return jsonify({"success": True, "message": "Password Updated Successfully!"}), 200


# Delete a Password by ID
@passwords_bp.route("/password/<password_id>", methods=["DELETE"])
# @jwt_required()
def delete_password(password_id):
    if not password_id:
        return jsonify({"success": False, "message": "Please provide password id"}), 400
    password_id = ObjectId(password_id)
    if not db["password"].find_one({"_id": password_id}):
        return (
            jsonify(
                {"success": False, "message": f"Password with {password_id} not found"}
            ),
            400,
        )
    result = db["password"].delete_one({"_id": password_id})
    return jsonify({"success": True, "message": "Password Deleted Successfully!"}), 200


@passwords_bp.route("/passwords/vault/<vault_id>", methods=["GET"])
# @jwt_required()
def get_passwords_by_vault_id(vault_id):
    try:
        passwords = list(db["password"].find({"vault_id": vault_id}))
        for password in passwords:
            password["_id"] = str(password["_id"])

        return jsonify(
            {
                "success": True,
                "message": f"Passwords for Vault ID {vault_id} fetched successfully",
                "data": passwords,
            }
        )

    except Exception as e:
        return (
            jsonify(
                {"success": False, "message": f"Error fetching passwords: {str(e)}"}
            ),
            500,
        )
