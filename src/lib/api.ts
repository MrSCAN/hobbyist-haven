// Mock data until backend is set up
const MOCK_PROJECTS = [
  {
    id: '1',
    title: "MrScan AI Document Scanner",
    description: "An intelligent document scanning solution powered by AI that automatically detects, enhances, and organizes your documents with advanced OCR capabilities.",
    techStack: ["React Native", "TensorFlow", "Python", "OpenCV"],
    repoUrls: ["https://github.com/demo/mrscan-mobile", "https://github.com/demo/mrscan-backend"],
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&q=80",
    documentation: "# MrScan AI Document Scanner\n\n## Overview\nMrScan is a state-of-the-art document scanning solution...",
    youtubeUrl: "https://youtube.com/watch?v=demo-mrscan",
    stages: [
      {
        id: '1',
        title: "Core Scanning Engine",
        description: "Implementation of the basic document scanning and enhancement features",
        techStack: ["OpenCV", "Python"],
        imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&q=80",
        documentation: "Core scanning implementation details...",
        projectId: '1'
      }
    ],
    author: {
      name: "Demo User",
      email: "demo@example.com"
    }
  }
];

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN'
  }
];

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