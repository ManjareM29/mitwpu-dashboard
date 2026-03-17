import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAttendanceDistribution } from "@/data/mockData";

const AttendanceHistogram = () => {
  const data = getAttendanceDistribution();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Attendance Distribution</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={50}>
            <defs>
              <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(262, 60%, 65%)" />
                <stop offset="100%" stopColor="hsl(200, 70%, 65%)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="range" 
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
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`${value} Students`, 'Count']}
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
            />
            <Bar 
              dataKey="count" 
              fill="url(#attendanceGradient)" 
              radius={[8, 8, 0, 0]}
              animationBegin={0}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AttendanceHistogram;
