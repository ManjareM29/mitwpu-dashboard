import { motion } from "framer-motion";
import { MessageSquare, Clock } from "lucide-react";
import { teacherRemarks } from "@/data/mockData";

interface TeacherRemarksProps {
  department?: string;
}

const TeacherRemarks = ({ department }: TeacherRemarksProps) => {
  const filteredRemarks = department 
    ? teacherRemarks.filter(r => r.department === department)
    : teacherRemarks;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Teacher Remarks</h3>
      </div>
      
      <div className="space-y-4">
        {filteredRemarks.slice(0, 4).map((remark, index) => (
          <motion.div
            key={remark.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">{remark.teacher}</p>
                <p className="text-sm text-muted-foreground">{remark.remark}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                <Clock className="w-3 h-3" />
                {remark.timestamp}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeacherRemarks;
