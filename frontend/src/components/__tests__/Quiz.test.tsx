import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Quiz from "@/components/Quiz";

const mockQuestions = [
  {
    id: "q1",
    question: "What company created Claude?",
    options: ["OpenAI", "Anthropic", "Google", "Meta"],
    correctIndex: 1,
    explanation: "Claude is built by Anthropic.",
  },
  {
    id: "q2",
    question: "What is the Messages API used for?",
    options: ["File storage", "Image generation", "Text completion", "Database queries"],
    correctIndex: 2,
    explanation: "The Messages API is Claude's primary interface for text generation.",
  },
];

describe("Quiz component", () => {
  it("renders all questions", () => {
    render(<Quiz questions={mockQuestions} />);
    expect(screen.getByText(/What company created Claude/)).toBeInTheDocument();
    expect(screen.getByText(/What is the Messages API/)).toBeInTheDocument();
  });

  it("submit button is disabled until all questions answered", () => {
    render(<Quiz questions={mockQuestions} />);
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    expect(submitBtn).toBeDisabled();
  });

  it("shows score after submission", async () => {
    render(<Quiz questions={mockQuestions} />);

    // Answer both questions correctly
    fireEvent.click(screen.getAllByRole("radio")[1]); // Anthropic
    fireEvent.click(screen.getAllByRole("radio")[6]); // Text completion

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/2\/2 correct/)).toBeInTheDocument();
    });
  });

  it("allows retry after submission", async () => {
    render(<Quiz questions={mockQuestions} />);

    fireEvent.click(screen.getAllByRole("radio")[0]);
    fireEvent.click(screen.getAllByRole("radio")[4]);
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Try Again/i }));
    expect(screen.getByRole("button", { name: /Submit/i })).toBeDisabled();
  });
});
