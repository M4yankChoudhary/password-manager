from pydantic import BaseModel, Field
from typing import Optional, List, Union

class User(BaseModel):
    email: str
    email_verified: bool
    family_name: str
    given_name: str
    name: str
    picture: str
    sub: str
