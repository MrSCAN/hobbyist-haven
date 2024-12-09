const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const fetchProjectBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
};

export const createProject = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
};

export const updateProject = async (id: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
};

export const deleteProject = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const updateUserRole = async (id: string, role: 'USER' | 'ADMIN') => {
  const response = await fetch(`${API_BASE_URL}/users/${id}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) throw new Error('Failed to update user role');
  return response.json();
};