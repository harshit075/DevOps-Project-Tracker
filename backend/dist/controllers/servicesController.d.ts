import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getServices(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createService(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function updateService(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function deleteService(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=servicesController.d.ts.map