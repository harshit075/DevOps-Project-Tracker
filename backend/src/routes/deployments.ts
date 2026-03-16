import { Router } from 'express';
import { body } from 'express-validator';
import { getDeployments, getDeploymentById, createDeployment } from '../controllers/deploymentsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getDeployments);
router.get('/:id', getDeploymentById);

router.post(
  '/',
  [
    body('environment').trim().notEmpty().withMessage('Environment is required'),
    body('service_id').optional().isUUID().withMessage('service_id must be a valid UUID'),
    body('commit_hash').optional().isString(),
    body('status')
      .optional()
      .isIn(['PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILED', 'ROLLED_BACK'])
      .withMessage('Invalid status'),
    body('version').optional().isString(),
  ],
  createDeployment
);

export default router;
