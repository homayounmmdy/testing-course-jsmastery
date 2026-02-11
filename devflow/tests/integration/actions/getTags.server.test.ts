import {getTags} from "@/lib/actions/tag.action";

describe("getTags action", () => {
    describe("validation", () => {
        it("should return an error if invalid params", async () => {
            const invalidParams = {page: "invalid", pageSize: -5} as unknown as PaginatedSearchParams;

            const result = await getTags(invalidParams);

            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
            expect(result.error && result.error.message).toContain("expected number, received string, Page size must be at least 1");
        });
    });
});
