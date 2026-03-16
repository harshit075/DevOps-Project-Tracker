import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getEnvironments(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createEnvironment(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function updateEnvironment(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=environmentsController.d.ts.map