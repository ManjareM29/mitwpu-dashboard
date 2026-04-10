import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Monitor, Clock, Users, Activity, Calendar, Wrench } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import LabUsageChart from "@/components/dashboard/LabUsageChart";
import SentimentPieChart from "@/components/dashboard/SentimentPieChart";
import TeacherRemarks from "@/components/dashboard/TeacherRemarks";
import { labs, students, getSentimentDistribution } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { vyasLabs } from "@/data/mockData";

const weeklySessionData = [
  { day: 'Mon', sessions: 8 },
  { day: 'Tue', sessions: 7 },
  { day: 'Wed', sessions: 9 },
  { day: 'Thu', sessions: 6 },
  { day: 'Fri', sessions: 5 },
];
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {vyasLabs.map((lab) => (
    <div key={lab.id} className="glass-card p-4 rounded-xl">
      <h3 className="font-bold">{lab.labName}</h3>
      <p>Room: {lab.roomNo}</p>
      <p>Machine: {lab.machineMake}</p>
      <p>Total Systems: {lab.totalMachines}</p>
      <p>Assistant: {lab.technicalAssistant}</p>
      <p>Floor: {lab.floor}</p>
    </div>
  ))}
</div>
const dailyAttendance = [
  { time: '9 AM', students: 32 },
  { time: '10 AM', students: 45 },
  { time: '11 AM', students: 52 },
  { time: '12 PM', students: 28 },
  { time: '2 PM', students: 48 },
  { time: '3 PM', students: 55 },
  { time: '4 PM', students: 38 },
];

const LabPage = () => {
  const { labId } = useParams();
  const navigate = useNavigate();
  
  const lab = labs.find(l => l.id === labId);

  if (!lab) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold mb-4">Lab not found</h2>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  const statusColors = {
    Active: 'text-sentiment-positive bg-sentiment-positive/10',
    Maintenance: 'text-sentiment-neutral bg-sentiment-neutral/10',
    Inactive: 'text-sentiment-negative bg-sentiment-negative/10',
  };

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
          onClick={() => navigate(-1)}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-pastel-sky/50">
              <Monitor className="w-8 h-8 text-dept-cse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{lab.name}</h1>
              <p className="text-muted-foreground">{lab.department} Department</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[lab.status]}`}>
            {lab.status}
          </span>
        </div>
        
        <p className="mt-4 text-muted-foreground max-w-2xl">{lab.description}</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Systems"
          value={lab.totalSystems}
          subtitle="Workstations available"
          icon={Monitor}
          colorClass="bg-pastel-lavender"
          delay={0}
        />
        <KPICard
          title="Daily Usage"
          value={`${lab.dailyUsageHours}h`}
          subtitle="Average per day"
          icon={Clock}
          trend={{ value: 12, positive: true }}
          colorClass="bg-pastel-mint"
          delay={0.1}
        />
        <KPICard
          title="Today's Sessions"
          value={7}
          subtitle="Scheduled classes"
          icon={Calendar}
          colorClass="bg-pastel-peach"
          delay={0.2}
        />
        <KPICard
          title="Utilization"
          value="78%"
          subtitle="Current capacity"
          icon={Activity}
          trend={{ value: 5, positive: true }}
          colorClass="bg-pastel-sky"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LabUsageChart title="Today's Lab Utilization" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Weekly Session Count</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklySessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="hsl(200, 70%, 65%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(200, 70%, 65%)', strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Student Attendance & Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Today's Student Attendance</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyAttendance}>
                <defs>
                  <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 55%, 60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(160, 55%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                  formatter={(value: number) => [`${value} students`, 'Attendance']}
                />
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  stroke="hsl(160, 55%, 60%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(160, 55%, 60%)', strokeWidth: 0, r: 4 }}
                  fill="url(#studentGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <SentimentPieChart 
          data={getSentimentDistribution(lab.department)} 
          title="Student Feedback"
        />
      </div>

      {/* Teacher Remarks */}
      <TeacherRemarks department={lab.department} />
    </DashboardLayout>
  );
};

export default LabPage;
