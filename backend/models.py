from pydantic import BaseModel, ValidationError, validator, Field
from typing import Optional, List, Union
from bson import ObjectId
from database import client


db = client["pm"]

class User(BaseModel):
    email: str
    email_verified: bool
    family_name: str
    given_name: str
    name: str
    picture: str
    sub: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Vault(BaseModel):
    name: str
    description: str
    master_key: str
    
    @validator('name')
    def validate_unique_name(cls, value):
        if db["vault"].find_one({"name": value}):
            raise ValueError('Vault name must be unique')
        return value

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Password(BaseModel):
    username: str
    domain: str
    encrypted_password: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
