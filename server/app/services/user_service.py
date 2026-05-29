from app.db.crud.user_crud import get_user_by_github_id

async def get_user_by_github_id_service(github_id: int):
    user = await get_user_by_github_id(github_id)
    if not user:
        return None, "User not found"
    return user, None