import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { weeklyAttendanceData } from "@/data/mockData";

interface AttendanceChartProps {
  department?: string;
}

const AttendanceChart = ({ department }: AttendanceChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Weekly Attendance Trends</h3>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyAttendanceData} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="day" 
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
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`${value}%`, '']}
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
            {!department || department === 'CSF' ? (
              <Bar dataKey="CSF" fill="hsl(262, 70%, 70%)" radius={[4, 4, 0, 0]} />
            ) : null}
            {!department || department === 'CSE Core' ? (
              <Bar dataKey="CSE Core" fill="hsl(200, 70%, 65%)" radius={[4, 4, 0, 0]} />
            ) : null}
            {!department || department === 'CSE AIDS' ? (
              <Bar dataKey="CSE AIDS" fill="hsl(160, 55%, 60%)" radius={[4, 4, 0, 0]} />
            ) : null}
            {!department || department === 'CSE CSBS' ? (
              <Bar dataKey="CSE CSBS" fill="hsl(25, 75%, 65%)" radius={[4, 4, 0, 0]} />
            ) : null}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AttendanceChart;
