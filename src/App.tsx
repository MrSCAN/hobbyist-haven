import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import { AdminPage } from "./pages/AdminPage";

const queryClient = new QueryClient();
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn("Missing Clerk Publishable Key - Authentication features will be disabled");
}

const clerkAppearance = {
  layout: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
    privacyPageUrl: "/privacy",
    termsPageUrl: "/terms",
  },
  elements: {
    rootBox: "w-full max-w-md mx-auto my-8",
    card: "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-xl rounded-xl border border-border/40",
    headerTitle: "text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent",
    headerSubtitle: "text-muted-foreground",
    socialButtons: "gap-4",
    socialButtonsBlockButton: "flex items-center justify-center w-full gap-2 mt-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-none",
    formFieldLabel: "text-foreground font-medium",
    formFieldInput: "bg-background border-input",
    footerActionText: "text-muted-foreground",
    footerActionLink: "text-primary hover:text-primary/90",
    dividerLine: "bg-border/60",
    dividerText: "text-muted-foreground px-2",
  },
};

const App = () => (
  <ClerkProvider 
    publishableKey={publishableKey}
    appearance={clerkAppearance}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/sign-in/*" 
              element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
                  <SignIn routing="path" path="/sign-in" />
                </div>
              } 
            />
            <Route 
              path="/sign-up/*" 
              element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
                  <SignUp routing="path" path="/sign-up" />
                </div>
              } 
            />
            <Route path="/projects/:projectSlug" element={<ProjectDetailsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;