import { Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface StageDetailsProps {
  title: string;
  description: string;
  documentation: string;
  youtubeUrl?: string;
  imageUrl: string;
  techStack: string[];
}

export const StageDetails = ({
  title,
  description,
  documentation,
  youtubeUrl,
  imageUrl,
  techStack,
}: StageDetailsProps) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Project Stage: ${title}`,
        text: description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this project stage with others",
      });
    }
  };

  return (
    <div className="space-y-6">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover rounded-lg"
      />
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          {documentation}
        </div>

        <div className="flex items-center gap-4">
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Youtube className="w-5 h-5" />
              Watch Stage Progress
            </a>
          )}
          <Button onClick={handleShare} variant="secondary">
            Share Stage
          </Button>
        </div>
      </div>
    </div>
  );
};