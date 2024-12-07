import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { StageDetails } from "@/components/StageDetails";

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
      },
      {
        title: "Mobile App Development",
        description: "Creation of the cross-platform mobile application",
        techStack: ["React Native", "TypeScript"],
        imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&q=80",
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

const ProjectDetailsPage = () => {
  const { projectSlug } = useParams();
  const project = DEMO_PROJECTS.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === projectSlug
  );

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Project not found</div>;
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this project with others",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <Button onClick={handleShare} variant="secondary">
            Share Project
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="stages">Stages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              {project.youtubeUrl && (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Youtube className="w-5 h-5" />
                  Watch Project Video
                </a>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="mt-4">
            <div className="prose prose-invert max-w-none">
              {project.documentation}
            </div>
          </TabsContent>

          <TabsContent value="stages" className="mt-4">
            <div className="grid grid-cols-1 gap-12">
              {project.stages.map((stage, index) => (
                <StageDetails
                  key={index}
                  {...stage}
                  documentation={`
                    # Stage Documentation
                    
                    ## Overview
                    ${stage.description}
                    
                    ## Technical Implementation
                    This stage focused on implementing core functionality using ${stage.techStack.join(", ")}.
                    
                    ## Progress
                    - Initial setup and configuration
                    - Core feature implementation
                    - Testing and optimization
                  `}
                  youtubeUrl={project.youtubeUrl}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
