import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';



export async function getDeployments(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const deployments = await prisma.deployment.findMany({
      include: { service: true },
      orderBy: { created_at: 'desc' },
    });
    res.json({ deployments });
  } catch (err) {
    next(err);
  }
}

export async function getDeploymentById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const deployment = await prisma.deployment.findUnique({
      where: { id },
      include: { service: true },
    });
    if (!deployment) {
      res.status(404).json({ error: 'Deployment not found' });
      return;
    }
    res.json({ deployment });
  } catch (err) {
    next(err);
  }
}

export async function createDeployment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { service_id, environment, commit_hash, status, version } = req.body;
    const deployment = await prisma.deployment.create({
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
      await prisma.service.update({
        where: { id: service_id },
        data: { last_deployment: new Date() },
      });
    }

    res.status(201).json({ deployment });
  } catch (err) {
    next(err);
  }
}
