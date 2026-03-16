"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
async function getTodos(req, res, next) {
    try {
        const { status, priority } = req.query;
        const todos = await prisma_1.prisma.todo.findMany({
            where: {
                ...(status && { status: status }),
                ...(priority && { priority: priority }),
            },
            orderBy: { created_at: 'desc' },
        });
        res.json({ todos });
    }
    catch (err) {
        next(err);
    }
}
async function createTodo(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { title, description, priority, status } = req.body;
        const todo = await prisma_1.prisma.todo.create({
            data: {
                title,
                description,
                priority: priority || 'MEDIUM',
                status: status || 'PENDING',
            },
        });
        res.status(201).json({ todo });
    }
    catch (err) {
        next(err);
    }
}
async function updateTodo(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id } = req.params;
        const { title, description, priority, status } = req.body;
        const existing = await prisma_1.prisma.todo.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        const todo = await prisma_1.prisma.todo.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(priority !== undefined && { priority }),
                ...(status !== undefined && { status }),
            },
        });
        res.json({ todo });
    }
    catch (err) {
        next(err);
    }
}
async function deleteTodo(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.todo.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        await prisma_1.prisma.todo.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=todosController.js.map