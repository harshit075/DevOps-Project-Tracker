"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const pipelinesController_1 = require("../controllers/pipelinesController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', pipelinesController_1.getPipelines);
router.get('/:id', pipelinesController_1.getPipelineById);
router.post('/', [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Pipeline name is required'),
    (0, express_validator_1.body)('status').optional().isIn(['PENDING', 'RUNNING', 'SUCCESS', 'FAILED', 'CANCELLED']).withMessage('Invalid status'),
    (0, express_validator_1.body)('commit_hash').optional().isString(),
    (0, express_validator_1.body)('duration').optional().isInt({ min: 0 }).withMessage('Duration must be a non-negative integer'),
    (0, express_validator_1.body)('triggered_by').optional().isString(),
], pipelinesController_1.createPipeline);
exports.default = router;
//# sourceMappingURL=pipelines.js.map