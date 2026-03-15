from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pathlib import Path

_env_path = Path(__file__).resolve().parent.parent.parent / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=str(_env_path), env_file_encoding="utf-8", extra="ignore")

    # App
    app_name: str = "ClaudeTuts API"
    debug: bool = False
    environment: str = "development"

    # Anthropic
    anthropic_api_key: str = ""

    # Database
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/claudetuts"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # Vector DB
    chroma_host: str = "localhost"
    chroma_port: int = 8008

    # Security
    allowed_origins: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    allowed_hosts: List[str] = ["*"]
    secret_key: str = "change-me-in-production"

    # Observability
    otel_exporter_otlp_endpoint: str = "http://localhost:4318"
    otel_service_name: str = "claudetuts-backend"


settings = Settings()
