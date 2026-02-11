import {generateText} from 'ai';
import {testApiHandler} from "next-test-api-route-handler";
import {POST} from '@/app/api/ai/answers/route';
import {resetAllMocks} from "@/tests/mocks";

jest.mock('ai', () => ({
    generateText: jest.fn(),
}));

const mockedGenerateText = generateText as jest.Mock;

const validQuestion = 'Explain Next.js in detail'.repeat(4);
const validContent =  "Next.js is a framework for React that...".repeat(4);

describe("POST /api/ai/answers", () => {
    afterEach(() => {
        resetAllMocks();
    });

    describe("success", () => {
        it("should return 200 and AI-generated text when request is valid", async () => {
            const mockResponse = "This is the generated markdown response";
            mockedGenerateText.mockResolvedValue({text : mockResponse});

            const requestBody = {
                question : validQuestion,
                content : validContent,
                userAnswers : "A framework for React"
            }

            await testApiHandler({
                appHandler : {POST},
                async test({fetch} ) {
                    const res = await fetch({
                        method: "POST",
                        headers : {"Content-Type": "application/json"},
                        body: JSON.stringify(requestBody)
                    });

                    const json = await res.json();

                    expect(res.status).toBe(200);
                    expect(json).toEqual({success: true, data : mockResponse});

                    expect(mockedGenerateText).toHaveBeenCalledTimes(1);
                    expect(mockedGenerateText.mock.calls[0][0].prompt).toContain(requestBody.question);
                    expect(mockedGenerateText.mock.calls[0][0].prompt).toContain(requestBody.content);
                }
            })
        })
    })
})