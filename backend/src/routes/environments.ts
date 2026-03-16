import { Router } from 'express';
import { body } from 'express-validator';
import {
  getEnvironments,
  createEnvironment,
  updateEnvironment,
} from '../controllers/environmentsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getEnvironments);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Environment name is required'),
    body('description').optional().isString(),
  ],
  createEnvironment
);

router.patch(
  '/:id',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('description').optional().isString(),
  ],
  updateEnvironment
);

export default router;
