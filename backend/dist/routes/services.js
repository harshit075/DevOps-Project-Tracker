"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const servicesController_1 = require("../controllers/servicesController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', servicesController_1.getServices);
router.post('/', [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Service name is required'),
    (0, express_validator_1.body)('status').optional().isIn(['HEALTHY', 'WARNING', 'DOWN']).withMessage('Invalid status'),
    (0, express_validator_1.body)('version').optional().isString(),
    (0, express_validator_1.body)('environment_id').optional().isUUID().withMessage('environment_id must be a valid UUID'),
], servicesController_1.createService);
router.patch('/:id', [
    (0, express_validator_1.body)('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('status').optional().isIn(['HEALTHY', 'WARNING', 'DOWN']).withMessage('Invalid status'),
    (0, express_validator_1.body)('version').optional().isString(),
    (0, express_validator_1.body)('environment_id').optional().isUUID().withMessage('environment_id must be a valid UUID'),
], servicesController_1.updateService);
router.delete('/:id', servicesController_1.deleteService);
exports.default = router;
//# sourceMappingURL=services.js.map