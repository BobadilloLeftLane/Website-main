"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (error, req, res, next) => {
    logger_1.logger.error('Unhandled error', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message;
    res.status(500).json({
        error: message,
        timestamp: new Date().toISOString()
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map