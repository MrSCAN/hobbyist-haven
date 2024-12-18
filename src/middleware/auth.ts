import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    // Token verification will be handled by the Flask backend
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    next();
  } catch (error) {
    next(error);
  }
};