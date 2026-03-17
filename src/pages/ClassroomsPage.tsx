import { motion } from "framer-motion";
import { Building2, Users, DoorOpen, DoorClosed, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import { classrooms, departments } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const ClassroomsPage = () => {
  const availableRooms = classrooms.filter(c => c.status === 'Available').length;
  const occupiedRooms = classrooms.filter(c => c.status === 'Occupied').length;
  const reservedRooms = classrooms.filter(c => c.status === 'Reserved').length;
  const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);
  const currentOccupancy = classrooms.reduce((sum, c) => sum + c.occupancy, 0);

  const statusData = [
    { name: 'Available', value: availableRooms, color: 'hsl(142, 55%, 55%)' },
    { name: 'Occupied', value: occupiedRooms, color: 'hsl(262, 60%, 65%)' },
    { name: 'Reserved', value: reservedRooms, color: 'hsl(45, 70%, 55%)' },
  ];

  const statusStyles = {
    Available: 'text-sentiment-positive bg-sentiment-positive/10',
    Occupied: 'text-primary bg-primary/10',
    Reserved: 'text-sentiment-neutral bg-sentiment-neutral/10',
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Classroom Management</h1>
        <p className="text-muted-foreground">
          Real-time classroom availability and occupancy tracking
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Classrooms"
          value={classrooms.length}
          subtitle={`${totalCapacity} total capacity`}
          icon={Building2}
          colorClass="bg-pastel-lavender"
          delay={0}
        />
        <KPICard
          title="Available Now"
          value={availableRooms}
          subtitle="Ready for booking"
          icon={DoorOpen}
          colorClass="bg-pastel-mint"
          delay={0.1}
        />
        <KPICard
          title="Currently Occupied"
          value={occupiedRooms}
          subtitle={`${currentOccupancy} students`}
          icon={Users}
          colorClass="bg-pastel-peach"
          delay={0.2}
        />
        <KPICard
          title="Reserved Today"
          value={reservedRooms}
          subtitle="Upcoming sessions"
          icon={Calendar}
          colorClass="bg-pastel-sky"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Status Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Room Status Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Classroom List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">All Classrooms</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {classrooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-pastel-lavender/50">
                    {room.status === 'Available' ? (
                      <DoorOpen className="w-5 h-5" />
                    ) : (
                      <DoorClosed className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{room.name}</h4>
                    <p className="text-sm text-muted-foreground">{room.department} Department</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {room.occupancy}/{room.capacity}
                    </div>
                    <div className="text-xs text-muted-foreground">Occupancy</div>
                  </div>
                  
                  <div className="w-24">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(room.occupancy / room.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[room.status]}`}>
                    {room.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ClassroomsPage;
