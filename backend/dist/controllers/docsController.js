"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocs = getDocs;
exports.createDoc = createDoc;
exports.updateDoc = updateDoc;
exports.deleteDoc = deleteDoc;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
async function getDocs(req, res, next) {
    try {
        const { category } = req.query;
        const docs = await prisma_1.prisma.documentation.findMany({
            where: { ...(category && { category: category }) },
            orderBy: { created_at: 'desc' },
        });
        res.json({ docs });
    }
    catch (err) {
        next(err);
    }
}
async function createDoc(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { title, content, category } = req.body;
        const doc = await prisma_1.prisma.documentation.create({
            data: { title, content, category },
        });
        res.status(201).json({ doc });
    }
    catch (err) {
        next(err);
    }
}
async function updateDoc(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { id } = req.params;
        const { title, content, category } = req.body;
        const existing = await prisma_1.prisma.documentation.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }
        const doc = await prisma_1.prisma.documentation.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(content !== undefined && { content }),
                ...(category !== undefined && { category }),
            },
        });
        res.json({ doc });
    }
    catch (err) {
        next(err);
    }
}
async function deleteDoc(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.documentation.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }
        await prisma_1.prisma.documentation.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=docsController.js.map