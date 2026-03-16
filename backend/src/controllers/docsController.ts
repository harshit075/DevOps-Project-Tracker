import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';



export async function getDocs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query;
    const docs = await prisma.documentation.findMany({
      where: { ...(category && { category: category as string }) },
      orderBy: { created_at: 'desc' },
    });
    res.json({ docs });
  } catch (err) {
    next(err);
  }
}

export async function createDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { title, content, category } = req.body;
    const doc = await prisma.documentation.create({
      data: { title, content, category },
    });
    res.status(201).json({ doc });
  } catch (err) {
    next(err);
  }
}

export async function updateDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { title, content, category } = req.body;

    const existing = await prisma.documentation.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    const doc = await prisma.documentation.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(category !== undefined && { category }),
      },
    });
    res.json({ doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const existing = await prisma.documentation.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }
    await prisma.documentation.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
