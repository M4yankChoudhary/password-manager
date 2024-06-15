from database import client
from models import Vault, User
from bson import ObjectId
from flask import Blueprint, Flask, request, jsonify
from pydantic import ValidationError
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
)

vaults_bp = Blueprint("vaults", __name__)

db = client["pm"]


@vaults_bp.route("/protected-endpoints", methods=["GET"])
@jwt_required()
def vaults_endpoints_protected():
    return {"success": True, "message": "Vaults Endpoints 🚀"}


@vaults_bp.route("/vault", methods=["POST"])
# @jwt_required()
def create_vault():
    data = request.get_json()
    try:
        vault = Vault(**data)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400

    vault_dict = vault.dict()
    db["vault"].insert_one(vault_dict)
    vault_dict["_id"] = str(vault_dict["_id"])
    return jsonify({"msg": "Vault created successfully!", "vault": vault_dict}), 201


@vaults_bp.route("/vault/<vault_id>", methods=["PATCH"])
# @jwt_required()
def update_vault(vault_id):
    data = request.get_json()
    if not vault_id:
        return jsonify({"error": "Please provide vault id"}), 400
    try:
        vault = Vault(**data)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400

    vault_dict = vault.dict()
    if not db["vault"].find_one({"_id": vault_id}):
        return jsonify({"error": f"Vault with {vault_id} not found"}), 400
    try:
        vault_id_obj = ObjectId(vault_id)
    except Exception as e:
        return jsonify({"error": "Failed to get vault id"}), 400

    result = db["vault"].update_one({"_id": vault_id_obj}, {"$set": vault_dict})
    return {"success": True, "message": "Vault Updated Successfully!"}


@vaults_bp.route("/vault/<vault_id>", methods=["DELETE"])
# @jwt_required()
def delete_vault(vault_id):
    if not vault_id:
        return jsonify({"error": "Please provide vault id"}), 400
    vault_id = ObjectId(vault_id)
    if not db["vault"].find_one({"_id": vault_id}):
        return jsonify({"error": f"Vault with {vault_id} not found"}), 400
    result = db["vault"].delete_one({"_id": vault_id})
    return {"success": True, "message": "Vault Deleted Successfully!"}
