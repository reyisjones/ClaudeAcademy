from typing import AsyncIterator
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import anthropic

from app.core.config import settings

router = APIRouter()
client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)


class Message(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1, max_length=100_000)


class ChatRequest(BaseModel):
    messages: list[Message] = Field(..., min_length=1, max_length=50)
    system: str | None = Field(None, max_length=10_000)
    model: str = "claude-opus-4-5"
    max_tokens: int = Field(default=1024, ge=1, le=8192)
    stream: bool = False


class ChatResponse(BaseModel):
    content: str
    model: str
    usage: dict


async def _stream_response(request: ChatRequest) -> AsyncIterator[str]:
    async with client.messages.stream(
        model=request.model,
        max_tokens=request.max_tokens,
        system=request.system or "You are a helpful AI tutor for the ClaudeTuts learning platform.",
        messages=[m.model_dump() for m in request.messages],
    ) as stream:
        async for text in stream.text_stream:
            yield f"data: {text}\n\n"
    yield "data: [DONE]\n\n"


@router.post("/")
async def chat(request: ChatRequest):
    if request.stream:
        return StreamingResponse(
            _stream_response(request),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )

    try:
        response = await client.messages.create(
            model=request.model,
            max_tokens=request.max_tokens,
            system=request.system or "You are a helpful AI tutor for the ClaudeTuts learning platform.",
            messages=[m.model_dump() for m in request.messages],
        )
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Anthropic API error: {e.message}")

    return ChatResponse(
        content=response.content[0].text,
        model=response.model,
        usage={"input_tokens": response.usage.input_tokens, "output_tokens": response.usage.output_tokens},
    )
