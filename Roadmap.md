Here’s a practical **Anthropic / Claude self-study pack** for your profile as a software engineer building AI, automation, and enterprise solutions.

## 1) What’s free right now

As of **March 15, 2026**, Anthropic’s official **Learn / Anthropic Academy** page includes free learning resources and links to courses on topics like **AI Fluency, API development, Model Context Protocol (MCP), and Claude Code**. The site also states that learners can **earn certificates upon completion**. ([Anthropic][1])

The strongest official free resources I found are:

* **Anthropic Academy / Learn** for structured learning paths and featured courses. ([Anthropic][1])
* **AI Fluency: Framework & Foundations** for general AI literacy, prompting, discernment, and safe use. ([Anthropic][2])
* **Build with Claude** for API docs, SDKs, prompt engineering, tool use, evals, RAG, vision, MCP, and Claude Code. ([Anthropic][3])
* **Anthropic’s YouTube channel** for official video material. ([YouTube][4])
* **DeepLearning.AI’s Claude Code short course**, which is currently listed as free during the platform beta. ([DeepLearning.ai][5])

## 2) Best GitHub projects to study first

These are the highest-value repos for learning by doing:

**1. claude-quickstarts**
Best for starting fast with deployable app examples using the Claude API. ([GitHub][6])

**2. courses**
Anthropic’s educational repo with multiple courses and a suggested learning order. ([GitHub][7])

**3. prompt-eng-interactive-tutorial**
Best official prompt engineering course repo; it teaches prompt structure, common failure modes, strengths/weaknesses, and how to build prompts from scratch. ([GitHub][8])

**4. claude-cookbooks**
Best for practical notebooks, recipes, and code snippets you can adapt into real systems. ([GitHub][9])

**5. claude-code**
Best for agentic coding workflows, terminal-based coding assistance, Git integration, and automation patterns. Anthropic’s GitHub org describes it as an agentic coding tool that understands your codebase and helps with routine engineering tasks. ([GitHub][10])

**6. skills**
Useful if you want to study reusable task-specific instructions and agent behavior patterns; it is one of the most prominent repos in Anthropic’s org. ([GitHub][10])

## 3) Recommended study roadmap for you

Because you already work with **C#, Azure, CI/CD, observability, security, and agent automation**, I would not start with beginner-only material. I’d use this order:

### Phase 1 — Foundation

Start with **AI Fluency** to align on terminology, safe use, prompting basics, and evaluation mindset. Even for experienced engineers, this gives a shared framework Anthropic uses in its learning ecosystem. ([Anthropic][2])

### Phase 2 — Prompting

Go through the **interactive prompt engineering tutorial** and practice creating prompts for:

* incident RCA summaries
* log triage
* architecture reviews
* code review recommendations
* enterprise support agents.
  That repo is specifically designed to teach prompt structure and common failure patterns. ([GitHub][8])

### Phase 3 — API development

Move into **Build with Claude**, especially:

* Messages API
* prompt caching
* SDKs
* evals
* tool use
* RAG
* vision. ([Anthropic][3])

### Phase 4 — Agent workflows

Then focus on:

* **MCP**
* **Claude Code**
* **tool use**
* **skills**.
  Anthropic’s official learning hub explicitly highlights these areas, which strongly suggests they are core to their current ecosystem direction. ([Anthropic][3])

### Phase 5 — Production patterns

Study:

* cookbooks
* quickstarts
* eval workflows
* prompt caching
* governance-oriented examples. ([GitHub][6])

For your background, I’d spend about:

* **20%** on AI fluency/prompting
* **30%** on APIs and evaluation
* **30%** on agent workflows/MCP/Claude Code
* **20%** on enterprise deployment patterns

## 4) Best free YouTube and web resources

The safest starting point is the **official Anthropic YouTube channel**. ([YouTube][4])

Then use Anthropic’s own learning hub for official material on:

* Claude Code
* prompt engineering
* tool use
* MCP
* evals
* RAG
* vision
* computer use. ([Anthropic][3])

A strong external resource is the **DeepLearning.AI Claude Code short course**. It covers practical workflows like codebase understanding, feature work, debugging, GitHub integration, hooks, dashboard refactoring, and Figma-to-web workflows. ([DeepLearning.ai][5])

## 5) Claude vs OpenAI vs Azure AI — architecture comparison

Here’s the practical engineering view.

### Anthropic / Claude

Best fit when you want:

* strong focus on **Claude Code**
* strong **MCP** ecosystem emphasis
* official learning around **tool use, evals, RAG, extended thinking, and skills**
* direct developer education around agentic workflows. ([Anthropic][3])

### OpenAI

Best fit when you want:

* broad ecosystem reach
* general-purpose model integration across many app types
* strong tool ecosystem and enterprise usage patterns
  This part is a general architectural observation rather than something I’m deriving from the Anthropic sources.

### Azure AI

Best fit when you want:

* enterprise governance
* regional hosting controls
* identity integration
* monitoring, networking, and compliance alignment with Microsoft environments
  This is also a general architectural observation.

### My recommendation for your profile

Since you work heavily in **Azure, Microsoft ecosystems, enterprise deployment, observability, and compliance**, the strongest real-world pattern is likely:

* **Frontend / app layer** in your preferred stack
* **Backend orchestration** in Python or C#
* **Azure-hosted infrastructure** for enterprise controls
* **Claude or another model provider behind an abstraction layer**
* **evaluation + telemetry + governance** built in from day one

That gives you flexibility to compare Claude, OpenAI, or Azure-hosted model options without locking your app architecture too early.

## 6) Best practical project for you

Given your interests in enterprise AI, healthcare/government/business solutions, and CI/CD, this is the best learning project:

### Project: Enterprise AI Support Copilot

Build an AI assistant that can:

* answer policy and technical questions
* summarize documents
* draft RCA/postmortem notes
* review code changes
* query internal knowledge
* trigger tools for ticketing, documentation, or deployment workflows

### Suggested architecture

* **Frontend:** React or Vue
* **Backend:** Python FastAPI or C# ASP.NET Core
* **Model layer:** provider abstraction with Claude as one backend
* **Knowledge layer:** RAG over Markdown, PDFs, docs
* **Tool layer:** GitHub, ticketing, file search, metrics query tools
* **Evaluation layer:** prompt tests and regression evals
* **Observability:** Azure Monitor / Application Insights
* **Security:** Key Vault, managed identity, RBAC, audit logs

### Why this is the right project

It maps directly to the areas Anthropic highlights most in its current learning materials:

* API development
* RAG
* tool use
* evals
* MCP
* Claude Code
* enterprise usage patterns. ([Anthropic][3])

## 7) 30-day study plan

### Week 1

* Anthropic Learn overview
* AI Fluency course
* Anthropic YouTube channel
* skim Build with Claude sections. ([Anthropic][1])

### Week 2

* prompt-eng-interactive-tutorial
* first exercises from courses repo
* create 10 prompts for your real engineering workflows. ([GitHub][7])

### Week 3

* claude-quickstarts
* claude-cookbooks
* build one working prototype with API, tool use, and simple RAG. ([GitHub][6])

### Week 4

* Claude Code
* MCP materials
* evals and prompt caching
* production hardening notes. ([Anthropic][3])

## 8) What I would prioritize first for you

For **Reyis-level enterprise engineering work**, I’d prioritize this exact order:

1. **Prompt engineering tutorial**
2. **Build with Claude: APIs, tool use, evals**
3. **claude-quickstarts**
4. **claude-cookbooks**
5. **Claude Code course + official docs**
6. **MCP courses and integration patterns** ([GitHub][8])

That order gets you from fundamentals to something you can actually deploy in an enterprise-like environment.

## 9) Bottom line

There are **real free Anthropic learning resources**, and the best ones are not just videos. The strongest free stack is:

* **Anthropic Academy / Learn**
* **AI Fluency**
* **Build with Claude**
* **Anthropic GitHub repos**
* **Anthropic YouTube**
* **DeepLearning.AI Claude Code course** ([Anthropic][1])

[1]: https://www.anthropic.com/learn "AI Learning Resources & Guides from Anthropic \ Anthropic"
[2]: https://www.anthropic.com/learn/claude-for-you "AI Fluency: Framework and Foundations \ Anthropic"
[3]: https://www.anthropic.com/learn/build-with-claude "Anthropic Academy: Claude API Development Guide \ Anthropic"
[4]: https://www.youtube.com/%40anthropic-ai?utm_source=chatgpt.com "Anthropic"
[5]: https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/ "Claude Code: A Highly Agentic Coding Assistant - DeepLearning.AI"
[6]: https://github.com/anthropics/claude-quickstarts?utm_source=chatgpt.com "anthropics/claude-quickstarts: A collection of projects ..."
[7]: https://github.com/anthropics/courses?utm_source=chatgpt.com "Anthropic's educational courses"
[8]: https://github.com/anthropics/prompt-eng-interactive-tutorial?utm_source=chatgpt.com "Anthropic's Prompt Engineering Interactive Tutorial"
[9]: https://github.com/anthropics/claude-cookbooks?utm_source=chatgpt.com "anthropics/claude-cookbooks"
[10]: https://github.com/anthropics "Anthropic · GitHub"
