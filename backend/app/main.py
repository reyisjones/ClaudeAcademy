from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.config import settings
from app.core.telemetry import setup_telemetry
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_telemetry()
    yield


app = FastAPI(
    title="ClaudeTuts API",
    description="Backend API for the ClaudeTuts AI learning platform",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.allowed_hosts,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health():
    return {"status": "ok", "version": "0.1.0"}
