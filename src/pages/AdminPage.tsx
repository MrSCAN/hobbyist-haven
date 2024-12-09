import { useQuery } from "@tanstack/react-query";
import { getUsers, updateUserRole } from "@/lib/api";
import { SignIn } from "@clerk/clerk-react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useUser } from "@clerk/clerk-react";

export const AdminPage = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <SignIn routing="path" path="/sign-in" />
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};