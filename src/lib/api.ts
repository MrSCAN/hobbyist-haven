import { MOCK_PROJECTS, MOCK_USERS } from './mockData';

// Demo implementation using mock data
export const getProjects = async () => {
  return MOCK_PROJECTS;
};

export const getProjectBySlug = async (slug: string) => {
  return MOCK_PROJECTS.find(
    p => p.title.toLowerCase().replace(/\s+/g, '-') === slug
  );
};

export const createProject = async (data: any, authorId: string) => {
  console.log('Creating project:', { data, authorId });
  return MOCK_PROJECTS[0];
};

export const updateProject = async (id: string, data: any) => {
  console.log('Updating project:', { id, data });
  return MOCK_PROJECTS[0];
};

export const deleteProject = async (id: string) => {
  console.log('Deleting project:', id);
  return { success: true };
};

export const getUsers = async () => {
  return MOCK_USERS;
};

export const updateUserRole = async (id: string, role: 'USER' | 'ADMIN') => {
  console.log('Updating user role:', { id, role });
  return MOCK_USERS[0];
};

export const checkUserRole = async (userId: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user role');
  }
  return response.json();
};