import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const checkAdminStatus = async (userId: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user status');
  const data = await response.json();
  return data.role === 'ADMIN';
};

export const AdminPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['adminStatus', user?.id],
    queryFn: () => checkAdminStatus(user?.id as string),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">
            You are not an admin yet. Please contact support for more information.
          </p>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};