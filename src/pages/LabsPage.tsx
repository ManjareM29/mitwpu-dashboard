import { motion } from "framer-motion";
import { FlaskConical, Filter } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LabCard from "@/components/dashboard/LabCard";
import LabUsageChart from "@/components/dashboard/LabUsageChart";
import { labs, departments } from "@/data/mockData";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lab Analytics</h1>
            <p className="text-muted-foreground">
              Monitor laboratory usage and availability across departments
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-sentiment-positive" />
              <span>{activeLabs} Active</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-sentiment-neutral" />
              <span>{maintenanceLabs} Maintenance</span>
            </div>
          </div>
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
