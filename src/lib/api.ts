import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async () => {
  return prisma.project.findMany({
    include: {
      stages: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getProjectBySlug = async (slug: string) => {
  return prisma.project.findFirst({
    where: {
      title: {
        equals: slug.split('-').join(' '),
        mode: 'insensitive',
      },
    },
    include: {
      stages: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

export const createProject = async (data: any, authorId: string) => {
  return prisma.project.create({
    data: {
      ...data,
      authorId,
    },
  });
};

export const updateProject = async (id: string, data: any) => {
  return prisma.project.update({
    where: { id },
    data,
  });
};

export const deleteProject = async (id: string) => {
  return prisma.project.delete({
    where: { id },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};

export const updateUserRole = async (id: string, role: 'USER' | 'ADMIN') => {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
};