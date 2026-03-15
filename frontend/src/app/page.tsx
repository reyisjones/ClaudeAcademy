import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import {
  AutoAwesome,
  Psychology,
  Hub,
  Storage,
  Visibility,
  Security,
  Assessment,
  Architecture,
  AccountTree,
} from "@mui/icons-material";

const MODULES = [
  {
    slug: "claude-fundamentals",
    title: "Claude Fundamentals",
    description: "API usage, models, tokens, context windows, and message formatting.",
    icon: AutoAwesome,
    color: "#d97706",
    difficulty: "Beginner",
    lessonCount: 8,
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    description: "System prompts, few-shot learning, chain-of-thought, and advanced techniques.",
    icon: Psychology,
    color: "#7c3aed",
    difficulty: "Beginner",
    lessonCount: 10,
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    description: "Tool use, agentic loops, memory, planning, and autonomous systems.",
    icon: Hub,
    color: "#2563eb",
    difficulty: "Intermediate",
    lessonCount: 9,
  },
  {
    slug: "mcp",
    title: "Model Context Protocol",
    description: "MCP servers, clients, transports, and building custom tools.",
    icon: Architecture,
    color: "#059669",
    difficulty: "Intermediate",
    lessonCount: 7,
  },
  {
    slug: "rag-systems",
    title: "RAG Systems",
    description: "Embeddings, vector databases, retrieval pipelines, and hybrid search.",
    icon: Storage,
    color: "#dc2626",
    difficulty: "Intermediate",
    lessonCount: 8,
  },
  {
    slug: "llm-observability",
    title: "LLM Observability",
    description: "Tracing, evaluation, monitoring AI applications in production.",
    icon: Visibility,
    color: "#0891b2",
    difficulty: "Advanced",
    lessonCount: 6,
  },
  {
    slug: "ai-safety",
    title: "AI Safety",
    description: "Alignment, red-teaming, guardrails, and responsible AI development.",
    icon: Security,
    color: "#be123c",
    difficulty: "Intermediate",
    lessonCount: 7,
  },
  {
    slug: "eval-frameworks",
    title: "Evaluation Frameworks",
    description: "Benchmarks, LLM-as-judge, automated evals, and quality pipelines.",
    icon: Assessment,
    color: "#9333ea",
    difficulty: "Advanced",
    lessonCount: 6,
  },
  {
    slug: "multi-agent",
    title: "Multi-Agent Orchestration",
    description: "Supervisor patterns, agent handoffs, parallelism, and coordination.",
    icon: AccountTree,
    color: "#b45309",
    difficulty: "Advanced",
    lessonCount: 8,
  },
];

const DIFFICULTY_COLORS: Record<string, "success" | "warning" | "error"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "white",
          py: { xs: 8, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Chip
              label="Powered by Anthropic Claude"
              sx={{ bgcolor: "rgba(217,119,6,0.2)", color: "#fbbf24", fontWeight: 600 }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Learn AI with{" "}
              <Box component="span" sx={{ color: "#fbbf24" }}>
                Claude
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: 600,
                color: "rgba(255,255,255,0.75)",
                fontWeight: 400,
              }}
            >
              Interactive lessons, code playgrounds, and hands-on labs for the
              Anthropic ecosystem. Built for engineers.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                href="/learn/claude-fundamentals"
                variant="contained"
                size="large"
                sx={{ bgcolor: "#d97706", "&:hover": { bgcolor: "#b45309" } }}
              >
                Start Learning
              </Button>
              <Button
                component={Link}
                href="https://github.com/your-org/claudetuts"
                variant="outlined"
                size="large"
                sx={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
              >
                View on GitHub
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Modules */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight={700}
          mb={1}
          sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" } }}
        >
          Learning Modules
        </Typography>
        <Typography
          textAlign="center"
          color="text.secondary"
          mb={6}
          fontSize="1.1rem"
        >
          From beginner to advanced — interactive, hands-on, and free.
        </Typography>

        <Grid container spacing={3}>
          {MODULES.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={mod.slug}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/learn/${mod.slug}`}
                    sx={{ height: "100%" }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${mod.color}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <IconComponent sx={{ color: mod.color, fontSize: 28 }} />
                      </Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        mb={1}
                      >
                        <Typography variant="h6" fontWeight={700} fontSize="1rem">
                          {mod.title}
                        </Typography>
                        <Chip
                          label={mod.difficulty}
                          size="small"
                          color={DIFFICULTY_COLORS[mod.difficulty]}
                          sx={{ ml: 1, flexShrink: 0 }}
                        />
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={2}
                      >
                        {mod.description}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {mod.lessonCount} lessons
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
