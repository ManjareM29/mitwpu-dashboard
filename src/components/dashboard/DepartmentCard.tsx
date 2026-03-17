import { motion } from "framer-motion";
import { Users, GraduationCap, FlaskConical, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DepartmentInfo } from "@/data/mockData";

interface DepartmentCardProps {
  department: DepartmentInfo;
  index: number;
}

const colorMap: Record<string, { bg: string; accent: string }> = {
  'dept-ai': { bg: 'bg-dept-ai/20', accent: 'bg-dept-ai' },
  'dept-cse': { bg: 'bg-dept-cse/20', accent: 'bg-dept-cse' },
  'dept-ece': { bg: 'bg-dept-ece/20', accent: 'bg-dept-ece' },
  'dept-mech': { bg: 'bg-dept-mech/20', accent: 'bg-dept-mech' },
  'dept-civil': { bg: 'bg-dept-civil/20', accent: 'bg-dept-civil' },
};

const DepartmentCard = ({ department, index }: DepartmentCardProps) => {
  const navigate = useNavigate();
  const colors = colorMap[department.color] || colorMap['dept-ai'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/department/${department.id}`)}
      className="glass-card rounded-2xl p-6 cursor-pointer relative overflow-hidden group"
    >
      {/* Gradient accent */}
      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent}`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">{department.name}</h3>
            <p className="text-sm text-muted-foreground">{department.fullName}</p>
          </div>
          <div className={`p-3 rounded-xl ${colors.bg}`}>
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-semibold">{department.studentCount}</span>
              <span className="text-muted-foreground ml-1">Students</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-semibold">{department.labCount}</span>
              <span className="text-muted-foreground ml-1">Labs</span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Attendance</span>
              <span className="font-medium">{department.avgAttendance}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${department.avgAttendance}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className={`h-full ${colors.accent} rounded-full`}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Performance</span>
              <span className="font-medium">{department.avgPerformance}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${department.avgPerformance}%` }}
                transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                className={`h-full ${colors.accent} opacity-70 rounded-full`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
          <TrendingUp className="w-4 h-4" />
          View Analytics
        </div>
      </div>
    </motion.div>
  );
};

export default DepartmentCard;
