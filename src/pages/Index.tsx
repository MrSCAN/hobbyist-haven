import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";

const DEMO_PROJECTS = [
  {
    title: "Smart Home Dashboard",
    description: "A beautiful dashboard for monitoring and controlling IoT devices with real-time updates.",
    techStack: ["React", "TypeScript", "WebSocket"],
    repoUrls: ["https://github.com/demo/smart-home-dashboard"],
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
  },
  {
    title: "AI Art Generator",
    description: "Create unique artwork using machine learning algorithms and style transfer techniques.",
    techStack: ["Python", "TensorFlow", "React"],
    repoUrls: ["https://github.com/demo/ai-art-frontend", "https://github.com/demo/ai-art-backend"],
    imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500&q=80",
  },
  {
    title: "Crypto Portfolio Tracker",
    description: "Track your cryptocurrency investments with real-time price updates and portfolio analytics.",
    techStack: ["React", "Node.js", "MongoDB"],
    repoUrls: ["https://github.com/demo/crypto-tracker"],
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80",
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