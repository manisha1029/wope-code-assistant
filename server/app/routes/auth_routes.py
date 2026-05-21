from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from app.auth.github_oauth import (
    get_github_login_url,
    exchange_code_for_token,
    get_github_user,
)

router = APIRouter(prefix="/auth", tags=["auth"])

# Route 1: Frontend calls this → redirects user to GitHub
@router.get("/github/login")
async def github_login():
    url = await get_github_login_url()
    return RedirectResponse(url)


# Route 2: GitHub redirects back here with a "code"
@router.get("/github/callback")
async def github_callback(code:str):
     # Exchange code for token
    token_data = await exchange_code_for_token(code)
    access_token = token_data.get("access_token")

    if not access_token:
        return {"error": "Failed to get access token"}

    # Get GitHub user
    user_data = await get_github_user(access_token)

    return {
        "message": "Login successful!",
        "github_username": user_data.get("login"),
        "github_id": user_data.get("id"),
        "avatar": user_data.get("avatar_url"),
        "access_token": access_token  # later store this in DB, don't return it
    }
