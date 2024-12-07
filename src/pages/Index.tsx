import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";

const DEMO_PROJECTS = [
  {
    title: "MrScan AI Document Scanner",
    description: "An intelligent document scanning solution powered by AI that automatically detects, enhances, and organizes your documents with advanced OCR capabilities.",
    techStack: ["React Native", "TensorFlow", "Python", "OpenCV"],
    repoUrls: ["https://github.com/demo/mrscan-mobile", "https://github.com/demo/mrscan-backend"],
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&q=80",
    documentation: `
      # MrScan AI Document Scanner

      ## Overview
      MrScan is a state-of-the-art document scanning solution that leverages AI to provide perfect scans every time.

      ## Features
      - Automatic document edge detection
      - Real-time perspective correction
      - Advanced OCR with multiple language support
      - Cloud synchronization
      - Batch scanning capabilities

      ## Technical Architecture
      Built using React Native for mobile, with TensorFlow and OpenCV for image processing.
    `,
    youtubeUrl: "https://youtube.com/watch?v=demo-mrscan",
    stages: [
      {
        title: "Core Scanning Engine",
        description: "Implementation of the basic document scanning and enhancement features",
        techStack: ["OpenCV", "Python"],
        imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&q=80",
        documentation: `
          # Core Scanning Engine Development
          
          This stage focused on implementing the fundamental scanning capabilities using OpenCV and Python.
          Key achievements include document edge detection and initial image enhancement algorithms.
        `,
        youtubeUrl: "https://youtube.com/watch?v=demo-mrscan-stage1"
      },
      {
        title: "Mobile App Development",
        description: "Creation of the cross-platform mobile application",
        techStack: ["React Native", "TypeScript"],
        imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&q=80",
        documentation: `
          # Mobile Application Development
          
          In this stage, we built the cross-platform mobile interface using React Native.
          Implemented the camera integration and real-time processing features.
        `,
        youtubeUrl: "https://youtube.com/watch?v=demo-mrscan-stage2"
      }
    ]
  },
  {
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
        title: "MVP Release",
        description: "Basic style transfer functionality",
        techStack: ["Python", "TensorFlow"],
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&q=80",
      },
      {
        title: "Enhanced Features",
        description: "Added multiple style mixing and custom inputs",
        techStack: ["React", "Python"],
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&q=80",
      },
    ],
  },
  {
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
        title: "Basic Tracking",
        description: "Portfolio management and price tracking",
        techStack: ["React", "Node.js"],
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80",
      },
      {
        title: "Analytics Dashboard",
        description: "Added advanced analytics and visualizations",
        techStack: ["MongoDB", "React"],
        imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80",
      },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PROJECTS.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
