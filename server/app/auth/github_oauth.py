import httpx
from app.config.config import config

# Step 1: URL to send user to GitHub login
def get_github_login_url():
    return (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={config.GITHUB_CLIENT_ID}" 
        f"&redirect_uri={config.GITHUB_REDIRECT_URI}"
        f"&scope=repo user"
    )

# Step 2: Exchange the code GitHub sends back → get access token
async def exchange_code_for_token(code: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://github.com/login/oauth/access_token",
            headers={"Accept": "application/json"},
            data={
                "client_id": config.GITHUB_CLIENT_ID,
                "client_secret": config.GITHUB_CLIENT_SECRET,
                "code": code,
                "redirect_uri": config.GITHUB_REDIRECT_URI,
            },
        )
    return response.json()

# Step 3: Use token to get GitHub user info
async def get_github_user(token: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.github.com/user",
            headers={"Authorization": f"Bearer {token}"},
        )
    return response.json()

async def fetch_github_repos(access_token: str):
    """Calls GitHub API and returns list of repos"""
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.github.com/user/repos",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github+json"
            },
            params={
                "per_page": 100,    # fetch up to 100 repos
                "sort": "updated",  # most recently updated first
                "type": "all"       # include private + public
            }
        )
    return response.json()
