from pydantic import BaseModel, Field
from typing import Optional, List, Union

class User(BaseModel):
    name: str
    