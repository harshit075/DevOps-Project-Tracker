"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPipelines = getPipelines;
exports.getPipelineById = getPipelineById;
exports.createPipeline = createPipeline;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
async function getPipelines(req, res, next) {
    try {
        const pipelines = await prisma_1.prisma.pipeline.findMany({
            orderBy: { created_at: 'desc' },
        });
        res.json({ pipelines });
    }
    catch (err) {
        next(err);
    }
}
async function getPipelineById(req, res, next) {
    try {
        const { id } = req.params;
        const pipeline = await prisma_1.prisma.pipeline.findUnique({ where: { id } });
        if (!pipeline) {
            res.status(404).json({ error: 'Pipeline not found' });
            return;
        }
        res.json({ pipeline });
    }
    catch (err) {
        next(err);
    }
}
async function createPipeline(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, status, commit_hash, duration, triggered_by } = req.body;
        const pipeline = await prisma_1.prisma.pipeline.create({
            data: {
                name,
                status: status || 'PENDING',
                commit_hash,
                duration,
                triggered_by: triggered_by || req.user?.email,
            },
        });
        res.status(201).json({ pipeline });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=pipelinesController.js.map