import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/api";

const Index = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div>Loading projects...</div>
        </main>
      </div>
    );
  }

  if (error) {
    console.error('Error loading projects:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div>Error loading projects. Please try again later.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;