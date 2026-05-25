from sqlalchemy.orm import Mapped, mapped_column
from app.db.db import Base

class Repository(Base):
    __tablename__ = "repositories"
    id: Mapped[int]= mapped_column(primary_key=True, index=True)
    github_repo_id: Mapped[int] = mapped_column(unique=True, index=True)
    name: Mapped[str] = mapped_column(String)
    full_name: Mapped[str] = mapped_column(String)      
    description: Mapped[str] = mapped_column(String, nullable=True)
    url: Mapped[str] = mapped_column(String)
    language: Mapped[str] = mapped_column(String, nullable=True)
    is_private: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())
    
    # Foreign key → belongs to a user
    owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    owner: Mapped["User"] = relationship("User", back_populates="repositories")
    