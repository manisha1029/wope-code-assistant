from fastapi import APIRouter, HTTPException
from app.services.repo_service import get_user_repos_service

router = APIRouter(prefix="/repos", tags=["repos"])

@router.get("/{github_id}")
async def get_repositories(github_id: int):
    repos, error = await get_user_repos_service(github_id)
    if error:
        raise HTTPException(status_code=400, detail=error)
    return {
        "message": f"{len(repos) if repos else 0} repositories fetched successfully",
        "data": repos
    }
    