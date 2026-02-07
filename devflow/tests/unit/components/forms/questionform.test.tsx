import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuestionForm from "@/components/forms/QuestionForm";
import { MockEditor, mockRouter, resetAllMocks } from "@/tests/mocks";
import userEvent from "@testing-library/user-event";
import { createQuestion } from "@/lib/actions/question.action";
import { toast } from "@/hooks/use-toast";

jest.mock("@/components/editor", () => MockEditor);
jest.mock("@/lib/actions/question.action", () => ({
  createQuestion: jest.fn(),
}));

const mockCreateQuestion = createQuestion as jest.MockedFunction<typeof createQuestion>;

const user = userEvent.setup();

describe("QuestionForm Component", () => {
  beforeEach(() => {
    resetAllMocks();
    mockCreateQuestion.mockClear();
  });

  describe("Rendering", () => {
    it("should render all form fields", async () => {
      render(<QuestionForm />);

      expect(screen.getByLabelText(/question title/i)).toBeInTheDocument();
      expect(await screen.findByLabelText(/Detailed explanation of your problem/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Add tags/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Ask a question/i })).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("should show validation errors when form is submitted empty", async () => {
      render(<QuestionForm />);

      const submitBtn = screen.getByRole("button", {
        name: /ask a question/i,
      });

      await user.click(submitBtn);

      expect(await screen.findByText(/title must be at least 5 characters/i)).toBeInTheDocument();
      expect(await screen.findByText(/minimum of 100 characters/i)).toBeInTheDocument();
      expect(await screen.findByText(/add at least one tag/i)).toBeInTheDocument();
    });
  });

  describe("Submission", () => {
    it("should submit form successfully with valid data", async () => {
      mockCreateQuestion.mockResolvedValue({
        success: true,
        data: {
          _id: "123",
          title: "",
          content: "",
          tags: [],
          author: {
            _id: "",
            name: "",
            image: "",
          },
          createdAt: new Date(),
          upvotes: 0,
          downvotes: 0,
          answers: 0,
          views: 0,
        },
      });

      render(<QuestionForm />);

      // Fill title
      await user.type(screen.getByLabelText(/question title/i), "Unit Testing Title");

      // Fill content
      const editorTextarea = await screen.findByTestId("mdx-editor");
      await user.click(editorTextarea);
      await user.type(
        editorTextarea,
        "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
          "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
          "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
          "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
          "HELP ME PLEASE I NEED THIS TO KEEP MY JOB"
      );

      // Add tag
      const tagInput = screen.getByPlaceholderText(/add tags/i);
      fireEvent.change(tagInput, { target: { value: "react" } });
      fireEvent.keyDown(tagInput, { key: "Enter" });

      const submitBtn = screen.getByRole("button", { name: /ask a question/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(createQuestion).toHaveBeenCalledWith({
          title: "Unit Testing Title",
          content:
            "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
            "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
            "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
            "HELP ME PLEASE I NEED THIS TO KEEP MY JOB\n" +
            "HELP ME PLEASE I NEED THIS TO KEEP MY JOB",
          tags: ["react"],
        });

        expect(toast).toHaveBeenCalledWith(
          expect.objectContaining({
            title: "Success",
            description: "Your question has been posted successfully.",
          })
        );

        expect(mockRouter.push).toHaveBeenCalledWith("/questions/123");
      });
    });
  });
});
