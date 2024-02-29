import {asyncHandler} from '@viethung/async-call';
import {NextFunction, Request, Response} from 'express';
const authMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    next();
}
export const authenticate = asyncHandler(authMiddleware)

 