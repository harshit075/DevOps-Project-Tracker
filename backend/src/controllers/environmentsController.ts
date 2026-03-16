import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';



export async function getEnvironments(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const environments = await prisma.environment.findMany({
      include: { services: true },
      orderBy: { created_at: 'desc' },
    });
    res.json({ environments });
  } catch (err) {
    next(err);
  }
}

export async function createEnvironment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, description } = req.body;

    const existing = await prisma.environment.findUnique({ where: { name } });
    if (existing) {
      res.status(409).json({ error: 'Environment with this name already exists' });
      return;
    }

    const environment = await prisma.environment.create({
      data: { name, description },
      include: { services: true },
    });
    res.status(201).json({ environment });
  } catch (err) {
    next(err);
  }
}

export async function updateEnvironment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { name, description } = req.body;

    const existing = await prisma.environment.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Environment not found' });
      return;
    }

    const environment = await prisma.environment.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
      },
      include: { services: true },
    });
    res.json({ environment });
  } catch (err) {
    next(err);
  }
}
