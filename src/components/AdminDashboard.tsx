import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUserRole } from "@/lib/api";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        {users?.map((user: any) => (
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
        ))}
      </div>
    </div>
  );
};