import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';
import asyncHandler from 'express-async-handler';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
      author: true,
      stages: true,
    },
  });
  res.json(projects);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: {
      author: true,
      stages: true,
    },
  });
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }
  res.json(project);
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const project = await prisma.project.create({
    data: {
      ...req.body,
      authorId: req.user.id,
    },
    include: {
      author: true,
      stages: true,
    },
  });
  res.status(201).json(project);
}));

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: req.body,
    include: {
      author: true,
      stages: true,
    },
  });
  res.json(project);
}));

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
  await prisma.project.delete({
    where: { id: req.params.id },
  });
  res.status(204).send();
}));

export const projectsRouter = router;