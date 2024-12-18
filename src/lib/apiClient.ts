const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
  }
  
  return response.json();
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const fetchProjects = async (token?: string) => {
  const headers = {
    ...defaultHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/projects`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
};

export const fetchProjectBySlug = async (slug: string, token?: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
    headers: token ? {
      'Authorization': `Bearer ${token}`,
    } : {},
  });
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
};

export const createProject = async (data: any, token: string) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
};

export const updateProject = async (id: string, data: any, token: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
};

export const deleteProject = async (id: string, token: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};

export const getUsers = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const updateUserRole = async (id: string, role: 'USER' | 'ADMIN', token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) throw new Error('Failed to update user role');
  return response.json();
};

export const checkUserRole = async (userId: string, token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch user role');
  return response.json();
};
