import {getTags} from "@/lib/actions/tag.action";
import {Tag} from "@/database";

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

    describe("Pagination and Sorting", () => {
        beforeEach(async () => {
            const testTags = [
                {name: 'javascript', questions: 100, createAt: '2026-01-1'},
                {name: 'react', questions: 50, createAt: '2026-02-1'},
                {name: 'node', questions: 200, createAt: '2026-03-1'},
            ];

            await Tag.insertMany(testTags);
        });

        afterEach(async () => {
            Tag.deleteMany({});
        });

        it("should return the first page of tags sorted by questions count (default behavior)", async () => {
            const {
                success ,
                data
            } = await getTags({page: 1, pageSize: 2});

            expect(success).toBe(true);
            expect(data?.tags).toHaveLength(2);
            expect(data?.tags[0].name).toBe('node');
            expect(data?.tags[1].name).toBe('javascript');
            expect(data?.isNext).toBe(true);
        });

        it("should return the second page of tags when paginated", async () => {
            const {success , data} = await getTags({page: 2, pageSize: 2});

            expect(success).toBe(true);
            expect(data?.tags).toHaveLength(1);
            expect(data?.tags[0].name).toBe('react');
            expect(data?.isNext).toBe(false);
        })
    })
});
