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
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

load_dotenv()

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


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)