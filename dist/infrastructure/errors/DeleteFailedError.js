"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFailedError = void 0;
class DeleteFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DeleteFailedError';
        this.statusCode = 500;
    }
}
exports.DeleteFailedError = DeleteFailedError;
