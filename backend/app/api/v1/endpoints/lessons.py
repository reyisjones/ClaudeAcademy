from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class LessonSummary(BaseModel):
    slug: str
    title: str
    module: str
    difficulty: str
    duration_minutes: int


LESSONS: list[LessonSummary] = [
    LessonSummary(slug="intro-to-claude", title="Introduction to Claude", module="claude-fundamentals", difficulty="beginner", duration_minutes=10),
    LessonSummary(slug="api-basics", title="Claude API Basics", module="claude-fundamentals", difficulty="beginner", duration_minutes=15),
    LessonSummary(slug="system-prompts", title="System Prompts", module="prompt-engineering", difficulty="beginner", duration_minutes=12),
    LessonSummary(slug="few-shot-examples", title="Few-Shot Examples", module="prompt-engineering", difficulty="beginner", duration_minutes=15),
    LessonSummary(slug="chain-of-thought", title="Chain-of-Thought Prompting", module="prompt-engineering", difficulty="intermediate", duration_minutes=20),
    LessonSummary(slug="tool-use-intro", title="Introduction to Tool Use", module="ai-agents", difficulty="intermediate", duration_minutes=18),
    LessonSummary(slug="agentic-loops", title="Building Agentic Loops", module="ai-agents", difficulty="intermediate", duration_minutes=25),
    LessonSummary(slug="mcp-overview", title="MCP Overview", module="mcp", difficulty="intermediate", duration_minutes=15),
    LessonSummary(slug="mcp-server", title="Building an MCP Server", module="mcp", difficulty="intermediate", duration_minutes=30),
    LessonSummary(slug="rag-intro", title="RAG Fundamentals", module="rag-systems", difficulty="intermediate", duration_minutes=20),
]


@router.get("/", response_model=list[LessonSummary])
async def list_lessons(module: str | None = None):
    if module:
        return [l for l in LESSONS if l.module == module]
    return LESSONS


@router.get("/{slug}", response_model=LessonSummary)
async def get_lesson(slug: str):
    for lesson in LESSONS:
        if lesson.slug == slug:
            return lesson
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Lesson not found")
