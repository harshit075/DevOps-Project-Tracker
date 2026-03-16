import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';



export async function getServices(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const services = await prisma.service.findMany({
      include: { environment: true },
      orderBy: { created_at: 'desc' },
    });
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

export async function createService(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, status, version, environment_id } = req.body;
    const service = await prisma.service.create({
      data: { name, status: status || 'HEALTHY', version, environment_id },
      include: { environment: true },
    });
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
}

export async function updateService(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { name, status, version, environment_id, last_deployment } = req.body;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    const service = await prisma.service.update({
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
  } catch (err) {
    next(err);
  }
}

export async function deleteService(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    await prisma.service.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
