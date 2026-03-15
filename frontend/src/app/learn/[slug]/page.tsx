import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const MODULES: Record<string, { title: string; description: string }> = {
  "claude-fundamentals": {
    title: "Claude Fundamentals",
    description: "Master the Claude API, understand models, tokens, and message formatting.",
  },
  "prompt-engineering": {
    title: "Prompt Engineering",
    description: "Learn to write effective prompts using system messages, few-shot examples, and chain-of-thought.",
  },
  "ai-agents": {
    title: "AI Agents",
    description: "Build autonomous agents with tool use, memory, and planning capabilities.",
  },
  "mcp": {
    title: "Model Context Protocol",
    description: "Build and deploy MCP servers and clients to extend Claude's capabilities.",
  },
  "rag-systems": {
    title: "RAG Systems",
    description: "Build retrieval-augmented generation pipelines with vector databases.",
  },
  "llm-observability": {
    title: "LLM Observability",
    description: "Monitor, trace, and evaluate your AI applications in production.",
  },
  "ai-safety": {
    title: "AI Safety",
    description: "Understand alignment, implement guardrails, and practice responsible AI.",
  },
  "eval-frameworks": {
    title: "Evaluation Frameworks",
    description: "Measure and improve AI system quality with automated evaluation.",
  },
  "multi-agent": {
    title: "Multi-Agent Orchestration",
    description: "Design and build complex multi-agent systems with Claude.",
  },
};

export async function generateStaticParams() {
  return Object.keys(MODULES).map((slug) => ({ slug }));
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const module = MODULES[params.slug];

  if (!module) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4">Module not found</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <Box sx={{ bgcolor: "primary.main", color: "white", py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 2, "& *": { color: "rgba(255,255,255,0.7)" } }}
          >
            <MuiLink component={Link} href="/learn" underline="hover">
              Learn
            </MuiLink>
            <Typography sx={{ color: "white" }}>{module.title}</Typography>
          </Breadcrumbs>
          <Typography variant="h3" fontWeight={800} mb={2}>
            {module.title}
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>
            {module.description}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography color="text.secondary">
          Lessons for this module are coming soon. Check back or contribute on GitHub!
        </Typography>
      </Container>
    </Box>
  );
}
