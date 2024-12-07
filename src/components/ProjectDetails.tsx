import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube } from "lucide-react";

interface Stage {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
}

interface ProjectDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  documentation: string;
  youtubeUrl?: string;
  stages: Stage[];
}

export const ProjectDetails = ({
  open,
  onOpenChange,
  title,
  description,
  documentation,
  youtubeUrl,
  stages,
}: ProjectDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="stages">Stages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">{description}</p>
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
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
              {documentation}
            </div>
          </TabsContent>

          <TabsContent value="stages" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden bg-card"
                >
                  <img
                    src={stage.imageUrl}
                    alt={stage.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{stage.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {stage.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stage.techStack.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};