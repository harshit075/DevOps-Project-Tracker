"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeployments = getDeployments;
exports.getDeploymentById = getDeploymentById;
exports.createDeployment = createDeployment;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
async function getDeployments(req, res, next) {
    try {
        const deployments = await prisma_1.prisma.deployment.findMany({
            include: { service: true },
            orderBy: { created_at: 'desc' },
        });
        res.json({ deployments });
    }
    catch (err) {
        next(err);
    }
}
async function getDeploymentById(req, res, next) {
    try {
        const { id } = req.params;
        const deployment = await prisma_1.prisma.deployment.findUnique({
            where: { id },
            include: { service: true },
        });
        if (!deployment) {
            res.status(404).json({ error: 'Deployment not found' });
            return;
        }
        res.json({ deployment });
    }
    catch (err) {
        next(err);
    }
}
async function createDeployment(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { service_id, environment, commit_hash, status, version } = req.body;
        const deployment = await prisma_1.prisma.deployment.create({
            data: {
                service_id,
                environment,
                commit_hash,
                status: status || 'PENDING',
                version,
            },
            include: { service: true },
        });
        // Update service's last_deployment timestamp if service_id provided
        if (service_id) {
            await prisma_1.prisma.service.update({
                where: { id: service_id },
                data: { last_deployment: new Date() },
            });
        }
        res.status(201).json({ deployment });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=deploymentsController.js.map