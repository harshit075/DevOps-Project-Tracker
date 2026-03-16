"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFound = notFound;
function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    if (process.env.NODE_ENV !== 'production') {
        console.error('[Error]', {
            status,
            message,
            stack: err.stack,
        });
    }
    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
}
function notFound(req, res) {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
}
//# sourceMappingURL=errorHandler.js.map