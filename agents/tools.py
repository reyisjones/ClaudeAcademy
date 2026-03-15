"""Agent tool implementations."""
import httpx
from app.core.config import settings  # type: ignore

BACKEND_URL = "http://localhost:8000"


def search_lessons(query: str) -> dict:
    """Search lesson database for content matching the query."""
    try:
        with httpx.Client(timeout=10) as client:
            res = client.post(
                f"{BACKEND_URL}/api/v1/rag/query",
                json={"collection": "lessons", "query": query, "n_results": 5},
            )
            if res.is_success:
                return res.json()
    except Exception as e:
        return {"error": str(e), "documents": []}
    return {"documents": []}


def run_code_snippet(code: str) -> dict:
    """Execute a Python code snippet safely."""
    try:
        with httpx.Client(timeout=15) as client:
            res = client.post(
                f"{BACKEND_URL}/api/v1/playground/run",
                json={"code": code, "language": "python"},
            )
            if res.is_success:
                return res.json()
    except Exception as e:
        return {"error": str(e), "output": ""}
    return {"output": "", "error": "Execution failed"}


def get_module_info(module_slug: str) -> dict:
    """Return metadata about a learning module."""
    MODULES = {
        "claude-fundamentals": {"title": "Claude Fundamentals", "lessons": 8, "difficulty": "beginner"},
        "prompt-engineering": {"title": "Prompt Engineering", "lessons": 10, "difficulty": "beginner"},
        "ai-agents": {"title": "AI Agents", "lessons": 9, "difficulty": "intermediate"},
        "mcp": {"title": "Model Context Protocol", "lessons": 7, "difficulty": "intermediate"},
        "rag-systems": {"title": "RAG Systems", "lessons": 8, "difficulty": "intermediate"},
        "llm-observability": {"title": "LLM Observability", "lessons": 6, "difficulty": "advanced"},
        "ai-safety": {"title": "AI Safety", "lessons": 7, "difficulty": "intermediate"},
        "eval-frameworks": {"title": "Evaluation Frameworks", "lessons": 6, "difficulty": "advanced"},
        "multi-agent": {"title": "Multi-Agent Orchestration", "lessons": 8, "difficulty": "advanced"},
    }
    return MODULES.get(module_slug, {"error": f"Module '{module_slug}' not found"})
