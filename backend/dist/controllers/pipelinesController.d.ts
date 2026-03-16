import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getPipelines(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getPipelineById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createPipeline(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=pipelinesController.d.ts.map