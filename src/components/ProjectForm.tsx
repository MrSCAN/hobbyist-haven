import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RichTextEditor } from './RichTextEditor';
import { toast } from './ui/use-toast';
import { useUser } from '@clerk/clerk-react';

export const ProjectForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    repoUrls: '',
    imageUrl: '',
    documentation: '',
    youtubeUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await user?.getToken()}`,
        },
        body: JSON.stringify({
          ...formData,
          techStack: formData.techStack.split(',').map(tech => tech.trim()),
          repoUrls: formData.repoUrls.split(',').map(url => url.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <RichTextEditor
          content={formData.description}
          onChange={(content) => setFormData({ ...formData, description: content })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated)</label>
        <Input
          value={formData.techStack}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          placeholder="React, TypeScript, Node.js"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Repository URLs (comma-separated)</label>
        <Input
          value={formData.repoUrls}
          onChange={(e) => setFormData({ ...formData, repoUrls: e.target.value })}
          placeholder="https://github.com/user/repo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image URL</label>
        <Input
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Documentation</label>
        <RichTextEditor
          content={formData.documentation}
          onChange={(content) => setFormData({ ...formData, documentation: content })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">YouTube URL</label>
        <Input
          value={formData.youtubeUrl}
          onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <Button type="submit">Create Project</Button>
    </form>
  );
};