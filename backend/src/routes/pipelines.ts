import { Router } from 'express';
import { body } from 'express-validator';
import { getPipelines, getPipelineById, createPipeline } from '../controllers/pipelinesController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getPipelines);
router.get('/:id', getPipelineById);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Pipeline name is required'),
    body('status').optional().isIn(['PENDING', 'RUNNING', 'SUCCESS', 'FAILED', 'CANCELLED']).withMessage('Invalid status'),
    body('commit_hash').optional().isString(),
    body('duration').optional().isInt({ min: 0 }).withMessage('Duration must be a non-negative integer'),
    body('triggered_by').optional().isString(),
  ],
  createPipeline
);

export default router;
