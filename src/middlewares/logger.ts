import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Method: ${req.method} | Resource:   ${req.url}`);
  next();
}