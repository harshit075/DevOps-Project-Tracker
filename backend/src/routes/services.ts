import { Router } from 'express';
import { body } from 'express-validator';
import { getServices, createService, updateService, deleteService } from '../controllers/servicesController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getServices);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Service name is required'),
    body('status').optional().isIn(['HEALTHY', 'WARNING', 'DOWN']).withMessage('Invalid status'),
    body('version').optional().isString(),
    body('environment_id').optional().isUUID().withMessage('environment_id must be a valid UUID'),
  ],
  createService
);

router.patch(
  '/:id',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('status').optional().isIn(['HEALTHY', 'WARNING', 'DOWN']).withMessage('Invalid status'),
    body('version').optional().isString(),
    body('environment_id').optional().isUUID().withMessage('environment_id must be a valid UUID'),
  ],
  updateService
);

router.delete('/:id', deleteService);

export default router;
