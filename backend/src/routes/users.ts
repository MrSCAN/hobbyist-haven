import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import { Webhook } from '@clerk/clerk-sdk-node';

const router = express.Router();
const prisma = new PrismaClient();

// Clerk webhook handler for user creation/updates
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhook = new Webhook(req.body);
    const { data, type } = webhook;

    if (type === 'user.created') {
      await prisma.user.create({
        data: {
          id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
          role: 'USER', // Default role
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});

// Get user role
router.get('/:id', requireAuth, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: { role: true },
  });
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
}));

// Update user role (admin only)
router.put('/:id/role', requireAdmin, asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role },
  });
  res.json(user);
}));

// Get all users (admin only)
router.get('/', requireAdmin, asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
  res.json(users);
}));

export const usersRouter = router;