import { MOCK_PROJECTS, MOCK_USERS } from './mockData';
import { prisma } from './db'; // Uncomment when database is ready

// Demo implementation using mock data
export const getProjects = async () => {
  return MOCK_PROJECTS;
  // Database implementation:
  // return await prisma.project.findMany({
  //   include: {
  //     author: true,
  //     stages: true,
  //   },
  // });
};

export const getProjectBySlug = async (slug: string) => {
  return MOCK_PROJECTS.find(
    p => p.title.toLowerCase().replace(/\s+/g, '-') === slug
  );
  // Database implementation:
  // const projects = await prisma.project.findMany({
  //   include: {
  //     author: true,
  //     stages: true,
  //   },
  //   where: {
  //     title: {
  //       contains: slug.replace(/-/g, ' '),
  //       mode: 'insensitive',
  //     },
  //   },
  // });
  // return projects[0];
};

export const createProject = async (data: any, authorId: string) => {
  console.log('Creating project:', { data, authorId });
  return MOCK_PROJECTS[0];
  // Database implementation:
  // return await prisma.project.create({
  //   data: {
  //     ...data,
  //     authorId,
  //   },
  //   include: {
  //     author: true,
  //     stages: true,
  //   },
  // });
};

export const updateProject = async (id: string, data: any) => {
  console.log('Updating project:', { id, data });
  return MOCK_PROJECTS[0];
  // Database implementation:
  // return await prisma.project.update({
  //   where: { id },
  //   data,
  //   include: {
  //     author: true,
  //     stages: true,
  //   },
  // });
};

export const deleteProject = async (id: string) => {
  console.log('Deleting project:', id);
  return { success: true };
  // Database implementation:
  // await prisma.project.delete({
  //   where: { id },
  // });
  // return { success: true };
};

export const getUsers = async () => {
  return MOCK_USERS;
  // Database implementation:
  // return await prisma.user.findMany();
};

export const updateUserRole = async (id: string, role: 'USER' | 'ADMIN') => {
  console.log('Updating user role:', { id, role });
  return MOCK_USERS[0];
  // Database implementation:
  // return await prisma.user.update({
  //   where: { id },
  //   data: { role },
  // });
};

export const checkUserRole = async (userId: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user role');
  }
  return response.json();
};
