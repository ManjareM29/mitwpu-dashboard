import { motion } from "framer-motion";
import { Users, GraduationCap, FlaskConical, TrendingUp, BookOpen, Activity } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import DepartmentCard from "@/components/dashboard/DepartmentCard";
import DepartmentPieChart from "@/components/dashboard/DepartmentPieChart";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import AttendanceHistogram from "@/components/dashboard/AttendanceHistogram";
import SentimentPieChart from "@/components/dashboard/SentimentPieChart";
import TeacherRemarks from "@/components/dashboard/TeacherRemarks";
import { departments, students, labs, getSentimentDistribution } from "@/data/mockData";

const Index = () => {
  const totalStudents = students.length;
  const avgAttendance = Math.round(students.reduce((sum, s) => sum + s.attendancePercentage, 0) / students.length);
  const avgPerformance = Math.round(students.reduce((sum, s) => sum + s.internalMarks, 0) / students.length);
  const activeLabs = labs.filter(l => l.status === 'Active').length;

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome to <span className="gradient-text">MIT-WPU</span>
        </h1>
        <p className="text-muted-foreground">
          Real-time analytics dashboard for college performance monitoring
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Students"
          value={totalStudents}
          subtitle="Across all departments"
          icon={Users}
          trend={{ value: 5.2, positive: true }}
          colorClass="bg-pastel-lavender"
          delay={0}
        />
        <KPICard
          title="Avg. Attendance"
          value={`${avgAttendance}%`}
          subtitle="This semester"
          icon={BookOpen}
          trend={{ value: 2.1, positive: true }}
          colorClass="bg-pastel-mint"
          delay={0.1}
        />
        <KPICard
          title="Avg. Performance"
          value={`${avgPerformance}%`}
          subtitle="Internal assessments"
          icon={TrendingUp}
          trend={{ value: 3.4, positive: true }}
          colorClass="bg-pastel-peach"
          delay={0.2}
        />
        <KPICard
          title="Active Labs"
          value={activeLabs}
          subtitle={`of ${labs.length} total labs`}
          icon={FlaskConical}
          trend={{ value: 1, positive: true }}
          colorClass="bg-pastel-sky"
          delay={0.3}
        />
      </div>

      {/* Department Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Departments Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {departments.map((dept, index) => (
            <DepartmentCard key={dept.id} department={dept} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DepartmentPieChart />
        <AttendanceHistogram />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        <SentimentPieChart data={getSentimentDistribution()} />
      </div>

      {/* Teacher Remarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeacherRemarks />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Export Report", color: "bg-pastel-lavender" },
              { label: "View Analytics", color: "bg-pastel-mint" },
              { label: "Send Notification", color: "bg-pastel-peach" },
              { label: "Generate PDF", color: "bg-pastel-sky" },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${action.color} p-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity`}
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
