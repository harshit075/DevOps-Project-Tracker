"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const credentialsController_1 = require("../controllers/credentialsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', credentialsController_1.getCredentials);
router.post('/', [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Credential name is required'),
    (0, express_validator_1.body)('type').trim().notEmpty().withMessage('Credential type is required'),
    (0, express_validator_1.body)('value').notEmpty().withMessage('Credential value is required'),
], credentialsController_1.createCredential);
router.delete('/:id', credentialsController_1.deleteCredential);
exports.default = router;
//# sourceMappingURL=credentials.js.map