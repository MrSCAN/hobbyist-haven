import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";

const DEMO_PROJECTS = [
  {
    title: "Smart Home Dashboard",
    description: "A beautiful dashboard for monitoring and controlling IoT devices with real-time updates.",
    techStack: ["React", "TypeScript", "WebSocket"],
    repoUrls: ["https://github.com/demo/smart-home-dashboard"],
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
    documentation: `
      # Smart Home Dashboard

      ## Overview
      This project provides a centralized dashboard for managing IoT devices in your home.

      ## Features
      - Real-time device status updates
      - Automated scheduling
      - Energy usage monitoring
      - Mobile-responsive design

      ## Technical Details
      Built using React and TypeScript, with WebSocket for real-time communications.
    `,
    youtubeUrl: "https://youtube.com/watch?v=demo",
    stages: [
      {
        title: "Initial Setup",
        description: "Basic dashboard layout and device connection",
        techStack: ["React", "TypeScript"],
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
      },
      {
        title: "Real-time Updates",
        description: "Added WebSocket integration for live device status",
        techStack: ["WebSocket", "React"],
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
      },
    ],
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