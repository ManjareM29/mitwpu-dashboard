import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Award, Target } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import AttendanceHistogram from "@/components/dashboard/AttendanceHistogram";
import { students, departments, monthlyPerformance } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const PerformancePage = () => {
  const avgMarks = Math.round(students.reduce((sum, s) => sum + s.internalMarks, 0) / students.length);
  const avgLab = Math.round(students.reduce((sum, s) => sum + s.labPerformance, 0) / students.length);
  const topPerformers = students.filter(s => s.internalMarks >= 85).length;

  const deptPerformance = departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept.name);
    return {
      name: dept.name,
      Internal: Math.round(deptStudents.reduce((sum, s) => sum + s.internalMarks, 0) / deptStudents.length),
      Lab: Math.round(deptStudents.reduce((sum, s) => sum + s.labPerformance, 0) / deptStudents.length),
    };
  });

  const yearWisePerformance = [1, 2, 3, 4].map(year => {
    const yearStudents = students.filter(s => s.year === year);
    return {
      year: `Year ${year}`,
      performance: Math.round(yearStudents.reduce((sum, s) => sum + s.internalMarks, 0) / yearStudents.length),
      attendance: Math.round(yearStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / yearStudents.length),
    };
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Student Performance</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics on student academic performance
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Avg. Internal Marks"
          value={`${avgMarks}%`}
          subtitle="All departments"
          icon={BarChart3}
          trend={{ value: 3.2, positive: true }}
          colorClass="bg-pastel-lavender"
          delay={0}
        />
        <KPICard
          title="Avg. Lab Performance"
          value={`${avgLab}%`}
          subtitle="Practical assessments"
          icon={Target}
          trend={{ value: 4.5, positive: true }}
          colorClass="bg-pastel-mint"
          delay={0.1}
        />
        <KPICard
          title="Top Performers"
          value={topPerformers}
          subtitle="Students above 85%"
          icon={Award}
          colorClass="bg-pastel-peach"
          delay={0.2}
        />
        <KPICard
          title="Growth Rate"
          value="+8.2%"
          subtitle="vs. last semester"
          icon={TrendingUp}
          trend={{ value: 8.2, positive: true }}
          colorClass="bg-pastel-sky"
          delay={0.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Performance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPerformance}>
                <defs>
                  <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(262, 60%, 65%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(262, 60%, 65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  domain={[60, 100]}
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Performance']}
                />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="hsl(262, 60%, 65%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(262, 60%, 65%)', strokeWidth: 0, r: 5 }}
                  fill="url(#perfGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Department Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformance} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Bar dataKey="Internal" fill="hsl(262, 60%, 65%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Lab" fill="hsl(160, 55%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Year-wise and Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Year-wise Performance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearWisePerformance} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Bar dataKey="performance" name="Performance" fill="hsl(25, 75%, 65%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="attendance" name="Attendance" fill="hsl(200, 70%, 65%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <AttendanceHistogram />
      </div>
    </DashboardLayout>
  );
};

export default PerformancePage;
