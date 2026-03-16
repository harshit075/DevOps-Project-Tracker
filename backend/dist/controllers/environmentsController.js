"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironments = getEnvironments;
exports.createEnvironment = createEnvironment;
exports.updateEnvironment = updateEnvironment;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
async function getEnvironments(req, res, next) {
    try {
        const environments = await prisma_1.prisma.environment.findMany({
            include: { services: true },
            orderBy: { created_at: 'desc' },
        });
        res.json({ environments });
    }
    catch (err) {
        next(err);
    }
}
async function createEnvironment(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, description } = req.body;
        const existing = await prisma_1.prisma.environment.findUnique({ where: { name } });
        if (existing) {
            res.status(409).json({ error: 'Environment with this name already exists' });
            return;
        }
        const environment = await prisma_1.prisma.environment.create({
            data: { name, description },
            include: { services: true },
        });
        res.status(201).json({ environment });
    }
    catch (err) {
        next(err);
    }
}
async function updateEnvironment(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id } = req.params;
        const { name, description } = req.body;
        const existing = await prisma_1.prisma.environment.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Environment not found' });
            return;
        }
        const environment = await prisma_1.prisma.environment.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
            },
            include: { services: true },
        });
        res.json({ environment });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=environmentsController.js.map