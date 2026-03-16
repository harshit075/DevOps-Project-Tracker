"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = getCredentials;
exports.createCredential = createCredential;
exports.deleteCredential = deleteCredential;
const prisma_1 = require("../utils/prisma");
const express_validator_1 = require("express-validator");
const encryption_1 = require("../utils/encryption");
async function getCredentials(req, res, next) {
    try {
        const credentials = await prisma_1.prisma.credential.findMany({
            orderBy: { created_at: 'desc' },
            select: {
                id: true,
                name: true,
                type: true,
                created_at: true,
                // encrypted_value intentionally excluded from list
            },
        });
        res.json({ credentials });
    }
    catch (err) {
        next(err);
    }
}
async function createCredential(req, res, next) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, type, value } = req.body;
        const encrypted_value = (0, encryption_1.encrypt)(value);
        const credential = await prisma_1.prisma.credential.create({
            data: { name, type, encrypted_value },
            select: { id: true, name: true, type: true, created_at: true },
        });
        res.status(201).json({ credential });
    }
    catch (err) {
        next(err);
    }
}
async function deleteCredential(req, res, next) {
    try {
        const { id } = req.params;
        const existing = await prisma_1.prisma.credential.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ error: 'Credential not found' });
            return;
        }
        await prisma_1.prisma.credential.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=credentialsController.js.map