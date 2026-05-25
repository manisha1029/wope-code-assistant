from app.db.crud.user_crud import get_user_by_github_id
from app.auth.github_oauth import fetch_github_repos
from app.db.crud.repo_crud import save_repo

async def get_user_repos_service(github_id):
    """
    Full repo sync flow:
    1. Get user from DB
    2. Decrypt their token
    3. Fetch repos from GitHub
    4. Save each repo to DB
    5. Return repos list
    """
    user = await get_user_by_github_id(github_id)
    if not user:
        return None, "User not found"
    
    access_token = user.access_token
    
    repos = await fetch_github_repos(access_token)
    
    for repo in repos:
        await save_repo(repo)
    
    return repos, None
    