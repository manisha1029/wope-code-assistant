import jwt
from datetime import datetime, timedelta
from app.config.config import config

ALGORITHM = "HS256"

def create_access_token(data: dict) -> str:
    """
    Creates a JWT token
    data = whatever you want to store inside the token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=config.JWT_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, config.SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> dict | None:
    """
    Decodes and verifies JWT token
    Returns payload if valid, None if invalid or expired
    """
    try:
        payload = jwt.decode(
            token,
            config.SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None   # token expired
    except jwt.InvalidTokenError:
        return None   # token invalid

# def create_refresh_token(data: dict) -> str:
#     """
#     Creates a JWT refresh token
#     data = whatever you want to store inside the token
#     """
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(days=30) # 30 days refresh token
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, config.SECRET_KEY, algorithm=ALGORITHM)