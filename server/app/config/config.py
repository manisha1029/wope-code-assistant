from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

class Config(BaseSettings):
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str
    GITHUB_REDIRECT_URI: str
    SECRET_KEY: str
    DATABASE_URL: str
    ENCRYPTION_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

config = Config()