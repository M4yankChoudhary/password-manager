import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_jwt_extended import (
    create_access_token,
    JWTManager,
    jwt_required,
    get_jwt_identity,
)
from flask_cors import CORS, cross_origin
from database import client
from models import User
from bson import ObjectId

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {"origins": ["*"], "supports_credentials": True}
    },
)

load_dotenv()

db = client["pm"]

# ENV
GOOGLE_CLIENT_ID = os.environ["GOOGLE_CLIENT_ID"]
GOOGLE_CLIENT_SECRET = os.environ["GOOGLE_CLIENT_SECRET"]
SECRET_KEY = os.environ["SECRET_KEY"]

# JWT Manager
app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
jwt = JWTManager(app)


@app.route("/", methods=["GET"])
def hello_world():
    return {"success": True, "message": "Server is up and running 🚀"}


@app.route("/login", methods=["POST"])
def login():
    auth_code = request.get_json()["code"]

    data = {
        "code": auth_code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": "postmessage",
        "grant_type": "authorization_code",
    }

    response = requests.post("https://oauth2.googleapis.com/token", data=data).json()
    headers = {"Authorization": f'Bearer {response["access_token"]}'}
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo", headers=headers
    ).json()
    try:
        user = User(**user_info)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    user_dict = user.dict()

    # Insert or update the user
    result = db["users"].update_one(
        {"email": user.email}, {"$set": user_dict}, upsert=True
    )
    jwt_token = create_access_token(identity=user_info["email"])
    response = jsonify(user=user_info)
    response.set_cookie("access_token_cookie", value=jwt_token, secure=False)
    return response, 200


@app.route("/user", methods=["GET"])
@jwt_required()
def user():
    jwt_token = request.cookies.get("access_token_cookie")
    current_user = get_jwt_identity()
    print(current_user)
    existing_user = db["users"].find_one({"email": current_user})
    existing_user['_id'] = str(existing_user['_id'])
    return jsonify(logged_in_as=existing_user), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
