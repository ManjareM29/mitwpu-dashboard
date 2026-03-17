import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { departmentDistribution } from "@/data/mockData";

const COLORS = [
  'hsl(262, 70%, 70%)',  // CSF
  'hsl(200, 70%, 65%)',  // CSE Core
  'hsl(160, 55%, 60%)',  // CSE AIDS
  'hsl(25, 75%, 65%)',   // CSE CSBS
];

const DepartmentPieChart = () => {
  const total = departmentDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Student Distribution by Department</h3>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentDistribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1 }}
            >
              {departmentDistribution.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`${value} students (${((value / total) * 100).toFixed(1)}%)`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DepartmentPieChart;
