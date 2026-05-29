from pydantic import BaseModel
from datetime import datetime

class UserSchema(BaseModel):
    id: int
    email: str
    github_id: int
    avatar_url: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    message: str
    data: UserSchema
