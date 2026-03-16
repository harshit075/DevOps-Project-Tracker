import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare function getTodos(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createTodo(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function updateTodo(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
export declare function deleteTodo(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=todosController.d.ts.map