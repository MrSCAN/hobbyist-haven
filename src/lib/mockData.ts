export const MOCK_PROJECTS = [
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
  },
  {
    id: '2',
    title: "AI Art Generator",
    description: "Create unique artwork using machine learning algorithms and style transfer techniques.",
    techStack: ["Python", "TensorFlow", "React"],
    repoUrls: ["https://github.com/demo/ai-art-frontend", "https://github.com/demo/ai-art-backend"],
    imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&q=80",
    documentation: `
      # AI Art Generator

      ## Overview
      Generate unique artwork using advanced AI algorithms.

      ## Features
      - Multiple art styles
      - Custom input images
      - High-resolution output
      - Style mixing capabilities

      ## Technical Stack
      Frontend in React, backend in Python with TensorFlow.
    `,
    youtubeUrl: "https://youtube.com/watch?v=demo2",
    stages: [
      {
        id: '1',
        title: "MVP Release",
        description: "Basic style transfer functionality",
        techStack: ["Python", "TensorFlow"],
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&q=80",
        documentation: "MVP release details...",
        projectId: '2'
      },
      {
        id: '2',
        title: "Enhanced Features",
        description: "Added multiple style mixing and custom inputs",
        techStack: ["React", "Python"],
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&q=80",
        documentation: "Enhanced features implementation details...",
        projectId: '2'
      }
    ],
    author: {
      name: "Demo User",
      email: "demo@example.com"
    }
  },
  {
    id: '3',
    title: "Crypto Portfolio Tracker",
    description: "Track your cryptocurrency investments with real-time price updates and portfolio analytics.",
    techStack: ["React", "Node.js", "MongoDB"],
    repoUrls: ["https://github.com/demo/crypto-tracker"],
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80",
    documentation: `
      # Crypto Portfolio Tracker

      ## Overview
      Keep track of your crypto investments in real-time.

      ## Features
      - Real-time price updates
      - Portfolio analytics
      - Historical data visualization
      - Multiple currency support

      ## Architecture
      MERN stack application with real-time data feeds.
    `,
    youtubeUrl: "https://youtube.com/watch?v=demo3",
    stages: [
      {
        id: '1',
        title: "Basic Tracking",
        description: "Portfolio management and price tracking",
        techStack: ["React", "Node.js"],
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80",
        documentation: "Basic tracking implementation details...",
        projectId: '3'
      },
      {
        id: '2',
        title: "Analytics Dashboard",
        description: "Added advanced analytics and visualizations",
        techStack: ["MongoDB", "React"],
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80",
        documentation: "Analytics dashboard implementation details...",
        projectId: '3'
      }
    ],
    author: {
      name: "Demo User",
      email: "demo@example.com"
    }
  }
];

export const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'USER'
  }
];

// Type definitions matching Prisma schema
export type Project = typeof MOCK_PROJECTS[0];
export type User = typeof MOCK_USERS[0];
