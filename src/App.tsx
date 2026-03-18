import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import DepartmentPage from "./pages/DepartmentPage";
import LabPage from "./pages/LabPage";
import LabsPage from "./pages/LabsPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import ClassroomsPage from "./pages/ClassroomsPage";
import PerformancePage from "./pages/PerformancePage";
import FeedbackPage from "./pages/FeedbackPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* 🔥 BACKGROUND WRAPPER */}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          backgroundImage: "url('/mitwpu.jpeg')",
          backgroundSize: "cover",          // keeps it full screen
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* 🔥 DARK OVERLAY FOR CLARITY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)" // adjust 0.4–0.6 if needed
          }}
        />

        {/* 🔥 MAIN CONTENT */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/department/:deptId" element={<DepartmentPage />} />
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/lab/:labId" element={<LabPage />} />
              <Route path="/classrooms" element={<ClassroomsPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;