import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function register(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function login(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=authController.d.ts.map