import { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-pastel-lavender/10">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
