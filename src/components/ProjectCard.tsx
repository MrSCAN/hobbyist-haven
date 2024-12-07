import { Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectDetails } from "./ProjectDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Stage {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrls: string[];
  imageUrl: string;
  documentation: string;
  youtubeUrl?: string;
  stages: Stage[];
}

export const ProjectCard = ({
  title,
  description,
  techStack,
  repoUrls,
  imageUrl,
  documentation,
  youtubeUrl,
  stages,
}: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Open project details in a new tab
    const projectSlug = title.toLowerCase().replace(/\s+/g, '-');
    window.open(`/projects/${projectSlug}`, '_blank');
  };

  return (
    <>
      <Card className="project-card overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <CardHeader className="p-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-secondary/50">
          <div className="flex gap-2">
            {repoUrls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
              </a>
            ))}
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Add collaboration logic here
            }}
          >
            Collaborate
          </Button>
        </CardFooter>
      </Card>

      <ProjectDetails
        open={showDetails}
        onOpenChange={setShowDetails}
        title={title}
        description={description}
        documentation={documentation}
        youtubeUrl={youtubeUrl}
        stages={stages}
      />
    </>
  );
};