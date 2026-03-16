import { Router } from 'express';
import { body } from 'express-validator';
import { getDocs, createDoc, updateDoc, deleteDoc } from '../controllers/docsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getDocs);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  createDoc
);

router.patch(
  '/:id',
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  ],
  updateDoc
);

router.delete('/:id', deleteDoc);

export default router;
