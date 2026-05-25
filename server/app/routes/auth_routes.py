from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from app.auth.github_oauth import get_github_login_url
from app.services.auth_service import handle_github_login_service

router = APIRouter(prefix="/auth", tags=["auth"])

# Route 1: Frontend calls this → redirects user to GitHub
@router.get("/github/login")
async def github_login():
    url = await get_github_login_url()
    return RedirectResponse(url)


# Route 2: GitHub redirects back here with a "code"
@router.get("/github/callback")
async def github_callback(code: str):
    user, error = await handle_github_login_service(code)
    if error: 
        raise HTTPException(status_code=400, detail=error) 
    
    return {
        "message": "Login successful!",
        "github_id": user.github_id,
        "email": user.email,
        "avatar": user.avatar_url,
        "access_token": user.access_token
    }
