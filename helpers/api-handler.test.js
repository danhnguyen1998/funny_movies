import { apiHandler } from "./api-handler";

describe("apiHandler", () => {
    const mockReq = { method: "GET" };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
    };
    const mockHandler = {
        get: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns a function", () => {
        expect(typeof apiHandler(mockHandler)).toEqual("function");
    });

    it("returns 405 if method not supported", async () => {
        const handler = apiHandler(mockHandler);
        const req = { ...mockReq, method: "POST" };

        await handler(req, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(405);
        expect(mockRes.end).toHaveBeenCalledWith(`Method POST Not Allowed`);
    });
});
