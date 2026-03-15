# Developer Setup Guide

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | >= 20 | [nodejs.org](https://nodejs.org) |
| Python | >= 3.12 | [python.org](https://python.org) |
| Docker Desktop | latest | [docker.com](https://docker.com) |
| Git | >= 2.40 | [git-scm.com](https://git-scm.com) |
| An Anthropic API Key | — | [console.anthropic.com](https://console.anthropic.com) |

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/claudetuts.git
cd claudetuts
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your `ANTHROPIC_API_KEY`. The other defaults work for local Docker development.

### 3. Start with Docker Compose (Recommended)

```bash
docker compose up --build
```

This starts:
- **Frontend** → http://localhost:3000
- **Backend API** → http://localhost:8000
- **API Docs** → http://localhost:8000/docs
- **Grafana** → http://localhost:3001 (admin/admin)
- **Prometheus** → http://localhost:9090
- **ChromaDB** → http://localhost:8008
- **PostgreSQL** → localhost:5432
- **Redis** → localhost:6379

### 4. Run Services Individually (Development)

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on http://localhost:3000 with Turbopack hot reload.

#### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### MCP Server

```bash
cd mcp
npm install
npm run dev
```

#### Agent Service

```bash
cd agents
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m agents.tutor_agent
```

## Running Tests

### Frontend Unit Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
pytest
pytest --cov=app --cov-report=html
```

### E2E Tests
```bash
# Ensure services are running first
docker compose up -d

cd tests
npm install
npx playwright install
npx playwright test
```

## Code Quality

### Frontend
```bash
cd frontend
npm run lint        # ESLint
npm run format      # Prettier
```

### Backend
```bash
cd backend
ruff check .        # Linting
ruff format .       # Formatting
```

## Database Migrations

```bash
cd backend
alembic revision --autogenerate -m "describe your change"
alembic upgrade head
```

## Connecting Claude Desktop to the MCP Server

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "claudetuts": {
      "command": "node",
      "args": ["/path/to/claudetuts/mcp/dist/index.js"],
      "env": {
        "BACKEND_URL": "http://localhost:8000"
      }
    }
  }
}
```

## Common Issues

### Port conflicts
If ports 3000, 8000, 5432, or 6379 are in use, stop the conflicting service or edit `docker-compose.yml` to use different ports.

### Missing API key
Ensure `ANTHROPIC_API_KEY` is set in `.env`. Chat, agent, and playground features require it.

### Docker build fails
Run `docker compose down -v` to clean volumes, then `docker compose up --build` again.
