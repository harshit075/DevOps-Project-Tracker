import { prisma } from '../utils/prisma';
import { Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';



export async function getTodos(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, priority } = req.query;
    const todos = await prisma.todo.findMany({
      where: {
        ...(status && { status: status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' }),
        ...(priority && { priority: priority as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' }),
      },
      orderBy: { created_at: 'desc' },
    });
    res.json({ todos });
  } catch (err) {
    next(err);
  }
}

export async function createTodo(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { title, description, priority, status } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        status: status || 'PENDING',
      },
    });
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
      },
    });
    res.json({ todo });
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    await prisma.todo.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
