from fastapi import APIRouter

from app.api.v1.endpoints import chat, playground, lessons, rag

api_router = APIRouter()

api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(playground.router, prefix="/playground", tags=["playground"])
api_router.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
api_router.include_router(rag.router, prefix="/rag", tags=["rag"])
