import { errorHandler } from './error-handler'

describe('errorHandler', () => {
    test('should return 404 status code and the correct error message when err ends with "not found"', () => {
        const error = 'This page was not found';
        const res = {
            status: (statusCode) => {
                expect(statusCode).toBe(404);
                return {
                    json: (data) => {
                        expect(data).toEqual({
                            message: error
                        });
                    }
                }
            }
        };
        errorHandler(error, res);
    });

    test('should return 400 status code and the correct error message when err is a string that does not end with "not found"', () => {
        const error = 'Bad Request';
        const res = {
            status: (statusCode) => {
                expect(statusCode).toBe(400);
                return {
                    json: (data) => {
                        expect(data).toEqual({
                            message: error
                        });
                    }
                }
            }
        };
        errorHandler(error, res);
    });

    test('should return 401 status code and the correct error message when err is an UnauthorizedError', () => {
        const error = { name: 'UnauthorizedError' };
        const res = {
            status: (statusCode) => {
                expect(statusCode).toBe(401);
                return {
                    json: (data) => {
                        expect(data).toEqual({
                            message: 'Invalid Token'
                        });
                    }
                }
            }
        };
        errorHandler(error, res);
    });

    test('should return 500 status code and the correct error message for all other types of errors', () => {
        const error = new Error('Something went wrong');
        const res = {
            status: (statusCode) => {
                expect(statusCode).toBe(500);
                return {
                    json: (data) => {
                        expect(data).toEqual({
                            message: error.message
                        });
                    }
                }
            }
        };
        errorHandler(error, res);
    });

});
