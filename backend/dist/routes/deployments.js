"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const deploymentsController_1 = require("../controllers/deploymentsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', deploymentsController_1.getDeployments);
router.get('/:id', deploymentsController_1.getDeploymentById);
router.post('/', [
    (0, express_validator_1.body)('environment').trim().notEmpty().withMessage('Environment is required'),
    (0, express_validator_1.body)('service_id').optional().isUUID().withMessage('service_id must be a valid UUID'),
    (0, express_validator_1.body)('commit_hash').optional().isString(),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILED', 'ROLLED_BACK'])
        .withMessage('Invalid status'),
    (0, express_validator_1.body)('version').optional().isString(),
], deploymentsController_1.createDeployment);
exports.default = router;
//# sourceMappingURL=deployments.js.map