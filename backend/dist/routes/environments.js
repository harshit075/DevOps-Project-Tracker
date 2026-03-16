"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const environmentsController_1 = require("../controllers/environmentsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', environmentsController_1.getEnvironments);
router.post('/', [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Environment name is required'),
    (0, express_validator_1.body)('description').optional().isString(),
], environmentsController_1.createEnvironment);
router.patch('/:id', [
    (0, express_validator_1.body)('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('description').optional().isString(),
], environmentsController_1.updateEnvironment);
exports.default = router;
//# sourceMappingURL=environments.js.map