import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth';
import asyncHandler from 'express-async-handler';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', requireAdmin, asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
}));

router.put('/:id/role', requireAdmin, asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role },
  });
  res.json(user);
}));

export const usersRouter = router;