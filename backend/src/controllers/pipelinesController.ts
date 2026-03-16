import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';



export async function getPipelines(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const pipelines = await prisma.pipeline.findMany({
      orderBy: { created_at: 'desc' },
    });
    res.json({ pipelines });
  } catch (err) {
    next(err);
  }
}

export async function getPipelineById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const pipeline = await prisma.pipeline.findUnique({ where: { id } });
    if (!pipeline) {
      res.status(404).json({ error: 'Pipeline not found' });
      return;
    }
    res.json({ pipeline });
  } catch (err) {
    next(err);
  }
}

export async function createPipeline(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, status, commit_hash, duration, triggered_by } = req.body;
    const pipeline = await prisma.pipeline.create({
      data: {
        name,
        status: status || 'PENDING',
        commit_hash,
        duration,
        triggered_by: triggered_by || req.user?.email,
      },
    });
    res.status(201).json({ pipeline });
  } catch (err) {
    next(err);
  }
}
