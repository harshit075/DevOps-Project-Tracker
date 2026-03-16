import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getDocs(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function updateDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function deleteDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=docsController.d.ts.map