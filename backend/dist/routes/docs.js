"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const docsController_1 = require("../controllers/docsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', docsController_1.getDocs);
router.post('/', [
    (0, express_validator_1.body)('title').trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('content').notEmpty().withMessage('Content is required'),
    (0, express_validator_1.body)('category').trim().notEmpty().withMessage('Category is required'),
], docsController_1.createDoc);
router.patch('/:id', [
    (0, express_validator_1.body)('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('content').optional().notEmpty().withMessage('Content cannot be empty'),
    (0, express_validator_1.body)('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
], docsController_1.updateDoc);
router.delete('/:id', docsController_1.deleteDoc);
exports.default = router;
//# sourceMappingURL=docs.js.map