from fastapi import APIRouter, HTTPException, Depends
from app.services.user_service import get_user_by_github_id_service
from app.models.schemas import UserResponse
from app.middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/", response_model=UserResponse)
async def get_user(current_user: dict = Depends(get_current_user)):
    github_id = current_user.get("github_id")
    user, error = await get_user_by_github_id_service(github_id)
    if error:
        raise HTTPException(status_code=404, detail=error)
    return {
        "message": "User fetched successfully",
        "data": user
    }
