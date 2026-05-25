from sqlalchemy import select
from app.db.db import AsyncSessionLocal
from app.db.models.user import User

async def get_user_by_github_id(github_id: int):
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.github_id == github_id))
        return result.scalars().first()

async def create_user(user: User):
    async with AsyncSessionLocal() as session:
        print("this is user ",user)
        session.add(user)
        await session.commit()
        return user

async def update_user(user: User):
    async with AsyncSessionLocal() as session:
        await session.merge(user)
        await session.commit()
        return user 