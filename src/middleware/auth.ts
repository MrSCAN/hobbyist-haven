import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  },
  afterAuth: async (req, res, next) => {
    try {
      // Sync user with database
      const user = await prisma.user.upsert({
        where: { id: req.auth.userId },
        update: {
          email: req.auth.sessionClaims.email,
          name: req.auth.sessionClaims.name,
        },
        create: {
          id: req.auth.userId,
          email: req.auth.sessionClaims.email,
          name: req.auth.sessionClaims.name,
          role: 'USER',
        },
      });
      
      req.user = user;
      next();
    } catch (error) {
      console.error('Database sync error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
});

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await requireAuth(req, res, async () => {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });
      
      if (user?.role !== 'ADMIN') {
        res.status(403).json({ message: 'Forbidden: Admin access required' });
        return;
      }
      
      next();
    });
  } catch (error) {
    next(error);
  }
};