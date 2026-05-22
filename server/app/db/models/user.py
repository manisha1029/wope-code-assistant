from sqlalchemy.orm import Mapped, mapped_column
from app.db.db import Base
from datetime import datetime, timezone

from app.auth.encyption import EncryptedString

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    github_id: Mapped[int] = mapped_column(unique=True, index=True)
    access_token: Mapped[str] = mapped_column(EncryptedString)
    avatar_url: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None)
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
        onupdate=lambda: datetime.now(timezone.utc).replace(tzinfo=None)
    )