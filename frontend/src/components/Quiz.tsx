"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Collapse,
  Alert,
  LinearProgress,
  Chip,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
}

export default function Quiz({ title = "Knowledge Check", questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleAnswer = (questionId: string, index: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanation({});
  };

  const score = submitted
    ? questions.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <Paper variant="outlined" sx={{ p: 3, my: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        {submitted && (
          <Chip
            label={`${score}/${questions.length} correct`}
            color={score === questions.length ? "success" : score >= questions.length / 2 ? "warning" : "error"}
            icon={score === questions.length ? <CheckCircleIcon /> : undefined}
          />
        )}
      </Stack>

      {!submitted && (
        <Box mb={2}>
          <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 4 }} />
          <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
            {Object.keys(answers).length} / {questions.length} answered
          </Typography>
        </Box>
      )}

      <Stack spacing={3}>
        {questions.map((q, idx) => {
          const isCorrect = submitted && answers[q.id] === q.correctIndex;
          const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.correctIndex;

          return (
            <Box key={q.id}>
              <Typography variant="body1" fontWeight={600} mb={1.5}>
                {idx + 1}. {q.question}
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={answers[q.id] ?? ""}
                  onChange={(e) => handleAnswer(q.id, Number(e.target.value))}
                >
                  {q.options.map((option, optIdx) => {
                    const isCorrectOption = submitted && optIdx === q.correctIndex;
                    const isSelectedWrong = submitted && answers[q.id] === optIdx && optIdx !== q.correctIndex;

                    return (
                      <FormControlLabel
                        key={optIdx}
                        value={optIdx}
                        control={<Radio disabled={submitted} size="small" />}
                        label={option}
                        sx={{
                          borderRadius: 1,
                          px: 1,
                          py: 0.25,
                          mx: 0,
                          bgcolor: isCorrectOption
                            ? "success.light"
                            : isSelectedWrong
                            ? "error.light"
                            : "transparent",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.9rem",
                          },
                        }}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>

              {submitted && (
                <Box mt={1}>
                  <Button
                    size="small"
                    onClick={() =>
                      setShowExplanation((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {showExplanation[q.id] ? "Hide" : "Show"} explanation
                  </Button>
                  <Collapse in={showExplanation[q.id]}>
                    <Alert
                      severity={isCorrect ? "success" : "info"}
                      icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                      sx={{ mt: 1, fontSize: "0.85rem" }}
                    >
                      {q.explanation}
                    </Alert>
                  </Collapse>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>

      <Box mt={3} display="flex" gap={2}>
        {!submitted ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Submit Answers
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleReset}>
            Try Again
          </Button>
        )}
      </Box>
    </Paper>
  );
}
