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
});
