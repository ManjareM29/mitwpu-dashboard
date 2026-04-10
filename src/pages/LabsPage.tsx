import { motion } from "framer-motion";
import { FlaskConical, Filter } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LabCard from "@/components/dashboard/LabCard";
import LabUsageChart from "@/components/dashboard/LabUsageChart";
import { labs, departments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { labs } from "@/data/mockData";
const LabsPage = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  
  const filteredLabs = selectedDept 
    ? labs.filter(l => l.department === selectedDept)
    : labs;

  const activeLabs = labs.filter(l => l.status === 'Active').length;
  const maintenanceLabs = labs.filter(l => l.status === 'Maintenance').length;

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
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
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 mb-6 flex-wrap"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filter by:</span>
        </div>
        <Button 
          variant={selectedDept === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDept(null)}
        >
          All
        </Button>
        {departments.map((dept) => (
          <Button
            key={dept.id}
            variant={selectedDept === dept.name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDept(dept.name)}
          >
            {dept.name}
          </Button>
        ))}
      </motion.div>

      {/* Labs List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          {selectedDept ? `${selectedDept} Laboratories` : 'All Laboratories'}
          <span className="text-sm font-normal text-muted-foreground">
            ({filteredLabs.length} labs)
          </span>
        </h2>
        <div className="space-y-3">
          {filteredLabs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Chart */}
      <LabUsageChart title="Average Lab Utilization Today" />
    </DashboardLayout>
  );
};

export default LabsPage;
