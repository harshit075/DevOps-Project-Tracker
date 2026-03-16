"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const todosController_1 = require("../controllers/todosController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', todosController_1.getTodos);
router.post('/', [
    (0, express_validator_1.body)('title').trim().notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).withMessage('Invalid priority'),
    (0, express_validator_1.body)('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED']).withMessage('Invalid status'),
], todosController_1.createTodo);
router.patch('/:id', [
    (0, express_validator_1.body)('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).withMessage('Invalid priority'),
    (0, express_validator_1.body)('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED']).withMessage('Invalid status'),
], todosController_1.updateTodo);
router.delete('/:id', todosController_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todos.js.map