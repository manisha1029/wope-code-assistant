from cryptography.fernet import Fernet
from app.config.config import config
import sqlalchemy as sa
from sqlalchemy.types import TypeDecorator

class EncryptionHelper:
    def __init__(self, key: str):
        self.key = key
        self.fernet = Fernet(key)

    def encrypt(self, data: str) -> bytes:
        return self.fernet.encrypt(data.encode())

    def decrypt(self, encrypted_data: bytes) -> str:
        return self.fernet.decrypt(encrypted_data).decode()


# Single instance used everywhere ✅
encryption_helper = EncryptionHelper(config.ENCRYPTION_KEY)


class EncryptedString(TypeDecorator):
    """
    Custom SQLAlchemy type that auto encrypts on save
    and auto decrypts on load.
    Use it like: Column(EncryptedString)
    """
    impl = sa.LargeBinary
    cache_ok = True

    def process_bind_param(self, value, dialect):
        """Called before saving to DB — encrypts value"""
        if value is None:
            return None
        if isinstance(value, bytes):
            return value  # already encrypted
        return encryption_helper.encrypt(value)  # ✅ fixed typo

    def process_result_value(self, value, dialect):
        """Called after loading from DB — decrypts value"""
        if value is None:
            return None
        return encryption_helper.decrypt(value)