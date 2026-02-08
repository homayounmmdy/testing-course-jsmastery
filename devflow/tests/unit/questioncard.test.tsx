import { render, screen } from "@testing-library/react";
import { MockEditDeleteAction, MockedImage, MockMetric, MockLink } from "@/tests/mocks";
import { getTimeStamp } from "@/lib/utils";
import QuestionCard from "@/components/cards/QuestionCard";

jest.mock("next/link", () => MockLink);
jest.mock("next/image", () => MockedImage);
jest.mock("@/components/user/EditDeleteAction", () => MockEditDeleteAction);
jest.mock("@/components/Metric", () => ({
  Metric: MockMetric,
}));

const mockQuestion: Question = {
  _id: "123",
  title: "How to unit test a Next.js component?",
  content: "This is a sample question content",
  tags: [
    { _id: "tag1", name: "javascript" },
    { _id: "tag2", name: "next.js" },
  ],
  author: {
    _id: "user1",
    name: "John Doe",
    image: "/images/user.jpg",
  },
  createdAt: new Date("2025-09-01T12:00:00Z"),
  upvotes: 10,
  downvotes: 0,
  answers: 5,
  views: 100,
};

const relativeTimeText = getTimeStamp(mockQuestion.createdAt);

describe("QuestionCard Component", () => {
  describe("Rendering", () => {
    it("should render all elements", () => {
      render(<QuestionCard question={mockQuestion} />);

      // Title
      expect(screen.getByText(mockQuestion.title)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: mockQuestion.title })).toHaveAttribute("href", "/questions/123");
      // Tags
      expect(screen.getByText("javascript")).toBeInTheDocument();
      expect(screen.getByText("next.js")).toBeInTheDocument();
      // Avatar
      expect(screen.getByRole("img", { name: `${mockQuestion.author.name}'s avatar` }));
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      // Timestamp
      expect(screen.getByText(relativeTimeText)).toBeInTheDocument();
      // Metrics
      expect(screen.getByText("10 Votes")).toBeInTheDocument();
      expect(screen.getByText("5 Answers")).toBeInTheDocument();
      expect(screen.getByText("100 Views")).toBeInTheDocument();
    });
  });
});
