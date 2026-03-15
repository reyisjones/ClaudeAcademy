# Implementation Roadmap

## Phase 1 — MVP Learning Platform

**Goal:** Functional website with static lessons, navigation, and module listing.

### Deliverables
- [ ] Next.js 15 frontend with MUI theme
- [ ] Homepage with module cards
- [ ] Module detail pages
- [ ] Lesson viewer (MDX rendering)
- [ ] FastAPI backend with health check
- [ ] Docker Compose local dev environment
- [ ] GitHub Actions CI (lint + test)
- [ ] 3 complete lessons across 2 modules

### Tests
- Frontend: component tests for Navbar, ModuleCard, LessonViewer
- Backend: health endpoint test
- CI: lint + type-check must pass on every PR

### CI Requirements
- ESLint + TypeScript strict mode
- Ruff Python linting
- All tests passing before merge to `main`

---

## Phase 2 — AI Interactive Lessons

**Goal:** Code playgrounds, quizzes, and streaming AI chat in lessons.

### Deliverables
- [ ] Monaco code editor playground
- [ ] Sandboxed Python execution endpoint
- [ ] Quiz component with scoring and explanations
- [ ] Streaming chat widget powered by Claude
- [ ] 10+ complete lessons across 5 modules
- [ ] Lesson progress tracking (localStorage)
- [ ] Module completion badges

### Tests
- Playground: security tests (no code injection/escape)
- Quiz: score calculation, explanation rendering
- Chat: streaming response rendering
- E2E: complete a lesson flow end-to-end

---

## Phase 3 — Agent-Driven Tutoring

**Goal:** Claude-powered AI tutor that provides hints, feedback, and personalized guidance.

### Deliverables
- [ ] LangGraph Tutor Agent with tool use
- [ ] Tutor chat interface in lesson sidebar
- [ ] Hint system for exercises (progressive disclosure)
- [ ] Code review feedback from Claude
- [ ] Agent memory (Redis-backed user context)
- [ ] Lesson generation pipeline (AI-assisted)

### Tests
- Agent: tool call routing tests
- Tutor: hint quality evaluation
- Memory: session persistence tests
- Performance: agent response < 5s p95

---

## Phase 4 — RAG Knowledge Base

**Goal:** Searchable lesson content with semantic retrieval powering AI answers.

### Deliverables
- [ ] ChromaDB vector store with lesson embeddings
- [ ] Lesson indexing pipeline
- [ ] Semantic search API
- [ ] "Ask AI" global search with RAG answers
- [ ] Citation of source lessons in AI responses
- [ ] Automated lesson ingestion from MDX files

### Tests
- RAG: retrieval recall tests on known queries
- Search: relevance ranking tests
- Indexing: pipeline idempotency tests

---

## Phase 5 — Enterprise Deployment & Scaling

**Goal:** Production-ready platform deployable to Azure/AWS with auth, analytics, and monitoring.

### Deliverables
- [ ] User authentication (NextAuth + PostgreSQL)
- [ ] User progress persistence in database
- [ ] Terraform IaC for Azure Container Apps
- [ ] GitHub Actions deploy workflow
- [ ] OpenTelemetry tracing across all services
- [ ] Grafana dashboards for key metrics
- [ ] Rate limiting on API endpoints
- [ ] Load testing (k6)
- [ ] Runbook for on-call operations

### Tests
- Auth: login/logout/session tests
- Load: 1,000 concurrent users benchmark
- Security: OWASP scanning (DAST)
- Infra: Terraform plan validation in CI
