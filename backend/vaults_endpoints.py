from database import client
from models import Vault, User
from bson import ObjectId
from flask import Blueprint, Flask, request, jsonify
from pydantic import ValidationError
from flask_jwt_extended import (
    jwt_required,
)

vaults_bp = Blueprint("vaults", __name__)

db = client["pm"]

# create a vault
@vaults_bp.route("/vault", methods=["POST"])
# @jwt_required()
def create_vault():
    data = request.get_json()
    try:
        vault = Vault(**data)
    except ValidationError as e:
        return jsonify({"success": False, "message": e.errors()}), 400

    vault_dict = vault.dict()
    db["vault"].insert_one(vault_dict)
    vault_dict["_id"] = str(vault_dict["_id"])
    return jsonify({"success": True, "message": "Vault created successfully!", "data": vault_dict}), 201

# Get a Vault by ID
@vaults_bp.route("/vault/<vault_id>", methods=["GET"])
# @jwt_required()
def get_vault(vault_id):
    if not vault_id:
        return jsonify({"success": False, "message": "Please provide vault id"}), 400
    vault_id = ObjectId(vault_id)
    vault = db["vault"].find_one({"_id": vault_id})
    if not vault:
        return jsonify({"success": False, "message": f"Vault with {vault_id} not found"}), 400
    vault['_id'] = str(vault['_id'])
    return jsonify({"success": True, "message": "vault fecthed successfully", "data": vault}), 200

# Get All Vaults
@vaults_bp.route("/vaults", methods=["GET"])
# @jwt_required()
def get_all_vaults():
    vaults = list(db["vault"].find())
    for vault in vaults:
        vault['_id'] = str(vault['_id'])
    return jsonify({"success": True, "message": "vaults fecthed successfully", "data": vaults})

# Update a vault by id
@vaults_bp.route("/vault/<vault_id>", methods=["PATCH"])
# @jwt_required()
def update_vault(vault_id):
    data = request.get_json()
    if not vault_id:
        return jsonify({"success": False, "message": "Please provide vault id"}), 400
    try:
        vault = Vault(**data)
    except ValidationError as e:
        return jsonify({"success": False, "message": e.errors()}), 400

    vault_dict = vault.dict()
    if not db["vault"].find_one({"_id": vault_id}):
        return jsonify({"success": False, "message": f"Vault with {vault_id} not found"}), 400
    try:
        vault_id_obj = ObjectId(vault_id)
    except Exception as e:
        return jsonify({"success": False, "message": "Failed to get vault id"}), 400

    result = db["vault"].update_one({"_id": vault_id_obj}, {"$set": vault_dict})
    return jsonify({"success": True, "message": "Vault Updated Successfully!"}), 200

# DELETE a Vault by ID
@vaults_bp.route("/vault/<vault_id>", methods=["DELETE"])
# @jwt_required()
def delete_vault(vault_id):
    if not vault_id:
        return jsonify({"success": False,"messsage": "Please provide vault id"}), 400
    vault_id = ObjectId(vault_id)
    if not db["vault"].find_one({"_id": vault_id}):
        return jsonify({"success": False, "message": f"Vault with {vault_id} not found"}), 400
    
    db["vault"].delete_one({"_id": vault_id})
    db["password"].delete_many({"vault_id": str(vault_id)})
    return jsonify({"success": True, "message": "Vault Deleted Successfully!"}), 200


