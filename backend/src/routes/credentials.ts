import { Router } from 'express';
import { body } from 'express-validator';
import { getCredentials, createCredential, deleteCredential } from '../controllers/credentialsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getCredentials);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Credential name is required'),
    body('type').trim().notEmpty().withMessage('Credential type is required'),
    body('value').notEmpty().withMessage('Credential value is required'),
  ],
  createCredential
);

router.delete('/:id', deleteCredential);

export default router;
