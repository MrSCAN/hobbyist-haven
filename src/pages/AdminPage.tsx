import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, getUsers, updateUserRole, createProject, updateProject, deleteProject } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser, SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const AdminPage = () => {
  const { user, isSignedIn } = useUser();
  const queryClient = useQueryClient();
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: [],
    repoUrls: [],
    imageUrl: "",
    documentation: "",
    youtubeUrl: "",
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: 'USER' | 'ADMIN' }) => 
      updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Role updated successfully",
      });
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: any) => createProject(data, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project created successfully",
      });
    },
  });

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="signin">
          <TabsList>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Create New Project</h2>
            <Input
              placeholder="Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <Input
              placeholder="Tech Stack (comma separated)"
              value={newProject.techStack.join(', ')}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value.split(',').map(t => t.trim()) })}
            />
            <Input
              placeholder="Repository URLs (comma separated)"
              value={newProject.repoUrls.join(', ')}
              onChange={(e) => setNewProject({ ...newProject, repoUrls: e.target.value.split(',').map(u => u.trim()) })}
            />
            <Input
              placeholder="Image URL"
              value={newProject.imageUrl}
              onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
            />
            <Input
              placeholder="Documentation"
              value={newProject.documentation}
              onChange={(e) => setNewProject({ ...newProject, documentation: e.target.value })}
            />
            <Input
              placeholder="YouTube URL"
              value={newProject.youtubeUrl || ''}
              onChange={(e) => setNewProject({ ...newProject, youtubeUrl: e.target.value })}
            />
            <Button onClick={() => createProjectMutation.mutate(newProject)}>
              Create Project
            </Button>
          </div>

          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Existing Projects</h2>
            {projectsLoading ? (
              <p>Loading projects...</p>
            ) : (
              projects?.map((project: any) => (
                <div key={project.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Manage Users</h2>
            {usersLoading ? (
              <p>Loading users...</p>
            ) : (
              users?.map((user: any) => (
                <div key={user.id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{user.name || user.email}</p>
                    <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => updateRoleMutation.mutate({
                      id: user.id,
                      role: user.role === 'ADMIN' ? 'USER' : 'ADMIN'
                    })}
                  >
                    Toggle Admin
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};