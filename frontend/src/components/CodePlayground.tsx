"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <Box sx={{ height: 300, bgcolor: "#1e1e1e", borderRadius: 1 }} />,
});

interface CodePlaygroundProps {
  defaultCode: string;
  language?: string;
  title?: string;
  description?: string;
}

export default function CodePlayground({
  defaultCode,
  language = "python",
  title = "Code Playground",
  description,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runCode = async () => {
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const res = await fetch("/api/playground/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden", my: 3 }}>
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: "#1e1e1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="body2" fontWeight={600} sx={{ color: "#d4d4d4" }}>
            {title}
          </Typography>
          <Chip
            label={language}
            size="small"
            sx={{ bgcolor: "#2d2d2d", color: "#9cdcfe", fontSize: "0.7rem", height: 20 }}
          />
        </Stack>
        <Button
          onClick={runCode}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} /> : <PlayArrowIcon />}
          variant="contained"
          size="small"
          sx={{ bgcolor: "#16a34a", "&:hover": { bgcolor: "#15803d" } }}
        >
          {loading ? "Running..." : "Run"}
        </Button>
      </Box>

      {description && (
        <Box sx={{ px: 2, py: 1, bgcolor: "#2d2d2d" }}>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            {description}
          </Typography>
        </Box>
      )}

      {/* Editor */}
      <MonacoEditor
        height={300}
        language={language}
        value={code}
        onChange={(val) => setCode(val ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
          fontLigatures: true,
          padding: { top: 12, bottom: 12 },
        }}
      />

      {/* Output */}
      {(output !== null || error) && (
        <Box sx={{ borderTop: "1px solid #333", bgcolor: "#0d1117" }}>
          <Typography
            variant="caption"
            sx={{ px: 2, py: 1, display: "block", color: "#6b7280", borderBottom: "1px solid #1f2937" }}
          >
            Output
          </Typography>
          {error ? (
            <Alert severity="error" sx={{ m: 1 }}>
              {error}
            </Alert>
          ) : (
            <Box
              component="pre"
              sx={{
                m: 0,
                px: 2,
                py: 1.5,
                fontFamily: "var(--font-fira-code), monospace",
                fontSize: "0.85rem",
                color: "#d4d4d4",
                overflowX: "auto",
                maxHeight: 200,
                overflowY: "auto",
              }}
            >
              {output}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}
