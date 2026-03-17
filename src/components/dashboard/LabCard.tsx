import { motion } from "framer-motion";
import { Monitor, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Lab } from "@/data/mockData";

interface LabCardProps {
  lab: Lab;
  index: number;
}

const statusColors = {
  Active: 'bg-sentiment-positive',
  Maintenance: 'bg-sentiment-neutral',
  Inactive: 'bg-sentiment-negative',
};

const LabCard = ({ lab, index }: LabCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onClick={() => navigate(`/lab/${lab.id}`)}
      className="glass-card rounded-xl p-4 cursor-pointer group hover:bg-card/80 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-pastel-sky/50">
            <Monitor className="w-5 h-5 text-dept-cse" />
          </div>
          <div>
            <h4 className="font-semibold group-hover:text-primary transition-colors">{lab.name}</h4>
            <p className="text-sm text-muted-foreground">{lab.department} Department</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-sm">
              <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium">{lab.totalSystems}</span>
              <span className="text-muted-foreground">Systems</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium">{lab.dailyUsageHours}h</span>
              <span className="text-muted-foreground">/day</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusColors[lab.status]}`} />
            <span className="text-sm font-medium">{lab.status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LabCard;
