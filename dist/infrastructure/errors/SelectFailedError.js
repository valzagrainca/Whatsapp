"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFailedError = void 0;
class SelectFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SelectFailedError';
        this.statusCode = 500;
    }
}
exports.SelectFailedError = SelectFailedError;
