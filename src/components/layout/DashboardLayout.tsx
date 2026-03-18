import DarkModeToggle from "@/components/DarkModeToggle";
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
      {/* ❌ REMOVE gradient background */}
      <div className="min-h-screen flex w-full bg-transparent">
        
        <Sidebar />

        <main className="flex-1 overflow-auto">

          {/* 🔥 TOP HEADER */}
          <div className="flex justify-end items-center p-4 backdrop-blur-md bg-white/20 dark:bg-black/20 border-b border-white/10">
            <DarkModeToggle />
          </div>

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