from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.db import Base

if TYPE_CHECKING:
    from app.db.models.user import User


class Repository(Base):
    __tablename__ = "repositories"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    github_repo_id: Mapped[int] = mapped_column(
        unique=True,
        index=True,
    )

    name: Mapped[str] = mapped_column()

    full_name: Mapped[str] = mapped_column()

    description: Mapped[str | None] = mapped_column(
        nullable=True
    )

    url: Mapped[str] = mapped_column()

    language: Mapped[str | None] = mapped_column(
        nullable=True
    )

    is_private: Mapped[bool] = mapped_column(
        default=False
    )

    created_at: Mapped[datetime] = mapped_column(
        default=func.now()
    )

    updated_at: Mapped[datetime] = mapped_column(
        default=func.now(),
        onupdate=func.now(),
    )

    owner_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    owner: Mapped["User"] = relationship(
        "User",
        back_populates="repositories",
    )