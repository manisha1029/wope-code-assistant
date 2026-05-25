from fastapi import APIRouter, HTTPException, Depends
from app.db.session import get_session
from app.auth.github_oauth import get_github_user_repos
from app.db.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.auth_middleware import get_current_user

router = APIRouter(prefix="/repos", tags=["repos"])

@router.get("/{github_id}")
async def get_repositories(github_id:int):
    repos, error = await get_github_user_repos(github_id)
    if error:
        raise HTTPException(status_code=400, detail=error)
    return {
        "message" : f"{len(repos)} repositories fetched successfully",
        "data" : repos
    }
    