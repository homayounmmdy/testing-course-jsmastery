import { render, screen } from "@testing-library/react";
import QuestionForm from "@/components/forms/QuestionForm";
import { MockEditor, resetAllMocks } from "@/tests/mocks";

jest.mock("@/components/editor", () => MockEditor);
jest.mock("@/lib/actions/question.action", () => ({
  createQuestion: jest.fn(),
}));
describe("QuestionForm Component", () => {
  beforeEach(() => {
    resetAllMocks();
  });

  describe("Rending", () => {
    it("should render all form fields", async () => {
      render(<QuestionForm />);

      expect(screen.getByLabelText(/Question Title/i)).toBeInTheDocument();
      expect(await screen.findByLabelText(/Detailed explanation of your problem/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Add tags/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Ask a question/i })).toBeInTheDocument();
    });
  });
});
