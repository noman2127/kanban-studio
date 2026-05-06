"""
Configuration for the backend application
"""

from pathlib import Path
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # Frontend
    FRONTEND_BUILD_DIR: Path = Path(__file__).parent.parent / "frontend" / ".next"
    
    # API
    API_V1_STR: str = "/api/v1"
    
    # OpenRouter (for AI features in Part 7)
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = "openai/gpt-4o-mini"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
