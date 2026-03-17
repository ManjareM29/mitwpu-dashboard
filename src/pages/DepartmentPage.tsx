import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, GraduationCap, FlaskConical, TrendingUp, BookOpen } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import LabCard from "@/components/dashboard/LabCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import SentimentPieChart from "@/components/dashboard/SentimentPieChart";
import TeacherRemarks from "@/components/dashboard/TeacherRemarks";
import LabUsageChart from "@/components/dashboard/LabUsageChart";
import { departments, students, labs, getSentimentDistribution } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const DepartmentPage = () => {
  const { deptId } = useParams();
  const navigate = useNavigate();
  
  const department = departments.find(d => d.id === deptId);
  const deptStudents = students.filter(s => s.department === department?.name);
  const deptLabs = labs.filter(l => l.department === department?.name);

  if (!department) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold mb-4">Department not found</h2>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  const avgAttendance = Math.round(deptStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / deptStudents.length);
  const avgPerformance = Math.round(deptStudents.reduce((sum, s) => sum + s.internalMarks, 0) / deptStudents.length);
  const avgLabPerformance = Math.round(deptStudents.reduce((sum, s) => sum + s.labPerformance, 0) / deptStudents.length);

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-${department.color}/20`}>
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{department.fullName}</h1>
            <p className="text-muted-foreground">{department.name} Department Analytics</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Students"
          value={deptStudents.length}
          subtitle={`${department.facultyCount} Faculty`}
          icon={Users}
          colorClass="bg-pastel-lavender"
          delay={0}
        />
        <KPICard
          title="Attendance"
          value={`${avgAttendance}%`}
          subtitle="Department average"
          icon={BookOpen}
          trend={{ value: 1.8, positive: true }}
          colorClass="bg-pastel-mint"
          delay={0.1}
        />
        <KPICard
          title="Internal Marks"
          value={`${avgPerformance}%`}
          subtitle="Average score"
          icon={TrendingUp}
          trend={{ value: 2.3, positive: true }}
          colorClass="bg-pastel-peach"
          delay={0.2}
        />
        <KPICard
          title="Lab Performance"
          value={`${avgLabPerformance}%`}
          subtitle={`${deptLabs.length} Labs`}
          icon={FlaskConical}
          trend={{ value: 4.1, positive: true }}
          colorClass="bg-pastel-sky"
          delay={0.3}
        />
      </div>

      {/* Labs Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          Department Laboratories
        </h2>
        <div className="space-y-3">
          {deptLabs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AttendanceChart department={department.name} />
        <LabUsageChart title={`${department.name} Lab Usage Today`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentPieChart 
          data={getSentimentDistribution(department.name)} 
          title={`${department.name} Student Sentiment`}
        />
        <TeacherRemarks department={department.name} />
      </div>
    </DashboardLayout>
  );
};

export default DepartmentPage;
