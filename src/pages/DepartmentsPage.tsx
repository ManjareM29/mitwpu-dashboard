import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DepartmentCard from "@/components/dashboard/DepartmentCard";
import DepartmentPieChart from "@/components/dashboard/DepartmentPieChart";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import { departments } from "@/data/mockData";

const DepartmentsPage = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Departments Overview</h1>
        <p className="text-muted-foreground">
          Explore detailed analytics for each academic department
        </p>
      </motion.div>

      {/* Department Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          All Departments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <DepartmentCard key={dept.id} department={dept} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentPieChart />
        <AttendanceChart />
      </div>
    </DashboardLayout>
  );
};

export default DepartmentsPage;
