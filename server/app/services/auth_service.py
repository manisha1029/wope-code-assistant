from app.auth.github_oauth import exchange_code_for_token, get_github_user
from app.db.crud.user_crud import get_user_by_github_id, create_user, update_user
from app.db.models.user import User
from app.auth.jwt_handler import create_access_token

async def handle_github_login_service(code: str):
    # Step 1: Exchange code for token
    token_data = await exchange_code_for_token(code)
    access_token = token_data.get("access_token")

    if not access_token:
        return None, None, "Failed to get access token from GitHub"

    # Step 2: Get GitHub user info
    user_data = await get_github_user(access_token)
    if not user_data or "id" not in user_data:
        return None, None, "Failed to get user info from GitHub"

    # Step 3: Prepare user fields
    github_id  = user_data["id"]
    email      = user_data.get("email") or f"{user_data.get('login')}@users.noreply.github.com"
    avatar_url = user_data.get("avatar_url") or ""

    # Step 4: Upsert user
    existing_user = await get_user_by_github_id(github_id)

    if existing_user:
        existing_user.access_token = access_token  # EncryptedString handles it ✅
        existing_user.email        = email
        existing_user.avatar_url   = avatar_url
        user = await update_user(existing_user)
    else:
        new_user = User(
            github_id=github_id,
            email=email,
            avatar_url=avatar_url,
            access_token=access_token  # EncryptedString handles it ✅
        )
        user = await create_user(new_user)

    # step 5 : generate jwt token 
    jwt_token = create_access_token({
        "user_id":   user.id,
        "github_id": user.github_id,
    })

    return user, jwt_token, None   