"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFailedError = void 0;
class UpdateFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UpdateFailedError';
        this.statusCode = 500;
    }
}
exports.UpdateFailedError = UpdateFailedError;
