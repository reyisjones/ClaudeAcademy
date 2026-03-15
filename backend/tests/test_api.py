"""Backend API integration tests."""
import pytest
from httpx import AsyncClient, ASGITransport

from app.main import app


@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as c:
        yield c


@pytest.mark.asyncio
async def test_health(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


@pytest.mark.asyncio
async def test_list_lessons(client: AsyncClient):
    response = await client.get("/api/v1/lessons/")
    assert response.status_code == 200
    lessons = response.json()
    assert len(lessons) > 0
    assert "slug" in lessons[0]
    assert "title" in lessons[0]
    assert "module" in lessons[0]


@pytest.mark.asyncio
async def test_get_lesson(client: AsyncClient):
    response = await client.get("/api/v1/lessons/intro-to-claude")
    assert response.status_code == 200
    lesson = response.json()
    assert lesson["slug"] == "intro-to-claude"


@pytest.mark.asyncio
async def test_get_lesson_not_found(client: AsyncClient):
    response = await client.get("/api/v1/lessons/does-not-exist")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_playground_run_python(client: AsyncClient):
    response = await client.post(
        "/api/v1/playground/run",
        json={"code": "print('hello world')", "language": "python"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "hello world" in data["output"]


@pytest.mark.asyncio
async def test_playground_rejects_large_code(client: AsyncClient):
    response = await client.post(
        "/api/v1/playground/run",
        json={"code": "x" * 20_000, "language": "python"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_playground_rejects_unsupported_language(client: AsyncClient):
    response = await client.post(
        "/api/v1/playground/run",
        json={"code": "console.log('hi')", "language": "javascript"},
    )
    assert response.status_code == 422
