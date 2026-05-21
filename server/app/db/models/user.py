from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    table_name: str = "users"
    user_id: int
    email: str
    github_id: int
    access_token: str
    avatar_url: str
    created_at: datetime
