#!/usr/bin/env node
/**
 * ClaudeTuts MCP Server
 *
 * Exposes learning platform tools via the Model Context Protocol,
 * allowing Claude to search lessons, run code, and look up content.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

const server = new McpServer({
  name: "claudetuts",
  version: "0.1.0",
});

// Tool: search_lessons
server.tool(
  "search_lessons",
  "Search ClaudeTuts lessons for content matching a query",
  { query: z.string().min(1).max(500).describe("Topic or question to search for") },
  async ({ query }) => {
    const res = await fetch(`${BACKEND_URL}/api/v1/rag/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: "lessons", query, n_results: 5 }),
    });

    if (!res.ok) {
      return { content: [{ type: "text", text: `Search failed: ${res.statusText}` }] };
    }

    const data = await res.json() as { documents: string[] };
    const formatted = data.documents
      .map((doc: string, i: number) => `${i + 1}. ${doc}`)
      .join("\n\n");

    return { content: [{ type: "text", text: formatted || "No results found." }] };
  }
);

// Tool: list_modules
server.tool(
  "list_modules",
  "List all available learning modules on ClaudeTuts",
  {},
  async () => {
    const modules = [
      "claude-fundamentals", "prompt-engineering", "ai-agents",
      "mcp", "rag-systems", "llm-observability",
      "ai-safety", "eval-frameworks", "multi-agent",
    ];
    return {
      content: [{
        type: "text",
        text: `Available modules:\n${modules.map(m => `- ${m}`).join("\n")}`,
      }],
    };
  }
);

// Tool: get_lesson
server.tool(
  "get_lesson",
  "Get details about a specific lesson by slug",
  { slug: z.string().min(1).max(200).describe("The lesson slug identifier") },
  async ({ slug }) => {
    const res = await fetch(`${BACKEND_URL}/api/v1/lessons/${encodeURIComponent(slug)}`);

    if (res.status === 404) {
      return { content: [{ type: "text", text: `Lesson '${slug}' not found.` }] };
    }
    if (!res.ok) {
      return { content: [{ type: "text", text: "Failed to fetch lesson." }] };
    }

    const lesson = await res.json();
    return {
      content: [{
        type: "text",
        text: JSON.stringify(lesson, null, 2),
      }],
    };
  }
);

// Resource: lesson content
server.resource(
  "lesson",
  "lesson://{slug}",
  async (uri) => {
    const slug = uri.pathname.replace(/^\/\//, "");
    const res = await fetch(`${BACKEND_URL}/api/v1/lessons/${encodeURIComponent(slug)}`);

    if (!res.ok) {
      throw new Error(`Lesson '${slug}' not found`);
    }

    const lesson = await res.json();
    return {
      contents: [{
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(lesson, null, 2),
      }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ClaudeTuts MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
