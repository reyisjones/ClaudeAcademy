# ClaudeAcademy — Open-Source AI Learning Platform

An interactive, open-source educational web platform for learning AI technologies, with a focus on the **Anthropic / Claude ecosystem**. Built in the spirit of Brilliant.org — learn through hands-on exercises, visual explanations, and guided labs.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Python](https://img.shields.io/badge/Python-3.12-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

---

## Learning Modules

| Module | Topics |
|---|---|
| Claude Fundamentals | API, models, tokens, context windows |
| Prompt Engineering | System prompts, few-shot, chain-of-thought |
| AI Agents | Tool use, loops, memory, planning |
| Model Context Protocol | MCP servers, clients, transports |
| RAG Systems | Embeddings, vector DBs, retrieval pipelines |
| LLM Observability | Tracing, evals, monitoring |
| AI Safety | Alignment, red-teaming, guardrails |
| Evaluation Frameworks | Benchmarks, LLM-as-judge, automated evals |
| AI App Architecture | Patterns, deployment, scaling |
| Multi-Agent Orchestration | Supervisor patterns, handoffs, parallelism |

---

## Tech Stack

### Frontend
- **Next.js 15** (App Router + Turbopack)
- **React 19**
- **TypeScript 5**
- **Material UI (MUI) v6**
- **TailwindCSS v4**

### Backend
- **Python 3.12 + FastAPI**
- **Anthropic SDK**
- **LangChain / LangGraph**
- **ChromaDB / pgvector** (vector search)
- **PostgreSQL** (relational DB)
- **Redis** (caching / sessions)

### AI & Agents
- **Anthropic Claude API**
- **Model Context Protocol (MCP)**
- **LangGraph** (agent orchestration)
- **OpenTelemetry** (tracing)

### Infrastructure
- **Docker / Docker Compose** (local dev)
- **GitHub Actions** (CI/CD)
- **Azure / AWS** (cloud deployment)
- **Terraform** (IaC)
- **Prometheus + Grafana** (observability)

---

## Project Structure

```
claudetuts/
├── frontend/          # Next.js 15 web application
├── backend/           # FastAPI Python backend
├── agents/            # AI agent implementations
├── mcp/               # MCP server modules
├── lessons/           # Lesson content (MDX + JSON)
├── infra/             # Docker, Terraform, CI/CD
├── docs/              # Architecture & developer docs
└── tests/             # E2E tests (Playwright)
```

---

## Quick Start

### Prerequisites
- Node.js >= 20
- Python >= 3.12
- Docker & Docker Compose
- An Anthropic API key

### Local Development

```bash
# Clone the repo
git clone https://github.com/your-org/claudetuts.git
cd claudetuts

# Copy environment variables
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Start all services with Docker Compose
docker compose up --build

# Or run individually:

# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Development Phases

| Phase | Description |
|---|---|
| **Phase 1** | MVP learning platform — static lessons, navigation |
| **Phase 2** | AI interactive lessons — code playgrounds, quizzes |
| **Phase 3** | Agent-driven tutoring — Claude-powered hints & feedback |
| **Phase 4** | RAG knowledge base — searchable AI curriculum |
| **Phase 5** | Enterprise deployment — scaling, auth, analytics |

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](SECURITY.md) for our responsible disclosure policy.

## License

[MIT](LICENSE) © ClaudeTuts Contributors
