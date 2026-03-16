"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = getServices;
exports.createService = createService;
exports.updateService = updateService;
exports.deleteService = deleteService;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
async function getServices(req, res, next) {
    try {
        const services = await prisma_1.prisma.service.findMany({
            include: { environment: true },
            orderBy: { created_at: 'desc' },
        });
        res.json({ services });
    }
    catch (err) {
        next(err);
    }
}
async function createService(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, status, version, environment_id } = req.body;
        const service = await prisma_1.prisma.service.create({
            data: { name, status: status || 'HEALTHY', version, environment_id },
            include: { environment: true },
        });
        res.status(201).json({ service });
    }
    catch (err) {
        next(err);
    }
}
async function updateService(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id } = req.params;
        const { name, status, version, environment_id, last_deployment } = req.body;
        const existing = await prisma_1.prisma.service.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Service not found' });
            return;
        }
        const service = await prisma_1.prisma.service.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(status !== undefined && { status }),
                ...(version !== undefined && { version }),
                ...(environment_id !== undefined && { environment_id }),
                ...(last_deployment !== undefined && { last_deployment: new Date(last_deployment) }),
            },
            include: { environment: true },
        });
        res.json({ service });
    }
    catch (err) {
        next(err);
    }
}
async function deleteService(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.service.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Service not found' });
            return;
        }
        await prisma_1.prisma.service.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=servicesController.js.map