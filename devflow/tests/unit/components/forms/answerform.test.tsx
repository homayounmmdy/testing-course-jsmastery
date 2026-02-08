import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AnswerForm from "@/components/forms/AnswerForm";
import { createAnswer } from "@/lib/actions/answer.action";
import { api } from "@/lib/api";
import { MockEditor, mockSession, mockToast, mockUseSession, resetAllMocks } from "@/tests/mocks";

const user = userEvent.setup();

jest.mock("@/components/editor", () => MockEditor);
jest.mock("@/lib/actions/answer.action", () => ({
  createAnswer: jest.fn(),
}));
jest.mock("@/lib/api", () => ({
  api: { ai: { getAnswer: jest.fn() } },
}));

const mockCreateAnswer = createAnswer as jest.MockedFunction<typeof createAnswer>;
const mockApiAiAnswer = api.ai.getAnswer as jest.MockedFunction<typeof api.ai.getAnswer>;

describe("AnswerForm Component", () => {
  beforeEach(() => {
    resetAllMocks();
  });

  describe("AI Generation", () => {
    it("should generate an AI answer for an authenticated user", async () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: "authenticated",
        update: jest.fn(),
      });
      mockApiAiAnswer.mockResolvedValue({
        success: true,
        data: "This is an AI-generated answer.",
      });

      render(<AnswerForm questionId="123" questionTitle="Test Question" questionContent="Test Content" />);

      await user.click(screen.getByRole("button", { name: /generate ai answer/i }));

      expect(mockApiAiAnswer).toHaveBeenCalledWith("Test Question", "Test Content", "");
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "AI Answer Generated",
          description: "The AI has successfully generated an answer.",
        })
      );
    });
  });

  describe("Submission", () => {
    it("should submit form successfully with valid data", async () => {
      mockCreateAnswer.mockResolvedValue({ success: true });

      render(<AnswerForm questionId="123" questionTitle="Test Question" questionContent="Test Content" />);

      await user.type(await screen.findByTestId("mdx-editor"), "This is my answer to the question".repeat(5));

      await user.click(screen.getByRole("button", { name: /post answer/i }));

      expect(mockCreateAnswer).toHaveBeenCalledWith({
        content: "This is my answer to the question".repeat(5),
        questionId: "123",
      });
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Success",
          description: "Your answer has been created successfully.",
        })
      );
    });

    it("should disable submit button when form is submitting", async () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: "authenticated",
        update: jest.fn(),
      });

      mockCreateAnswer.mockImplementation(() => new Promise(() => {}));
      mockApiAiAnswer.mockImplementation(() => new Promise(() => {}));

      render(<AnswerForm questionId="123" questionTitle="Test Question" questionContent="Test Content" />);

      await user.type(await screen.findByTestId("mdx-editor"), "This is my answer to the question".repeat(5));

      const generateBtn = await screen.findByRole("button", { name: /generate ai answer/i });
      await user.click(generateBtn);

      const submitBtn = screen.getByRole("button", { name: /post answer/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(submitBtn).toBeDisabled();
        expect(screen.getByText(/posting/i)).toBeInTheDocument();

        expect(generateBtn).toBeDisabled();
        expect(screen.getByText(/generating/i)).toBeInTheDocument();
      });
    });
  });
});
