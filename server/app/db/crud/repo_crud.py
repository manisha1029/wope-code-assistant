from app.db.db import AsyncSessionLocal
from sqlalchemy import select


async def save_repo(repo):
    async with AsyncSessionLocal() as session:
        session.add(repo)
        await session.commit()
        return repo
