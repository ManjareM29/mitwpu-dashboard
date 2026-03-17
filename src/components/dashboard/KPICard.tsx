import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  colorClass?: string;
  delay?: number;
}

const KPICard = ({ title, value, subtitle, icon: Icon, trend, colorClass = "bg-pastel-lavender", delay = 0 }: KPICardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Background accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClass}`}>
            <Icon className="w-5 h-5 text-foreground/80" />
          </div>
          {trend && (
            <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${trend.positive ? 'bg-sentiment-positive/20 text-sentiment-positive' : 'bg-sentiment-negative/20 text-sentiment-negative'}`}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
