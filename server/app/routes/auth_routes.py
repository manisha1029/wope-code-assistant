from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from app.auth.github_oauth import get_github_login_url
from app.services.auth_service import handle_github_login_service

router = APIRouter(prefix="/auth", tags=["auth"])

# Route 1: Frontend calls this → redirects user to GitHub
@router.get("/github/login")
async def github_login():
    url = get_github_login_url()
    return {'url': url}


# Route 2: GitHub redirects back here with a "code"
@router.get("/github/callback")
async def github_callback(code: str):
    user, jwt_token, error = await handle_github_login_service(code)
    if error: 
        raise HTTPException(status_code=400, detail=error) 
    
    # redirect back to frontend
    return {
        "access_token": jwt_token,
        "user": {
            "github_id": user.github_id,
            "email": user.email,
            "avatar": user.avatar_url,
        },
    }

@router.get("/logout")    
async def logout():
    return {
        "message": "Logged out successfully",
    }    