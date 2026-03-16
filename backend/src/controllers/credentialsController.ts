import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { encrypt } from '../utils/encryption';



export async function getCredentials(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const credentials = await prisma.credential.findMany({
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
  } catch (err) {
    next(err);
  }
}

export async function createCredential(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, type, value } = req.body;
    const encrypted_value = encrypt(value);

    const credential = await prisma.credential.create({
      data: { name, type, encrypted_value },
      select: { id: true, name: true, type: true, created_at: true },
    });
    res.status(201).json({ credential });
  } catch (err) {
    next(err);
  }
}

export async function deleteCredential(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const existing = await prisma.credential.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Credential not found' });
      return;
    }
    await prisma.credential.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
