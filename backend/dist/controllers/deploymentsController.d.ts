import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getDeployments(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getDeploymentById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createDeployment(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=deploymentsController.d.ts.map