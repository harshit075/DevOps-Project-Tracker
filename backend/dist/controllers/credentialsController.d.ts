import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getCredentials(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createCredential(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function deleteCredential(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=credentialsController.d.ts.map